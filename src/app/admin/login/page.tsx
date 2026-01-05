'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/atoms/Input/Input';
import Button from '@/components/atoms/Button/Button';
import Image from 'next/image';

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid email or password');
            } else {
                router.push('/admin/dashboard');
            }
        } catch {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-dark via-dark-800 to-dark flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <Image
                            src="/logo.png"
                            alt="AJX Technologies"
                            width={150}
                            height={50}
                            className="h-12 w-auto mx-auto mb-4"
                        />
                        <h2 className="text-3xl font-unbounded font-bold text-dark">
                            Admin Login
                        </h2>
                        <p className="mt-2 text-gray-text">
                            Sign in to access the dashboard
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <Input
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="admin@example.com"
                            autoComplete="email"
                        />

                        <Input
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                            autoComplete="current-password"
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>


                </div>

                {/* Back to Website */}
                <div className="text-center mt-6">
                    <Link
                        href="/"
                        className="text-white hover:text-primary-orange transition-colors text-sm"
                    >
                        ← Back to Website
                    </Link>
                </div>
            </div>
        </div>
    );
}
