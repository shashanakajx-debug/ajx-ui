import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import BlogForm from '../_components/BlogForm';
import { notFound } from 'next/navigation';

async function getBlog(id: string) {
    const db = await getDatabase();
    const blog = await db.collection('blogs').findOne({ _id: new ObjectId(id) });
    if (!blog) return null;
    return {
        ...blog,
        _id: blog._id.toString(),
    };
}

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const blog = await getBlog(id);

    if (!blog) {
        notFound();
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-unbounded font-bold text-dark mb-2">
                    Edit Blog Post
                </h1>
                <p className="text-gray-text">
                    Update blog post details
                </p>
            </div>

            <div className="card">
                <BlogForm initialData={blog} isEditing />
            </div>
        </div>
    );
}
