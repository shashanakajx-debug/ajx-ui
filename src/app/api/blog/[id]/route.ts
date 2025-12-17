import { NextResponse } from 'next/server';
import { updateBlog, deleteBlog } from '@/models/Blog';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        await updateBlog(id, body);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating blog post:', error);
        return NextResponse.json(
            { error: 'Failed to update blog post' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await deleteBlog(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting blog post:', error);
        return NextResponse.json(
            { error: 'Failed to delete blog post' },
            { status: 500 }
        );
    }
}
