import { NextResponse } from 'next/server';
import { getAllCareers, createCareer } from '@/models/Career';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const careers = await getAllCareers();
        return NextResponse.json(careers);
    } catch (error) {
        console.error('Error fetching careers:', error);
        return NextResponse.json(
            { error: 'Failed to fetch careers' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const id = await createCareer(body);
        return NextResponse.json({ id }, { status: 201 });
    } catch (error) {
        console.error('Error creating career listing:', error);
        return NextResponse.json(
            { error: 'Failed to create career listing' },
            { status: 500 }
        );
    }
}
