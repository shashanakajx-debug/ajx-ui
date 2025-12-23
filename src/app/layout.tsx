import { Unbounded, Poppins } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { QueryProvider } from '@/providers/QueryProvider';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'sonner';

const unbounded = Unbounded({
    subsets: ['latin'],
    variable: '--font-unbounded',
    display: 'swap',
});

const poppins = Poppins({
    weight: ['400', '600', '700'],
    subsets: ['latin'],
    variable: '--font-poppins',
    display: 'swap',
});

export const metadata = {
    title: 'AJX Technologies | Crafting Digital Experiences That Drive Success',
    description: 'We craft stunning, user-friendly websites and apps that engage your audience, boost brand visibility, and drive business growth.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script src="https://unpkg.com/@phosphor-icons/web"></script>
            </head>
            <body
                className={`${unbounded.variable} ${poppins.variable} font-poppins antialiased no-touch`}
            >
                <QueryProvider>
                    <SessionProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >
                            {children}
                        </ThemeProvider>
                    </SessionProvider>
                    <Toaster position="top-right" richColors closeButton />
                </QueryProvider>
            </body>
        </html>
    );
}

