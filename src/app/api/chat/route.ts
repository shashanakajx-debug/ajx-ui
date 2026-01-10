import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { findSimilarChunks } from '@/lib/chatbot-db';

export const dynamic = 'force-dynamic';

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

        const systemPrompt = `You are the AJX Assistant, a highly professional and knowledgeable AI consultant for AJX Technologies.
Your goal is to assist users by answering their questions accurately based *only* on the provided context from the AJX website.

Context:
${contextText}

Instructions:
1. **Professional Tone**: Use a polished, business-appropriate tone. Be helpful, concise, and direct.
2. **Formatting**: formatting is CRITICAL. Use Markdown to make your answers "ek dum visible" (highly readable).
   - Use **Bold** for key terms, services, and important points.
   - Use *Bullet points* for lists of services or features.
   - Use > Blockquotes for key summaries if needed.
3. **Accuracy**:
   - Answer strictly based on the provided Context. Do not hallucinate or make up services not mentioned.
   - If the answer is not in the context, politely state: "I don't have specific details on that in my current knowledge base, but I can connect you with our team for more information."
   - If the user asks about AJX Technologies generally, you can refer to them as a leading IT solutions provider.
4. **Context Utilization**: Use the context to explain *why* a service is valuable (e.g., "SaaS development ensures scalable growth...").

Refrence: https://ajxtechnologies.com/
`;

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
