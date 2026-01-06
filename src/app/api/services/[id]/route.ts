import { NextResponse } from 'next/server';
import { updateService, deleteService } from '@/models/Service';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        await updateService(id, body);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating service:', error);
        return NextResponse.json(
            { error: 'Failed to update service' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await deleteService(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting service:', error);
        return NextResponse.json(
            { error: 'Failed to delete service' },
            { status: 500 }
        );
    }
}
