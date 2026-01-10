
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error('Please define the MONGODB_URI environment variable inside .env.local');
    process.exit(1);
}

async function run() {
    const client = new MongoClient(uri!);

    try {
        await client.connect();
        const db = client.db('ajx-technologies'); // Use the DB name from your connection string or hardcoded
        const collection = db.collection('chatbot_chunks');

        console.log('Creating indexes...');

        // 1. Vector Search Index
        // Note: Creating vector indexes via driver might require Atlas Admin privileges or specific API.
        // Standard driver `createIndex` creates regular indexes. 
        // For Atlas Vector Search, it is often done via Atlas UI or Atlas Administration API.
        // However, we can try creating a standard index if supported or just log instructions.
        // BUT, we can create the unique hash index here.

        await collection.createIndex({ hash: 1 }, { unique: true });
        console.log('Created unique index on "hash"');

        await collection.createIndex({ "metadata.source": 1 });
        console.log('Created index on "metadata.source"');

        console.log('\nIMPORTANT: For Vector Search, you usually need to create the index in MongoDB Atlas UI.');
        console.log('Go to Atlas > Collections > chatbot_chunks > Search Indexes > Create Search Index');
        console.log('Use JSON configuration:');
        console.log(JSON.stringify({
            name: "vector_index",
            type: "vectorSearch",
            definition: {
                "fields": [
                    {
                        "type": "vector",
                        "path": "embedding",
                        "numDimensions": 1536, // OpenAI text-embedding-3-small dimension
                        "similarity": "cosine"
                    }
                ]
            }
        }, null, 2));

    } catch (error) {
        console.error('Error creating indexes:', error);
    } finally {
        await client.close();
    }
}

run();
