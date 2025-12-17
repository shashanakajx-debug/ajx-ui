import React from 'react';

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
    return (
        <div
            className={`animate-pulse bg-gray-200 rounded ${className}`}
            aria-live="polite"
            aria-busy="true"
        />
    );
}

export function CardSkeleton() {
    return (
        <div className="card">
            <div className="flex items-start justify-between mb-4">
                <Skeleton className="w-12 h-12 rounded-lg" />
                <Skeleton className="w-16 h-6 rounded-full" />
            </div>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-4" />
            <div className="flex gap-2">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-20" />
            </div>
        </div>
    );
}

export function TableSkeleton({ rows = 3 }: { rows?: number }) {
    return (
        <div className="space-y-4">
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="card">
                    <div className="flex justify-between items-start">
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-6 w-1/2" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                        <div className="flex gap-2">
                            <Skeleton className="h-10 w-16" />
                            <Skeleton className="h-10 w-16" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
