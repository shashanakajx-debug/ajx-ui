import { getDatabase } from '@/lib/mongodb';
import { Blog } from '@/types';
import { ObjectId } from 'mongodb';

const COLLECTION = 'blog';

export async function getAllBlogs(publishedOnly: boolean = false) {
    try {
        const db = await getDatabase();
        const query = publishedOnly ? { isPublished: true } : {};
        const blogs = await db.collection(COLLECTION).find(query).sort({ publishedAt: -1 }).toArray();
        return blogs.map(doc => ({
            ...doc,
            _id: doc._id.toString(),
        })) as Blog[];
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return [];
    }
}

export async function getBlogBySlug(slug: string) {
    try {
        const db = await getDatabase();
        const blog = await db.collection(COLLECTION).findOne({ slug, isPublished: true });
        if (!blog) return null;

        // Increment views
        await db.collection(COLLECTION).updateOne(
            { _id: blog._id },
            { $inc: { views: 1 } }
        );

        return {
            ...blog,
            _id: blog._id.toString(),
        } as Blog;
    } catch (error) {
        console.error('Error fetching blog:', error);
        return null;
    }
}

export async function createBlog(data: Omit<Blog, '_id' | 'views' | 'createdAt'>) {
    try {
        const db = await getDatabase();
        const result = await db.collection(COLLECTION).insertOne({
            ...data,
            views: 0,
            createdAt: new Date(),
        });
        return result.insertedId.toString();
    } catch (error) {
        console.error('Error creating blog:', error);
        throw error;
    }
}

export async function updateBlog(id: string, data: Partial<Blog>) {
    try {
        const db = await getDatabase();
        await db.collection(COLLECTION).updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        );
        return true;
    } catch (error) {
        console.error('Error updating blog:', error);
        throw error;
    }
}

export async function deleteBlog(id: string) {
    try {
        const db = await getDatabase();
        await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
        return true;
    } catch (error) {
        console.error('Error deleting blog:', error);
        throw error;
    }
}
