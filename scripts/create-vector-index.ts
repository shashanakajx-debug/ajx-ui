
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error('MONGODB_URI missing');

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const db = client.db('ajx-technologies');
        const collection = db.collection('chatbot_chunks');

        console.log("Attempting to create Vector Search Index via Driver...");

        // Define the index model exactly as Atlas expects
        const index = {
            name: "vector_index",
            type: "vectorSearch",
            definition: {
                "fields": [
                    {
                        "type": "vector",
                        "path": "embedding",
                        "numDimensions": 768,
                        "similarity": "cosine"
                    }
                ]
            }
        };

        // Note: createSearchIndex might fail if not on Atlas or if permissions are limited
        // or if an index with the same name exists (we might need to drop it first, but let's try creating)

        try {
            const result = await collection.createSearchIndex(index);
            console.log(`✅ Index Creation Started! Result: ${result}`);
            console.log("Please wait 1-2 minutes for it to build on Atlas.");
        } catch (e: any) {
            console.log("⚠️ Creation failed. Trying to list and verify...");
            // Check if it already exists or if we need to drop
            const indexes = await collection.listSearchIndexes().toArray();
            console.log("Existing Indexes:", JSON.stringify(indexes, null, 2));

            if (e.codeName === 'IndexAlreadyExists' || e.message.includes('exists')) {
                console.log("Index already exists. Please verify dimensions in UI.");
            } else {
                throw e;
            }
        }

    } catch (e: any) {
        console.error("❌ Failed to create index programmatically:", e.message);
        console.log("NOTE: This command only works if you are connected to MongoDB Atlas (not local).");
    } finally {
        await client.close();
    }
}

run();
