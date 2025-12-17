import { getDatabase } from '@/lib/mongodb';
import { Service } from '@/types';
import { ObjectId } from 'mongodb';

const COLLECTION = 'services';

export async function getAllServices(activeOnly: boolean = false) {
    try {
        const db = await getDatabase();
        const query = activeOnly ? { isActive: true } : {};
        const services = await db.collection(COLLECTION).find(query).toArray();
        return services.map(doc => ({
            ...doc,
            _id: doc._id.toString(),
        })) as Service[];
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
}

export async function getServiceBySlug(slug: string) {
    try {
        const db = await getDatabase();
        const service = await db.collection(COLLECTION).findOne({ slug });
        if (!service) return null;
        return {
            ...service,
            _id: service._id.toString(),
        } as Service;
    } catch (error) {
        console.error('Error fetching service:', error);
        return null;
    }
}

export async function createService(data: Omit<Service, '_id' | 'createdAt' | 'updatedAt'>) {
    try {
        const db = await getDatabase();
        const result = await db.collection(COLLECTION).insertOne({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return result.insertedId.toString();
    } catch (error) {
        console.error('Error creating service:', error);
        throw error;
    }
}

export async function updateService(id: string, data: Partial<Service>) {
    try {
        const db = await getDatabase();
        await db.collection(COLLECTION).updateOne(
            { _id: new ObjectId(id) },
            { $set: { ...data, updatedAt: new Date() } }
        );
        return true;
    } catch (error) {
        console.error('Error updating service:', error);
        throw error;
    }
}

export async function deleteService(id: string) {
    try {
        const db = await getDatabase();
        await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
        return true;
    } catch (error) {
        console.error('Error deleting service:', error);
        throw error;
    }
}
