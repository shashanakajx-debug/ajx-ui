'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, ShieldCheck, Mail, User as UserIcon } from 'lucide-react';
import { toast } from 'sonner';

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/admin/users');
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            } else {
                toast.error('Failed to fetch users');
            }
        } catch {
            toast.error('An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this user?')) return;

        try {
            const res = await fetch(`/api/admin/users/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                toast.success('User deleted successfully');
                fetchUsers();
            } else {
                const data = await res.json();
                toast.error(data.error || 'Failed to delete user');
            }
        } catch {
            toast.error('An error occurred');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-dark">Admin Users</h1>
                <Link
                    href="/admin/users/create"
                    className="flex items-center gap-2 px-4 py-2 bg-primary-orange text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add New User</span>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {isLoading ? (
                    <div className="p-8 text-center text-gray-500">Loading users...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Name</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Email</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Role</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                            No users found.
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-primary-orange">
                                                        <UserIcon className="w-5 h-5" />
                                                    </div>
                                                    <span className="font-medium text-dark">{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Mail className="w-4 h-4" />
                                                    {user.email}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    <ShieldCheck className="w-3 h-3" />
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/admin/users/${user._id}`}
                                                        className="p-2 text-gray-500 hover:text-primary-orange hover:bg-orange-50 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(user._id)}
                                                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="p-4 bg-blue-50 text-blue-800 rounded-lg border border-blue-100 text-sm">
                <strong>Note:</strong> You can also login with the &quot;Super Admin&quot; credentials configured in your environment variables.
                Those credentials override any database user settings and cannot be deleted here.
            </div>
        </div>
    );
}
