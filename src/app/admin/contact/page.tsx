'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Contact } from '@/types';
import { format } from 'date-fns';

export default function AdminContactPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsMounted(true);
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            setError(null);
            const res = await fetch('/api/contact', {
                cache: 'no-store',
            });

            if (!res.ok) {
                throw new Error(`Failed to fetch: ${res.status}`);
            }

            const data = await res.json();
            setContacts(data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
            setError(error instanceof Error ? error.message : 'Failed to load contacts');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        try {
            const res = await fetch(`/api/contact/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setContacts(contacts.filter(c => c._id !== id));
            } else {
                alert('Failed to delete message');
            }
        } catch (error) {
            console.error('Error deleting message:', error);
            alert('An error occurred');
        }
    };

    const handleStatusUpdate = async (id: string, newStatus: 'new' | 'read' | 'replied') => {
        try {
            const res = await fetch(`/api/contact/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                setContacts(contacts.map(c => c._id === id ? { ...c, status: newStatus } : c));
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-orange mx-auto mb-4"></div>
                    <p className="text-gray-text">Loading contacts...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="card">
                <div className="text-center py-12">
                    <p className="text-red-600 mb-4">Error: {error}</p>
                    <button onClick={fetchContacts} className="btn-primary">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }


    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-unbounded font-bold text-dark mb-2">
                    Contact Submissions
                </h1>
                <p className="text-gray-text">
                    View and manage messages from the contact form
                </p>
            </div>

            {contacts.length > 0 ? (
                <div className="card">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4 font-unbounded font-semibold text-dark">Name</th>
                                    <th className="text-left py-3 px-4 font-unbounded font-semibold text-dark">Subject</th>
                                    <th className="text-left py-3 px-4 font-unbounded font-semibold text-dark">Email</th>
                                    <th className="text-left py-3 px-4 font-unbounded font-semibold text-dark">Date</th>
                                    <th className="text-left py-3 px-4 font-unbounded font-semibold text-dark">Status</th>
                                    <th className="text-left py-3 px-4 font-unbounded font-semibold text-dark">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map((contact) => (
                                    <tr key={contact._id} className={`border-b hover:bg-gray-50 ${contact.status === 'new' ? 'bg-blue-50/50' : ''}`}>
                                        <td className="py-3 px-4 font-semibold">{contact.name}</td>
                                        <td className="py-3 px-4 max-w-xs truncate">{contact.subject}</td>
                                        <td className="py-3 px-4 text-gray-text">{contact.email}</td>
                                        <td className="py-3 px-4 text-gray-text text-sm whitespace-nowrap">
                                            {isMounted && contact.submittedAt ? format(new Date(contact.submittedAt), 'MMM dd, yyyy') : '...'}
                                        </td>
                                        <td className="py-3 px-4">
                                            <select
                                                value={contact.status}
                                                onChange={(e) => handleStatusUpdate(contact._id!, e.target.value as any)}
                                                className={`px-2 py-1 rounded text-xs font-semibold border-none focus:ring-0 cursor-pointer ${contact.status === 'new' ? 'bg-blue-100 text-blue-800' :
                                                    contact.status === 'read' ? 'bg-gray-100 text-gray-800' :
                                                        'bg-green-100 text-green-800'
                                                    }`}
                                            >
                                                <option value="new">New</option>
                                                <option value="read">Read</option>
                                                <option value="replied">Replied</option>
                                            </select>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex gap-2">
                                                <Link
                                                    href={`/admin/contact/${contact._id}`}
                                                    className="text-primary-orange hover:underline text-sm font-semibold"
                                                >
                                                    View
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(contact._id!)}
                                                    className="text-red-600 hover:underline text-sm font-semibold"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="card text-center py-12">
                    <p className="text-gray-text text-lg mb-4">No messages yet.</p>
                </div>
            )}
        </div>
    );
}
