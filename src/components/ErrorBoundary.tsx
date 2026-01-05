'use client';

import { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback || (
                    <div className="min-h-screen flex items-center justify-center bg-gray-50">
                        <div className="card max-w-md text-center">
                            <div className="text-6xl mb-4">⚠️</div>
                            <h2 className="text-2xl font-bold text-red-600 mb-2">
                                Something went wrong
                            </h2>
                            <p className="text-gray-600 mb-4">
                                {this.state.error?.message || 'An unexpected error occurred'}
                            </p>
                            <div className="flex gap-3 justify-center">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="btn-primary"
                                >
                                    Reload Page
                                </button>
                                <button
                                    onClick={() => this.setState({ hasError: false, error: null })}
                                    className="btn-outline"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                )
            );
        }

        return this.props.children;
    }
}
