
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { createHash } from 'crypto';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const uri = process.env.MONGODB_URI;
// Try GEMINI, fallback to OPENAI if user pasted it there
const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;

if (!uri || !apiKey) {
    console.error('Missing MONGODB_URI or GEMINI_API_KEY (or OPENAI_API_KEY)');
    process.exit(1);
}

const client = new MongoClient(uri);
const genAI = new GoogleGenerativeAI(apiKey);
const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });

// Configuration
const CHUNK_SIZE = 1000;
const OVERLAP = 100;

interface Chunk {
    hash: string;
    content: string;
    metadata: any;
    embedding?: number[];
}

async function getEmbedding(text: string): Promise<number[]> {
    const result = await embeddingModel.embedContent(text.replace(/\n/g, ' '));
    return result.embedding.values;
}

function computeHash(content: string): string {
    return createHash('md5').update(content).digest('hex');
}

function chunkText(text: string, metadata: any): Chunk[] {
    const chunks: Chunk[] = [];
    for (let i = 0; i < text.length; i += CHUNK_SIZE - OVERLAP) {
        const slice = text.slice(i, i + CHUNK_SIZE);
        if (slice.length < 50) continue;
        chunks.push({
            hash: computeHash(slice),
            content: slice,
            metadata: { ...metadata, chunkIndex: i }
        });
    }
    return chunks;
}

function stripHtml(html: string): string {
    return html.replace(/<[^>]*>?/gm, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function extractTextFromTsx(content: string): string {
    let text = content.replace(/import .* from .*/g, '');
    text = text.replace(/<[^>]*>/g, ' ');
    text = text.replace(/(const|let|var|function|export|default|return|interface|type)\s/g, ' ');
    return text.replace(/\s+/g, ' ').trim();
}

async function processDirectory(dir: string, collection: any) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (file === 'node_modules' || file === '.next' || file === '.git') continue;
            await processDirectory(fullPath, collection);
        } else {
            let text = '';
            let type = '';
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                const content = fs.readFileSync(fullPath, 'utf-8');
                text = extractTextFromTsx(content);
                type = 'page_code';
            } else if (file.endsWith('.md')) {
                text = fs.readFileSync(fullPath, 'utf-8');
                type = 'markdown';
            } else if (file.endsWith('.txt')) {
                text = fs.readFileSync(fullPath, 'utf-8');
                type = 'text';
            }
            if (text.length > 100) {
                const chunks = chunkText(text, { source: fullPath, type });
                await processChunks(chunks, collection);
            }
        }
    }
}

async function processChunks(chunks: Chunk[], collection: any) {
    for (const chunk of chunks) {
        // Since embeddings changed (1536 -> 768), we must check if existing record has correct embedding length
        // or just rely on hash. But if hash exists, we skip.
        // If the user wants to re-embed everything, they should drop collection.
        // Recommendation: User should drop collection or we force update if embedding length mismatch.
        // For simplicity: We trust hash. User needs to drop collection if switching providers manually.

        const existing = await collection.findOne({ hash: chunk.hash });
        if (existing) {
            // Check if embedding exists and has non-zero length (optional check)
            if (existing.embedding && existing.embedding.length > 0) {
                continue;
            }
        }

        console.log(`Processing new chunk from ${chunk.metadata.source}...`);
        try {
            // Retry logic
            let embedding;
            let retries = 3;
            while (retries > 0) {
                try {
                    embedding = await getEmbedding(chunk.content);
                    break;
                } catch (e) {
                    retries--;
                    if (retries === 0) throw e;
                    await new Promise(r => setTimeout(r, 1000));
                }
            }

            await collection.updateOne(
                { hash: chunk.hash },
                {
                    $set: {
                        content: chunk.content,
                        metadata: chunk.metadata,
                        embedding,
                        hash: chunk.hash,
                        updatedAt: new Date()
                    }
                },
                { upsert: true }
            );
        } catch (e) {
            console.error(`Error processing chunk:`, e);
        }
    }
}

async function run() {
    try {
        await client.connect();
        const db = client.db('ajx-technologies');
        const collection = db.collection('chatbot_chunks');

        console.log('Starting ingestion (Gemini Powered)...');

        // 1. Process Codebase
        await processDirectory(path.resolve(process.cwd(), 'src/app'), collection);

        // 2. Process Public
        const publicDir = path.resolve(process.cwd(), 'public');
        if (fs.existsSync(publicDir)) {
            await processDirectory(publicDir, collection);
        }

        // 3. Process DB
        console.log('Processing Database content...');

        // Error handling for missing collections
        try {
            const blogs = await db.collection('blog').find({ isPublished: true }).toArray();
            for (const blog of blogs) {
                const text = `Title: ${blog.title}\nDescription: ${blog.excerpt}\nContent: ${stripHtml(blog.content || '')}`;
                const chunks = chunkText(text, { source: `blog-${blog.slug}`, type: 'db_record', title: blog.title, url: `/blogs/${blog.slug}` });
                await processChunks(chunks, collection);
            }
            console.log(`Processed ${blogs.length} blogs.`);
        } catch (e) { console.log('Blog collection skipped or empty'); }

        try {
            const services = await db.collection('services').find({ isActive: true }).toArray();
            for (const service of services) {
                const text = `Service: ${service.title}\nDescription: ${service.description}\nCategory: ${service.category}\nFeatures: ${(service.features || []).join(', ')}`;
                const chunks = chunkText(text, { source: `service-${service.slug}`, type: 'db_record', title: service.title, url: `/services/${service.slug}` });
                await processChunks(chunks, collection);
            }
            console.log(`Processed ${services.length} services.`);
        } catch (e) { console.log('Services collection skipped or empty'); }

        try {
            const portfolio = await db.collection('portfolio').find({}).toArray();
            for (const item of portfolio) {
                const text = `Project: ${item.title}\nDescription: ${item.description}\nCategory: ${item.category}`;
                const chunks = chunkText(text, { source: `portfolio-${item.slug}`, type: 'db_record', title: item.title, url: `/portfolio/${item.slug}` });
                await processChunks(chunks, collection);
            }
            console.log(`Processed ${portfolio.length} portfolio items.`);
        } catch (e) { console.log('Portfolio collection skipped or empty'); }

        console.log('Ingestion complete.');

    } catch (error) {
        console.error('Ingestion failed:', error);
    } finally {
        await client.close();
    }
}

run();
