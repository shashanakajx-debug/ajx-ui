import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authConfig } from '@/auth.config';
import { getUserByEmail, verifyPassword } from '@/models/User';

export const { auth, handlers, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                // 1. Check for Super Admin (Env variables)
                // specific credentials in .env act as a "Master Key"
                const envEmail = process.env.ADMIN_EMAIL;
                const envPassword = process.env.ADMIN_PASSWORD;

                if (envEmail && envPassword &&
                    credentials.email === envEmail &&
                    credentials.password === envPassword) {
                    return {
                        id: 'super-admin',
                        email: envEmail,
                        name: 'Super Admin',
                        role: 'admin',
                    };
                }

                // 2. Check Database Users
                try {
                    const user = await getUserByEmail(credentials.email as string);

                    if (!user) {
                        return null;
                    }

                    const isValidPassword = await verifyPassword(
                        credentials.password as string,
                        user.password
                    );

                    if (!isValidPassword) {
                        return null;
                    }

                    return {
                        id: user._id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                    };
                } catch (error) {
                    console.error('Auth error:', error);
                    return null;
                }
            },
        }),
    ],
});
