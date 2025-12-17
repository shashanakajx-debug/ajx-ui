import { NextResponse } from 'next/server';
import { updatePortfolio, deletePortfolio } from '@/models/Portfolio';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        await updatePortfolio(id, body);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating portfolio item:', error);
        return NextResponse.json(
            { error: 'Failed to update portfolio item' },
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
        await deletePortfolio(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting portfolio item:', error);
        return NextResponse.json(
            { error: 'Failed to delete portfolio item' },
            { status: 500 }
        );
    }
}
