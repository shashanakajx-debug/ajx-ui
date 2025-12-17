import { NextResponse } from 'next/server';
import { getAllServices, createService } from '@/models/Service';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const services = await getAllServices(true);
        return NextResponse.json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        return NextResponse.json(
            { error: 'Failed to fetch services' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const id = await createService(body);
        return NextResponse.json({ id }, { status: 201 });
    } catch (error) {
        console.error('Error creating service:', error);
        return NextResponse.json(
            { error: 'Failed to create service' },
            { status: 500 }
        );
    }
}
