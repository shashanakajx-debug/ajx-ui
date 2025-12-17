import { NextResponse } from 'next/server';
import { updateCareer, deleteCareer } from '@/models/Career';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        await updateCareer(id, body);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating career listing:', error);
        return NextResponse.json(
            { error: 'Failed to update career listing' },
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
        await deleteCareer(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting career listing:', error);
        return NextResponse.json(
            { error: 'Failed to delete career listing' },
            { status: 500 }
        );
    }
}
