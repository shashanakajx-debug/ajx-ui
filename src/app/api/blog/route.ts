import { NextResponse } from 'next/server';
import { getAllBlogs, createBlog } from '@/models/Blog';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const blogs = await getAllBlogs();
        return NextResponse.json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json(
            { error: 'Failed to fetch blogs' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const id = await createBlog(body);
        return NextResponse.json({ id }, { status: 201 });
    } catch (error) {
        console.error('Error creating blog post:', error);
        return NextResponse.json(
            { error: 'Failed to create blog post' },
            { status: 500 }
        );
    }
}
