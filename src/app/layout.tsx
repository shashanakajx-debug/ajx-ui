import Script from 'next/script';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { QueryProvider } from '@/providers/QueryProvider';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'sonner';

import ThemeSwitcherButton from '@/components/organisms/Header/ColorSwitcher';

export const metadata = {
  title: 'AJX Technologies | Crafting Digital Experiences That Drive Success',
  description:
    'We craft stunning, user-friendly websites and apps that engage your audience, boost brand visibility, and drive business growth.',
  icons: {
    icon: [
      { url: '/AJX-Fevicon.png', media: '(prefers-color-scheme: light)' },
      { url: '/AJX-Technologies-11.png', media: '(prefers-color-scheme: dark)' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://unpkg.com/@phosphor-icons/web"
          strategy="lazyOnload"
        />
      </head>
      <body className="font-gilroy antialiased no-touch">
        <QueryProvider>
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <ThemeSwitcherButton />
              {children}
            </ThemeProvider>
          </SessionProvider>
          <Toaster position="top-right" richColors closeButton />
        </QueryProvider>
      </body>
    </html>
  );
}
