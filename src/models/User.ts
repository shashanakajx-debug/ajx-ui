import { getDatabase } from '@/lib/mongodb';
import { User } from '@/types';
import bcrypt from 'bcryptjs';

const COLLECTION = 'users';

export async function getUserByEmail(email: string) {
    try {
        const db = await getDatabase();
        const user = await db.collection(COLLECTION).findOne({ email });
        if (!user) return null;
        return {
            ...user,
            _id: user._id.toString(),
        } as User;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

export async function createUser(data: Omit<User, '_id' | 'createdAt'>) {
    try {
        const db = await getDatabase();

        // Hash password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const result = await db.collection(COLLECTION).insertOne({
            ...data,
            password: hashedPassword,
            createdAt: new Date(),
        });

        return result.insertedId.toString();
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export async function verifyPassword(plainPassword: string, hashedPassword: string) {
    return bcrypt.compare(plainPassword, hashedPassword);
}


