import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import ServiceForm from '../_components/ServiceForm';
import { notFound } from 'next/navigation';

async function getService(id: string) {
    const db = await getDatabase();
    const service = await db.collection('services').findOne({ _id: new ObjectId(id) });
    if (!service) return null;
    return {
        ...service,
        _id: service._id.toString(),
    };
}

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const service = await getService(id);

    if (!service) {
        notFound();
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-unbounded font-bold text-dark mb-2">
                    Edit Service
                </h1>
                <p className="text-gray-text">
                    Update service details
                </p>
            </div>

            <div className="card">
                <ServiceForm initialData={service} isEditing />
            </div>
        </div>
    );
}
