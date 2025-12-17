'use client';

import Link from 'next/link';
import { useServices, useDeleteService } from '@/hooks/useServices';
import { toast } from 'sonner';
import { CardSkeleton } from '@/components/ui/Skeleton';

export default function AdminServicesPage() {
    const { data: services, isLoading, error } = useServices();
    const deleteMutation = useDeleteService();

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return;

        toast.promise(deleteMutation.mutateAsync(id), {
            loading: 'Deleting service...',
            success: 'Service deleted successfully!',
            error: 'Failed to delete service',
        });
    };

    if (isLoading) {
        return (
            <div>
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-unbounded font-bold text-dark mb-2">
                            Services Management
                        </h1>
                        <p className="text-gray-text">Manage your service offerings</p>
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
                        Services Management
                    </h1>
                    <p className="text-gray-text">
                        Manage your service offerings
                    </p>
                </div>
                <Link href="/admin/services/new" className="btn-primary">
                    + Add New Service
                </Link>
            </div>

            {services && services.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div key={service._id} className="card">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary-orange to-primary-teal rounded-lg flex items-center justify-center text-white font-unbounded font-bold">
                                    {service.icon || service.title.substring(0, 2).toUpperCase()}
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${service.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {service.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                            <h3 className="text-xl font-unbounded font-bold text-dark mb-2">
                                {service.title}
                            </h3>
                            <p className="text-gray-text text-sm mb-4 line-clamp-3">
                                {service.description}
                            </p>
                            <div className="flex gap-2">
                                <Link
                                    href={`/admin/services/${service._id}`}
                                    className="btn-outline text-sm flex-1 text-center"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(service._id!)}
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
                    <p className="text-gray-text text-lg mb-4">No services yet.</p>
                    <Link href="/admin/services/new" className="btn-primary">
                        + Add Your First Service
                    </Link>
                </div>
            )}
        </div>
    );
}
