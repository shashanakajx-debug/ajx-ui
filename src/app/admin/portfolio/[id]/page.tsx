import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import PortfolioForm from '../_components/PortfolioForm';
import { notFound } from 'next/navigation';

async function getPortfolioItem(id: string) {
    const db = await getDatabase();
    const item = await db.collection('portfolio').findOne({ _id: new ObjectId(id) });
    if (!item) return null;
    return {
        ...item,
        _id: item._id.toString(),
    };
}

export default async function EditPortfolioPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await getPortfolioItem(id);

    if (!item) {
        notFound();
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-unbounded font-bold text-dark mb-2">
                    Edit Project
                </h1>
                <p className="text-gray-text">
                    Update project details
                </p>
            </div>

            <div className="card">
                <PortfolioForm initialData={item} isEditing />
            </div>
        </div>
    );
}
