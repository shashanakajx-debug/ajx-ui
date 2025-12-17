import axiosInstance, { handleApiError } from '@/lib/axios';
import { Blog } from '@/types';

/**
 * Blog API
 * All API calls related to blog
 */

export const blogApi = {
    /**
     * Get all blog posts
     */
    getAll: async (): Promise<Blog[]> => {
        try {
            const response = await axiosInstance.get('/api/blog');
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },

    /**
     * Get blog post by ID
     */
    getById: async (id: string): Promise<Blog> => {
        try {
            const response = await axiosInstance.get(`/api/blog/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },

    /**
     * Create new blog post
     */
    create: async (data: Partial<Blog>): Promise<{ message: string; id: string }> => {
        try {
            const response = await axiosInstance.post('/api/blog', data);
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },

    /**
     * Update blog post
     */
    update: async (id: string, data: Partial<Blog>): Promise<{ message: string }> => {
        try {
            const response = await axiosInstance.put(`/api/blog/${id}`, data);
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },

    /**
     * Delete blog post
     */
    delete: async (id: string): Promise<{ message: string }> => {
        try {
            const response = await axiosInstance.delete(`/api/blog/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },
};
