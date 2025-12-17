'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/atoms/Input/Input';
import Textarea from '@/components/atoms/Textarea/Textarea';
import Button from '@/components/atoms/Button/Button';
import { Service } from '@/types';
import { serviceSchema, ServiceFormData } from '@/schemas';
import { useCreateService, useUpdateService } from '@/hooks/useServices';
import { toast } from 'sonner';

interface ServiceFormProps {
    initialData?: Partial<Service>;
    isEditing?: boolean;
}

export default function ServiceForm({ initialData, isEditing = false }: ServiceFormProps) {
    const router = useRouter();
    const createMutation = useCreateService();
    const updateMutation = useUpdateService();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ServiceFormData>({
        resolver: zodResolver(serviceSchema) as any,
        defaultValues: {
            title: initialData?.title || '',
            description: initialData?.description || '',
            icon: initialData?.icon || '',
            isActive: initialData?.isActive ?? true,
        },
    });

    const onSubmit = async (data: ServiceFormData) => {
        try {
            if (isEditing && initialData?._id) {
                await toast.promise(
                    updateMutation.mutateAsync({ id: initialData._id, data }),
                    {
                        loading: 'Updating service...',
                        success: 'Service updated successfully!',
                        error: 'Failed to update service',
                    }
                );
            } else {
                await toast.promise(
                    createMutation.mutateAsync(data),
                    {
                        loading: 'Creating service...',
                        success: 'Service created successfully!',
                        error: 'Failed to create service',
                    }
                );
            }

            router.push('/admin/services');
            router.refresh();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
            <Input
                label="Service Title"
                {...register('title')}
                error={errors.title?.message}
                placeholder="e.g., Web Development"
            />

            <Textarea
                label="Description"
                {...register('description')}
                error={errors.description?.message}
                placeholder="Brief description of the service..."
                rows={4}
            />

            <Input
                label="Icon (Emoji or Class)"
                {...register('icon')}
                error={errors.icon?.message}
                placeholder="e.g., 💻 or fa-code"
                description="Enter an emoji or icon class name"
            />

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="isActive"
                    {...register('isActive')}
                    className="w-4 h-4 text-primary-orange rounded border-gray-300 focus:ring-primary-orange"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                    Active (Visible on website)
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
                    {isSubmitting ? 'Saving...' : (isEditing ? 'Update Service' : 'Create Service')}
                </Button>
            </div>
        </form>
    );
}
