'use client';

import { usePortfolio, useDeletePortfolio } from '@/hooks/usePortfolio';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { CardSkeleton } from '@/components/ui/Skeleton';

export default function AdminPortfolioPage() {
    const { data: portfolio, isLoading, error } = usePortfolio();
    const deleteMutation = useDeletePortfolio();

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this portfolio item?')) return;

        toast.promise(deleteMutation.mutateAsync(id), {
            loading: 'Deleting portfolio item...',
            success: 'Portfolio item deleted successfully!',
            error: 'Failed to delete portfolio item',
        });
    };

    if (isLoading) {
        return (
            <div>
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-unbounded font-bold text-dark mb-2">
                            Portfolio Management
                        </h1>
                        <p className="text-gray-text">Manage your portfolio projects</p>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="card max-w-md mx-auto text-center">
                <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
                <p className="text-gray-text mb-4">{error.message}</p>
                <button onClick={() => window.location.reload()} className="btn-primary">
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-unbounded font-bold text-dark mb-2">
                        Portfolio Management
                    </h1>
                    <p className="text-gray-text">
                        Manage your portfolio projects
                    </p>
                </div>
                <Link href="/admin/portfolio/new" className="btn-primary">
                    + Add New Project
                </Link>
            </div>

            {portfolio && portfolio.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {portfolio.map((item) => (
                        <div key={item._id} className="card">
                            {item.imageUrl && (
                                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden relative">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                            )}
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="text-xl font-unbounded font-bold text-dark">
                                    {item.title}
                                </h3>
                                {item.featured && (
                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded">
                                        Featured
                                    </span>
                                )}
                            </div>
                            <p className="text-gray-text text-sm mb-2">
                                {item.category}
                            </p>
                            <p className="text-gray-text text-sm mb-4 line-clamp-2">
                                {item.description}
                            </p>
                            <p className="text-xs text-gray-400 mb-4">
                                {item.completedDate && format(new Date(item.completedDate), 'MMM yyyy')}
                            </p>
                            <div className="flex gap-2">
                                <Link
                                    href={`/admin/portfolio/${item._id}`}
                                    className="btn-outline text-sm flex-1 text-center"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(item._id!)}
                                    className="text-red-600 hover:text-red-800 px-3 py-2 text-sm font-semibold"
                                    disabled={deleteMutation.isPending}
                                >
                                    {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="card text-center py-12">
                    <p className="text-gray-text text-lg mb-4">No portfolio items yet.</p>
                    <Link href="/admin/portfolio/new" className="btn-primary">
                        + Add Your First Project
                    </Link>
                </div>
            )}
        </div>
    );
}
