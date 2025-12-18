'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Input from '@/components/atoms/Input/Input';
import Textarea from '@/components/atoms/Textarea/Textarea';
import Button from '@/components/atoms/Button/Button';
import { Portfolio } from '@/types';

interface PortfolioFormProps {
    initialData?: Partial<Portfolio>;
    isEditing?: boolean;
}

export default function PortfolioForm({ initialData, isEditing = false }: PortfolioFormProps) {
    const router = useRouter();
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<Portfolio>({
        defaultValues: {
            title: initialData?.title || '',
            description: initialData?.description || '',
            category: initialData?.category || 'Custom',
            imageUrl: initialData?.imageUrl || '',
            clientName: initialData?.clientName || '',
            completedDate: initialData?.completedDate ? new Date(initialData.completedDate).toISOString().split('T')[0] : '',
            technologies: initialData?.technologies || [],
            featured: initialData?.featured ?? false,
        },
    });

    const onSubmit = async (data: Portfolio) => {
        setIsSubmitting(true);
        setError('');

        try {
            const url = isEditing
                ? `/api/portfolio/${initialData?._id}`
                : '/api/portfolio';

            const method = isEditing ? 'PUT' : 'POST';

            // Ensure technologies is an array if it came from string input (simple handling)
            if (typeof data.technologies === 'string') {
                data.technologies = (data.technologies as string).split(',').map((t: string) => t.trim());
            }

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error('Failed to save project');
            }

            router.push('/admin/portfolio');
            router.refresh();
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <Input
                label="Project Title"
                {...register('title', { required: 'Title is required' })}
                error={errors.title?.message}
                placeholder="e.g., E-Commerce Platform"
            />

            <Textarea
                label="Description"
                {...register('description', { required: 'Description is required' })}
                error={errors.description?.message}
                placeholder="Detailed description of the project..."
                rows={4}
            />

            <div className="grid md:grid-cols-2 gap-6">
                <Input
                    label="Category"
                    {...register('category', { required: 'Category is required' })}
                    error={errors.category?.message}
                    placeholder="e.g., Web Development"
                />

                <Input
                    label="Client Name"
                    {...register('clientName', { required: 'Client name is required' })}
                    error={errors.clientName?.message}
                    placeholder="e.g., Shashank Ajx"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <Input
                    label="Completion Date"
                    type="date"
                    {...register('completedDate', { required: 'Date is required' })}
                    error={errors.completedDate?.message}
                />

                <Input
                    label="Image URL"
                    {...register('imageUrl')}
                    placeholder="https://..."
                    description="URL to the project screenshot"
                />
            </div>

            <Input
                label="Technologies (comma separated)"
                {...register('technologies')}
                placeholder="React, Node.js, MongoDB"
            />

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="featured"
                    {...register('featured')}
                    className="w-4 h-4 text-primary-orange rounded border-gray-300 focus:ring-primary-orange"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                    Featured Project (Show on homepage)
                </label>
            </div>

            <div className="flex gap-4 pt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Saving...' : (isEditing ? 'Update Project' : 'Create Project')}
                </Button>
            </div>
        </form>
    );
}
