import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import CareerForm from '../_components/CareerForm';
import { notFound } from 'next/navigation';

async function getCareer(id: string) {
    const db = await getDatabase();
    const career = await db.collection('careers').findOne({ _id: new ObjectId(id) });
    if (!career) return null;
    return {
        ...career,
        _id: career._id.toString(),
    };
}

export default async function EditCareerPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const career = await getCareer(id);

    if (!career) {
        notFound();
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-unbounded font-bold text-dark mb-2">
                    Edit Job Listing
                </h1>
                <p className="text-gray-text">
                    Update career opportunity details
                </p>
            </div>

            <div className="card">
                <CareerForm initialData={career} isEditing />
            </div>
        </div>
    );
}
