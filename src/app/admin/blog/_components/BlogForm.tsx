'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Input from '@/components/atoms/Input/Input';
import Textarea from '@/components/atoms/Textarea/Textarea';
import Button from '@/components/atoms/Button/Button';
import { Blog } from '@/types';

interface BlogFormProps {
    initialData?: Partial<Blog>;
    isEditing?: boolean;
}

export default function BlogForm({ initialData, isEditing = false }: BlogFormProps) {
    const router = useRouter();
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<Blog>({
        defaultValues: {
            title: initialData?.title || '',
            excerpt: initialData?.excerpt || '',
            content: initialData?.content || '',
            author: initialData?.author || '',
            category: initialData?.category || '',
            tags: initialData?.tags || [],
            imageUrl: initialData?.imageUrl || '',
            isPublished: initialData?.isPublished ?? false,
        },
    });

    const onSubmit = async (data: Blog) => {
        setIsSubmitting(true);
        setError('');

        try {
            const url = isEditing
                ? `/api/blog/${initialData?._id}`
                : '/api/blog';

            const method = isEditing ? 'PUT' : 'POST';

            // Ensure tags is an array if it came from string input
            if (typeof data.tags === 'string') {
                data.tags = (data.tags as string).split(',').map((t: string) => t.trim());
            }

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error('Failed to save blog post');
            }

            router.push('/admin/blog');
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
                label="Blog Title"
                {...register('title', { required: 'Title is required' })}
                error={errors.title?.message}
                placeholder="e.g., The Future of Web Development"
            />

            <Textarea
                label="Excerpt"
                {...register('excerpt', { required: 'Excerpt is required' })}
                error={errors.excerpt?.message}
                placeholder="Short summary for listing pages..."
                rows={3}
            />

            <Textarea
                label="Content (Markdown supported)"
                {...register('content', { required: 'Content is required' })}
                error={errors.content?.message}
                placeholder="Write your blog post content here..."
                rows={10}
            />

            <div className="grid md:grid-cols-2 gap-6">
                <Input
                    label="Author"
                    {...register('author', { required: 'Author is required' })}
                    error={errors.author?.message}
                    placeholder="e.g., John Doe"
                />

                <Input
                    label="Category"
                    {...register('category', { required: 'Category is required' })}
                    error={errors.category?.message}
                    placeholder="e.g., Technology"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <Input
                    label="Tags (comma separated)"
                    {...register('tags')}
                    placeholder="React, Next.js, Tutorial"
                />

                <Input
                    label="Cover Image URL"
                    {...register('imageUrl')}
                    placeholder="https://..."
                    description="URL to the blog cover image"
                />
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="isPublished"
                    {...register('isPublished')}
                    className="w-4 h-4 text-primary-orange rounded border-gray-300 focus:ring-primary-orange"
                />
                <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
                    Publish Immediately
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
                    {isSubmitting ? 'Saving...' : (isEditing ? 'Update Post' : 'Create Post')}
                </Button>
            </div>
        </form>
    );
}
