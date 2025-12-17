import { NextRequest, NextResponse } from 'next/server';
import { createContact, getAllContacts } from '@/models/Contact';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const contacts = await getAllContacts();
        return NextResponse.json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch contacts' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, company, subject, message } = body;

        // Basic validation
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'Please fill in all required fields' },
                { status: 400 }
            );
        }

        // Create contact in database
        const contactId = await createContact({
            name,
            email,
            phone,
            company,
            subject,
            message,
        });

        return NextResponse.json(
            { message: 'Contact form submitted successfully', id: contactId },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error processing contact form:', error);
        return NextResponse.json(
            { error: 'Failed to submit contact form' },
            { status: 500 }
        );
    }
}
