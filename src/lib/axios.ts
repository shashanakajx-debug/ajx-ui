import axios, { AxiosInstance, AxiosError } from 'axios';

/**
 * Axios Instance Configuration
 * 
 * Features:
 * - Base URL configuration
 * - Request/Response interceptors
 * - Error handling
 * - Loading states
 * - Request cancellation
 */

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || '',
    timeout: 30000, // 30 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Add timestamp to prevent caching
        config.params = {
            ...config.params,
            _t: Date.now(),
        };

        // Add auth token if available (for future use)
        // const token = getAuthToken();
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Transform response if needed
        return response;
    },
    (error: AxiosError) => {
        // Handle different error types
        if (error.response) {
            // Server responded with error status
            const { status } = error.response;

            switch (status) {
                case 401:
                    // Unauthorized - redirect to login
                    if (typeof window !== 'undefined') {
                        window.location.href = '/admin/login';
                    }
                    break;
                case 403:
                    // Forbidden
                    console.error('Access forbidden');
                    break;
                case 404:
                    // Not found
                    console.error('Resource not found');
                    break;
                case 500:
                    // Server error
                    console.error('Server error occurred');
                    break;
                default:
                    console.error('An error occurred:', error.message);
            }
        } else if (error.request) {
            // Request made but no response
            console.error('No response from server');
        } else {
            // Error in request configuration
            console.error('Request error:', error.message);
        }

        return Promise.reject(error);
    }
);

// Helper function to handle errors
export const handleApiError = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            // Server error with response
            return error.response.data?.error || error.response.data?.message || 'An error occurred';
        } else if (error.request) {
            // No response received
            return 'No response from server. Please check your connection.';
        } else {
            // Request setup error
            return error.message || 'Failed to make request';
        }
    }
    return 'An unexpected error occurred';
};

// Cancel token source for request cancellation
export const createCancelTokenSource = () => axios.CancelToken.source();

export default axiosInstance;
