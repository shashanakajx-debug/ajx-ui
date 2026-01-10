import { ObjectId } from 'mongodb';

export type ChunkType = 'page' | 'markdown' | 'db_record' | 'other';

export interface ChatbotChunk {
    _id?: ObjectId;
    content: string;
    metadata: {
        source: string;
        type: ChunkType;
        title?: string;
        url?: string;
        [key: string]: unknown;
    };
    embedding: number[];
    hash: string;
    updatedAt: Date;
}

export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
    createdAt?: Date;
}
