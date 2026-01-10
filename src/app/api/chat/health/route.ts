import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    const diagnostics: Record<string, unknown> = {
        timestamp: new Date().toISOString(),
        openaiConfigured: !!process.env.OPENAI_API_KEY,
        mongodbConfigured: !!process.env.MONGODB_URI,
        nodeEnv: process.env.NODE_ENV,
    };

    // Test MongoDB connection
    try {
        const { getDatabase } = await import('@/lib/mongodb');
        const db = await getDatabase();
        await db.command({ ping: 1 });
        diagnostics.mongodbConnection = 'SUCCESS';
    } catch (error: unknown) {
        diagnostics.mongodbConnection = 'FAILED';
        diagnostics.mongodbError = error instanceof Error ? error.message : String(error);
    }

    // Test OpenAI connection
    if (process.env.OPENAI_API_KEY) {
        try {
            const OpenAI = (await import('openai')).default;
            const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
            await openai.models.list();
            diagnostics.openaiConnection = 'SUCCESS';
        } catch (error: unknown) {
            diagnostics.openaiConnection = 'FAILED';
            diagnostics.openaiError = error instanceof Error ? error.message : String(error);
        }
    } else {
        diagnostics.openaiConnection = 'NOT_CONFIGURED';
    }

    return NextResponse.json(diagnostics);
}
