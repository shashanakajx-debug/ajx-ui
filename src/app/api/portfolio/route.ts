import { NextResponse } from 'next/server';
import { getAllPortfolio, createPortfolio } from '@/models/Portfolio';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const portfolio = await getAllPortfolio();
        return NextResponse.json(portfolio);
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        return NextResponse.json(
            { error: 'Failed to fetch portfolio' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const id = await createPortfolio(body);
        return NextResponse.json({ id }, { status: 201 });
    } catch (error) {
        console.error('Error creating portfolio item:', error);
        return NextResponse.json(
            { error: 'Failed to create portfolio item' },
            { status: 500 }
        );
    }
}
