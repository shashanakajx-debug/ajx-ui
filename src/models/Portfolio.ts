import { getDatabase } from '@/lib/mongodb';
import { Portfolio } from '@/types';
import { ObjectId } from 'mongodb';

const COLLECTION = 'portfolio';

export async function getAllPortfolio(featuredOnly: boolean = false) {
    try {
        const db = await getDatabase();
        const query = featuredOnly ? { featured: true } : {};
        const portfolio = await db.collection(COLLECTION).find(query).sort({ completedDate: -1 }).toArray();
        return portfolio.map(doc => ({
            ...doc,
            _id: doc._id.toString(),
        })) as Portfolio[];
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        return [];
    }
}

export async function getPortfolioBySlug(slug: string) {
    try {
        const db = await getDatabase();
        const item = await db.collection(COLLECTION).findOne({ slug });
        if (!item) return null;
        return {
            ...item,
            _id: item._id.toString(),
        } as Portfolio;
    } catch (error) {
        console.error('Error fetching portfolio item:', error);
        return null;
    }
}

export async function createPortfolio(data: Omit<Portfolio, '_id' | 'createdAt'>) {
    try {
        const db = await getDatabase();
        const result = await db.collection(COLLECTION).insertOne({
            ...data,
            createdAt: new Date(),
        });
        return result.insertedId.toString();
    } catch (error) {
        console.error('Error creating portfolio:', error);
        throw error;
    }
}

export async function updatePortfolio(id: string, data: Partial<Portfolio>) {
    try {
        const db = await getDatabase();
        await db.collection(COLLECTION).updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        );
        return true;
    } catch (error) {
        console.error('Error updating portfolio:', error);
        throw error;
    }
}

export async function deletePortfolio(id: string) {
    try {
        const db = await getDatabase();
        await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
        return true;
    } catch (error) {
        console.error('Error deleting portfolio:', error);
        throw error;
    }
}
