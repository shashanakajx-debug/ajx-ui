import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

/**
 * DELETE /api/admin/users/[id] - Delete a specific user
 */
export async function DELETE(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id } = params;

        // Get database
        const db = await getDatabase();

        // Get user to delete
        const userToDelete = await db.collection('users').findOne({
            _id: new ObjectId(id)
        });

        if (!userToDelete) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Prevent self-deletion
        if (userToDelete.email === session.user.email) {
            return NextResponse.json(
                { error: 'Cannot delete your own account' },
                { status: 400 }
            );
        }

        // Delete user
        await db.collection('users').deleteOne({ _id: new ObjectId(id) });

        return NextResponse.json({
            message: 'User deleted successfully'
        });

    } catch (error) {
        console.error('Delete user error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * PATCH /api/admin/users/[id] - Update a user
 */
export async function PATCH(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id } = params;
        const data = await request.json();
        const { name, email, password } = data;

        if (!name || !email) {
            return NextResponse.json(
                { error: 'Name and Email are required' },
                { status: 400 }
            );
        }

        const db = await getDatabase();

        // Prepare update data
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updateData: any = {
            name,
            email,
            updatedAt: new Date()
        };

        // If password is provided, hash it
        if (password && password.trim() !== '') {
            const bcrypt = (await import('bcryptjs')).default;
            updateData.password = await bcrypt.hash(password, 10);
        }

        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: 'User updated successfully'
        });

    } catch (error) {
        console.error('Update user error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
