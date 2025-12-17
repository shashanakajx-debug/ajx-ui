import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    description?: string;
}

export default function Input({ label, error, description, className = '', ...props }: InputProps) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-semibold mb-2 text-dark">
                    {label}
                </label>
            )}
            <input
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange transition-all ${error ? 'border-red-500' : 'border-gray-300'
                    } ${className}`}
                {...props}
            />
            {description && <p className="mt-1 text-xs text-gray-500">{description}</p>}
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}
