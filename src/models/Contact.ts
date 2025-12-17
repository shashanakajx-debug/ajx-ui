import { getDatabase } from '@/lib/mongodb';
import { Contact } from '@/types';
import { ObjectId } from 'mongodb';

const COLLECTION = 'contacts';

export async function getAllContacts() {
    try {
        const db = await getDatabase();
        const contacts = await db.collection(COLLECTION).find({}).sort({ submittedAt: -1 }).toArray();
        return contacts.map(doc => ({
            ...doc,
            _id: doc._id.toString(),
        })) as Contact[];
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return [];
    }
}

export async function createContact(data: Omit<Contact, '_id' | 'status' | 'submittedAt'>) {
    try {
        const db = await getDatabase();
        const result = await db.collection(COLLECTION).insertOne({
            ...data,
            status: 'new' as const,
            submittedAt: new Date(),
        });
        return result.insertedId.toString();
    } catch (error) {
        console.error('Error creating contact:', error);
        throw error;
    }
}

export async function updateContactStatus(id: string, status: 'new' | 'read' | 'replied') {
    try {
        const db = await getDatabase();
        await db.collection(COLLECTION).updateOne(
            { _id: new ObjectId(id) },
            { $set: { status } }
        );
        return true;
    } catch (error) {
        console.error('Error updating contact:', error);
        throw error;
    }
}

export async function deleteContact(id: string) {
    try {
        const db = await getDatabase();
        await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
        return true;
    } catch (error) {
        console.error('Error deleting contact:', error);
        throw error;
    }
}
