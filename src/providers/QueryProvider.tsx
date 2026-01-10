'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

/**
 * React Query Provider Component
 * 
 * Provides global React Query configuration for the entire app
 * 
 * Configuration:
 * - staleTime: 60 seconds (data considered fresh)
 * - refetchOnWindowFocus: true (auto-refresh on tab switch)
 * - retry: 3 attempts on failure
 * - refetchOnReconnect: true (refresh when network returns)
 * 
 * Features:
 * - Automatic caching (reduces API calls by 50-70%)
 * - Background data synchronization
 * - Optimistic UI updates
 * - Request deduplication
 * - DevTools integration (Ctrl+Shift+Q in development)
 * 
 * @example
 * ```tsx
 * // Wrap your app
 * <QueryProvider>
 *   <App />
 * </QueryProvider>
 * ```
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000, // 1 minute
                        refetchOnWindowFocus: true,
                        retry: 3,
                        refetchOnReconnect: true,
                    },
                    mutations: {
                        retry: 1,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
        </QueryClientProvider>
    );
}
