import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getDatabase } from '@/lib/mongodb';

/**
 * GET /api/admin/users - Get all admin users
 */
export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const db = await getDatabase();
        const users = await db.collection('users')
            .find({}, { projection: { password: 0 } }) // Never send passwords
            .toArray();

        return NextResponse.json(
            users.map(user => ({
                ...user,
                _id: user._id.toString(),
            }))
        );

    } catch (error) {
        console.error('Get users error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * POST /api/admin/users - Create a new admin user
 */
export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const data = await request.json();
        const { name, email, password } = data;

        // Validation
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const db = await getDatabase();
        const existingUser = await db.collection('users').findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 400 }
            );
        }

        // Import dynamically to avoid circular dependencies if any, though regular import is fine here
        const { createUser } = await import('@/models/User');

        await createUser({
            name,
            email,
            password, // createUser handles hashing
            role: 'admin' // Force role to admin for now
        });

        return NextResponse.json(
            { message: 'User created successfully' },
            { status: 201 }
        );

    } catch (error) {
        console.error('Create user error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
