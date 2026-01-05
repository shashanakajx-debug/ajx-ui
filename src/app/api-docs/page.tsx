'use client';

import { useEffect, useState } from 'react';
import swaggerDefinition from '@/lib/swagger';
import Head from 'next/head';

export default function ApiDocsPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [SwaggerUI, setSwaggerUI] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Dynamically import SwaggerUI to avoid SSR issues
        import('swagger-ui-react').then((mod) => {
            setSwaggerUI(() => mod.default);
            setLoading(false);
        }).catch((err) => {
            console.error('Failed to load Swagger UI:', err);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-orange mx-auto mb-4"></div>
                    <p className="text-gray-text">Loading API Documentation...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="card max-w-md text-center">
                    <h2 className="text-xl font-bold text-red-600 mb-4">Failed to Load</h2>
                    <p className="text-gray-text mb-4">{error}</p>
                    <button onClick={() => window.location.reload()} className="btn-primary">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* CDN CSS for Swagger UI */}
            <link
                rel="stylesheet"
                href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css"
            />

            <div className="min-h-screen bg-white">
                <div className="container-custom py-8">
                    <div className="mb-8">
                        <h1 className="text-4xl font-unbounded font-bold text-dark mb-2">
                            API Documentation
                        </h1>
                        <p className="text-gray-text text-lg">
                            Interactive API documentation for AJX Technologies backend
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        {SwaggerUI ? (
                            <SwaggerUI spec={swaggerDefinition} />
                        ) : (
                            <div className="p-8 text-center text-gray-text">
                                Swagger UI not available. Please refresh the page.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
