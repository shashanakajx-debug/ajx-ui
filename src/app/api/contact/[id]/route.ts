import { NextResponse } from 'next/server';
import { updateContactStatus, deleteContact } from '@/models/Contact';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { status } = body;

        await updateContactStatus(id, status);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating contact status:', error);
        return NextResponse.json(
            { error: 'Failed to update contact status' },
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
        await deleteContact(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting contact:', error);
        return NextResponse.json(
            { error: 'Failed to delete contact' },
            { status: 500 }
        );
    }
}
