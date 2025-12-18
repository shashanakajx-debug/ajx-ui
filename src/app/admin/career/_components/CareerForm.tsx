'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Input from '@/components/atoms/Input/Input';
import Textarea from '@/components/atoms/Textarea/Textarea';
import Button from '@/components/atoms/Button/Button';
import { Career } from '@/types';

interface CareerFormProps {
    initialData?: Partial<Career>;
    isEditing?: boolean;
}

export default function CareerForm({ initialData, isEditing = false }: CareerFormProps) {
    const router = useRouter();
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<Career>({
        defaultValues: {
            title: initialData?.title || '',
            department: initialData?.department || '',
            location: initialData?.location || 'indore',
            type: initialData?.type || 'Full-time',
            experience: initialData?.experience || '',
            description: initialData?.description || '',
            requirements: initialData?.requirements || [],
            responsibilities: initialData?.responsibilities || [],
            isActive: initialData?.isActive ?? true,
        },
    });

    const onSubmit = async (data: Career) => {
        setIsSubmitting(true);
        setError('');

        try {
            const url = isEditing
                ? `/api/career/${initialData?._id}`
                : '/api/career';

            const method = isEditing ? 'PUT' : 'POST';

            // Ensure arrays are handled if they come from string input
            if (typeof data.requirements === 'string') {
                data.requirements = (data.requirements as string).split('\n').map((t: string) => t.trim()).filter(Boolean);
            }
            if (typeof data.responsibilities === 'string') {
                data.responsibilities = (data.responsibilities as string).split('\n').map((t: string) => t.trim()).filter(Boolean);
            }

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error('Failed to save job listing');
            }

            router.push('/admin/career');
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
                label="Job Title"
                {...register('title', { required: 'Title is required' })}
                error={errors.title?.message}
                placeholder="e.g., Senior Frontend Developer"
            />

            <div className="grid md:grid-cols-2 gap-6">
                <Input
                    label="Department"
                    {...register('department', { required: 'Department is required' })}
                    error={errors.department?.message}
                    placeholder="e.g., Engineering"
                />

                <Input
                    label="Location"
                    {...register('location', { required: 'Location is required' })}
                    error={errors.location?.message}
                    placeholder="e.g., indore ,(M.P.)"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="w-full">
                    <label className="block text-sm font-semibold mb-2 text-dark">
                        Employment Type
                    </label>
                    <select
                        {...register('type')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange transition-all"
                    >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                    </select>
                </div>

                <Input
                    label="Experience Level"
                    {...register('experience', { required: 'Experience is required' })}
                    error={errors.experience?.message}
                    placeholder="e.g., 3+ years"
                />
            </div>

            <Textarea
                label="Job Description"
                {...register('description', { required: 'Description is required' })}
                error={errors.description?.message}
                placeholder="Overview of the role..."
                rows={4}
            />

            <Textarea
                label="Requirements (One per line)"
                {...register('requirements')}
                placeholder="- Bachelor's degree in CS&#10;- 3+ years of React experience"
                rows={5}
            />

            <Textarea
                label="Responsibilities (One per line)"
                {...register('responsibilities')}
                placeholder="- Build reusable components&#10;- Optimize application performance"
                rows={5}
            />

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="isActive"
                    {...register('isActive')}
                    className="w-4 h-4 text-primary-orange rounded border-gray-300 focus:ring-primary-orange"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                    Active Listing (Visible to public)
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
                    {isSubmitting ? 'Saving...' : (isEditing ? 'Update Listing' : 'Create Listing')}
                </Button>
            </div>
        </form>
    );
}
