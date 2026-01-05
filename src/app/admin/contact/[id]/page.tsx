import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Link from 'next/link';
import { Contact } from '@/types';

async function getContact(id: string): Promise<Contact | null> {
    try {
        // Validate ObjectId format
        if (!ObjectId.isValid(id)) {
            return null;
        }

        const db = await getDatabase();
        const contact = await db.collection('contacts').findOne({ _id: new ObjectId(id) });

        if (!contact) return null;

        return {
            ...contact,
            _id: contact._id.toString(),
        } as Contact;
    } catch (error) {
        console.error('Error fetching contact:', error);
        return null;
    }
}

export default async function ViewContactPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const contact = await getContact(id);

    if (!contact) {
        notFound();
    }

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-unbounded font-bold text-dark mb-2">
                        Message Details
                    </h1>
                    <p className="text-gray-text">
                        Received on {contact.submittedAt ? format(new Date(contact.submittedAt), 'MMMM dd, yyyy at h:mm a') : 'Unknown date'}
                    </p>
                </div>
                <Link href="/admin/contact" className="btn-outline">
                    Back to List
                </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="card">
                        <h3 className="text-lg font-bold text-dark mb-4 border-b pb-2">Message Content</h3>
                        <div className="mb-4">
                            <span className="text-sm text-gray-500 block mb-1">Subject</span>
                            <p className="text-lg font-semibold text-dark">{contact.subject}</p>
                        </div>
                        <div>
                            <span className="text-sm text-gray-500 block mb-1">Message</span>
                            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{contact.message}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="card">
                        <h3 className="text-lg font-bold text-dark mb-4 border-b pb-2">Sender Details</h3>
                        <div className="space-y-4">
                            <div>
                                <span className="text-sm text-gray-500 block mb-1">Name</span>
                                <p className="font-medium text-dark">{contact.name}</p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-500 block mb-1">Email</span>
                                <a href={`mailto:${contact.email}`} className="text-primary-orange hover:underline">
                                    {contact.email}
                                </a>
                            </div>
                            {contact.phone && (
                                <div>
                                    <span className="text-sm text-gray-500 block mb-1">Phone</span>
                                    <a href={`tel:${contact.phone}`} className="text-dark hover:text-primary-orange">
                                        {contact.phone}
                                    </a>
                                </div>
                            )}
                            {contact.company && (
                                <div>
                                    <span className="text-sm text-gray-500 block mb-1">Company</span>
                                    <p className="text-dark">{contact.company}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="card">
                        <h3 className="text-lg font-bold text-dark mb-4 border-b pb-2">Actions</h3>
                        <div className="flex flex-col gap-3">
                            <a
                                href={`mailto:${contact.email}?subject=Re: ${contact.subject}`}
                                className="btn-primary text-center"
                            >
                                Reply via Email
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
