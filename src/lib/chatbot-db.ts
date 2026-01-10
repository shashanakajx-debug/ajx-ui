import { Collection } from 'mongodb';
import { getDatabase } from './mongodb';
import { ChatbotChunk } from '@/types/chatbot';

export const CHATBOT_COLLECTION_NAME = 'chatbot_chunks';

export async function getChatbotCollection(): Promise<Collection<ChatbotChunk>> {
    try {
        const db = await getDatabase();
        return db.collection<ChatbotChunk>(CHATBOT_COLLECTION_NAME);
    } catch (e) {
        console.error("Failed to connect to MongoDB in getChatbotCollection:", e);
        throw e;
    }
}

export async function findSimilarChunks(embedding: number[], limit: number = 5): Promise<ChatbotChunk[]> {
    const collection = await getChatbotCollection();

    // Vector search aggregation pipeline
    // Note: This requires a vector search index to be defined on the collection
    const pipeline = [
        {
            $vectorSearch: {
                index: "vector_index", // We will create this index named 'vector_index'
                path: "embedding",
                queryVector: embedding,
                numCandidates: limit * 20,
                limit: limit
            }
        },
        {
            $project: {
                _id: 1,
                content: 1,
                metadata: 1,
                score: { $meta: "vectorSearchScore" }
            }
        }
    ];

    try {
        const results = await collection.aggregate(pipeline).toArray();
        return results as unknown as ChatbotChunk[];
    } catch (error) {
        console.error("Vector search failed, falling back to basic find (or empty):", error);
        // Fallback or rethrow depending on requirement. 
        // If vector index doesn't exist yet, this will fail.
        return [];
    }
}

export async function upsertChunk(chunk: Omit<ChatbotChunk, '_id' | 'updatedAt'>) {
    const collection = await getChatbotCollection();
    return collection.updateOne(
        { hash: chunk.hash },
        {
            $set: {
                ...chunk,
                updatedAt: new Date()
            }
        },
        { upsert: true }
    );
}
