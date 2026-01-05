'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';
import Input from '@/components/atoms/Input/Input';
import Button from '@/components/atoms/Button/Button';

interface User {
    _id: string;
    name: string;
    email: string;
}

export default function EditUserPage(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        // Need to fetch user details to pre-fill (requires a GET endpoint for single user or filter from list)
        // Since we don't have a GET /id endpoint in the plan (only PATCH and DELETE), we might need to rely on the user knowing what they edit 
        // OR better, we quickly add GET to [id]/route.ts. 
        // For now, let's assume we can only update passwords blindly OR we fetch the list and find the user.
        // Actually, let's fetch the list and find the user for now to save a route edit.
        const fetchUser = async () => {
            try {
                // Ideally this should be a direct API call to /api/admin/users/[id]
                // But for now we'll fetch all and filter client side as we didn't add GET [id]
                const res = await fetch('/api/admin/users');
                if (res.ok) {
                    const users: User[] = await res.json();
                    const user = users.find((u) => u._id === params.id);
                    if (user) {
                        setFormData(prev => ({
                            ...prev,
                            name: user.name,
                            email: user.email
                        }));
                    } else {
                        toast.error('User not found');
                        router.push('/admin/users');
                    }
                }
            } catch {
                toast.error('Failed to fetch user details');
            } finally {
                setIsFetching(false);
            }
        };

        fetchUser();
    }, [params.id, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password && formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setIsLoading(true);

        try {
            const body: { name: string; email: string; password?: string } = {
                name: formData.name,
                email: formData.email,
            };

            if (formData.password) {
                body.password = formData.password;
            }

            const res = await fetch(`/api/admin/users/${params.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                toast.success('User updated successfully');
                router.push('/admin/users');
            } else {
                const data = await res.json();
                toast.error(data.error || 'Failed to update user');
            }
        } catch {
            toast.error('An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return <div className="p-8 text-center text-gray-500">Loading user data...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/users"
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-bold text-dark">Edit Admin User</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder="Shashank Ajx"
                    />

                    <Input
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="shashanakajx@gmail.com"
                    />

                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 space-y-4">
                        <h3 className="text-sm font-semibold text-gray-700">Change Password (Optional)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="New Password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="Leave blank to keep current"
                                minLength={6}
                            />

                            <Input
                                label="Confirm New Password"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                placeholder="Leave blank to keep current"
                                minLength={6}
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
