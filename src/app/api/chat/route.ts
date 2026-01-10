
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { findSimilarChunks } from '@/lib/chatbot-db';

export const dynamic = 'force-dynamic';

// Initialize Gemini
// Try GEMINI_API_KEY first, fallback to OPENAI_API_KEY if user pasted it there
const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;
if (apiKey) {
    genAI = new GoogleGenerativeAI(apiKey);
}

export async function POST(request: Request) {
    try {
        if (!apiKey || !genAI) {
            return NextResponse.json({ error: 'API Key not configured. Please set GEMINI_API_KEY in .env.local' }, { status: 500 });
        }

        const body = await request.json();
        const { message, sessionId } = body;

        if (!message || typeof message !== 'string') {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        // 1. Generate Embedding for User Query (Gemini)
        // Model: text-embedding-004 (768 dimensions)
        const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });
        const embeddingResult = await embeddingModel.embedContent(message);
        const embedding = embeddingResult.embedding.values;

        // 2. Find Context (Database Search)
        // Note: Make sure your MongoDB index is compatible (has 768 dimensions or auto)
        const similarChunks = await findSimilarChunks(embedding, 5);

        // Construct Context Text
        const contextText = similarChunks.map(chunk =>
            `[Source: ${chunk.metadata.title || chunk.metadata.url || chunk.metadata.source}]\n${chunk.content}`
        ).join('\n\n');

        // 3. Generate Answer (Gemini Chat)
        // Model: gemini-flash-latest (Diagnostic confirmed this works)
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const systemPrompt = `You are the AJX Assistant, a helpful AI for AJX Technologies.
Your goal is to answer user questions based on the provided context.

Context:
${contextText}

Instructions:
- If the user says "Hi", "Hello", or similar greetings, respond politely and ask how you can help (even if context is empty).
- For questions about AJX, use ONLY the context provided.
- If the answer is not in the context and it is NOT a greeting, say "I don't have that information in my knowledge base."
- Be professional and concise.`;

        const promptWithUser = `${systemPrompt}\n\nUser Question: ${message}`;

        const result = await model.generateContent(promptWithUser);
        const response = await result.response;
        const reply = response.text();

        return NextResponse.json({
            message: reply,
            sessionId: sessionId || 'new-session',
            sources: similarChunks.map(c => ({ title: c.metadata.title, url: c.metadata.url }))
        });

    } catch (error: unknown) {
        console.error('Chat API Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
        // Expose actual error for debugging
        return NextResponse.json({
            error: errorMessage,
            details: String(error)
        }, { status: 500 });
    }
}
