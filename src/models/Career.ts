import { getDatabase } from '@/lib/mongodb';
import { Career } from '@/types';
import { ObjectId } from 'mongodb';

const COLLECTION = 'careers';

export async function getAllCareers(activeOnly: boolean = false) {
    try {
        const db = await getDatabase();
        const query = activeOnly ? { isActive: true } : {};
        const careers = await db.collection(COLLECTION).find(query).sort({ postedDate: -1 }).toArray();
        return careers.map(doc => ({
            ...doc,
            _id: doc._id.toString(),
        })) as Career[];
    } catch (error) {
        console.error('Error fetching careers:', error);
        return [];
    }
}

export async function getCareerById(id: string) {
    try {
        const db = await getDatabase();
        const career = await db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });
        if (!career) return null;
        return {
            ...career,
            _id: career._id.toString(),
        } as Career;
    } catch (error) {
        console.error('Error fetching career:', error);
        return null;
    }
}

export async function createCareer(data: Omit<Career, '_id'>) {
    try {
        const db = await getDatabase();
        const result = await db.collection(COLLECTION).insertOne(data);
        return result.insertedId.toString();
    } catch (error) {
        console.error('Error creating career:', error);
        throw error;
    }
}

export async function updateCareer(id: string, data: Partial<Career>) {
    try {
        const db = await getDatabase();
        await db.collection(COLLECTION).updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        );
        return true;
    } catch (error) {
        console.error('Error updating career:', error);
        throw error;
    }
}

export async function deleteCareer(id: string) {
    try {
        const db = await getDatabase();
        await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
        return true;
    } catch (error) {
        console.error('Error deleting career:', error);
        throw error;
    }
}
