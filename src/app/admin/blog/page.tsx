'use client';

import { useBlogs, useDeleteBlog } from '@/hooks/useBlog';
import Link from 'next/link';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { TableSkeleton } from '@/components/ui/Skeleton';

export default function AdminBlogPage() {
    const { data: blogs, isLoading, error } = useBlogs();
    const deleteMutation = useDeleteBlog();

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this blog post?')) return;

        toast.promise(deleteMutation.mutateAsync(id), {
            loading: 'Deleting blog post...',
            success: 'Blog post deleted successfully!',
            error: 'Failed to delete blog post',
        });
    };

    if (isLoading) {
        return (
            <div>
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-unbounded font-bold text-dark mb-2">
                            Blog Management
                        </h1>
                        <p className="text-gray-text">Manage your blog posts</p>
                    </div>
                </div>
                <TableSkeleton rows={3} />
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
                        Blog Management
                    </h1>
                    <p className="text-gray-text">
                        Manage your blog posts
                    </p>
                </div>
                <Link href="/admin/blog/new" className="btn-primary">
                    + Create New Post
                </Link>
            </div>

            {blogs && blogs.length > 0 ? (
                <div className="grid gap-4">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="card">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-2">
                                        <h3 className="text-xl font-unbounded font-bold text-dark">
                                            {blog.title}
                                        </h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${blog.publishedAt ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {blog.publishedAt ? 'Published' : 'Draft'}
                                        </span>
                                    </div>
                                    <p className="text-gray-text text-sm mb-2">
                                        {blog.excerpt || blog.content?.substring(0, 150)}...
                                    </p>
                                    <div className="flex gap-4 text-xs text-gray-400">
                                        {blog.category && <span>📁 {blog.category}</span>}
                                        {blog.author && <span>✍️ {blog.author}</span>}
                                        {blog.createdAt && (
                                            <span>📅 {format(new Date(blog.createdAt), 'MMM dd, yyyy')}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Link
                                        href={`/admin/blog/${blog._id}`}
                                        className="btn-outline text-sm"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(blog._id!)}
                                        className="text-red-600 hover:text-red-800 px-3 py-2 text-sm font-semibold"
                                        disabled={deleteMutation.isPending}
                                    >
                                        {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="card text-center py-12">
                    <p className="text-gray-text text-lg mb-4">No blog posts yet.</p>
                    <Link href="/admin/blog/new" className="btn-primary">
                        + Write Your First Post
                    </Link>
                </div>
            )}
        </div>
    );
}
