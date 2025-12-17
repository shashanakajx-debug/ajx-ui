import axiosInstance, { handleApiError } from '@/lib/axios';
import { Contact } from '@/types';

/**
 * Contact API
 * All API calls related to contact
 */

export const contactApi = {
    /**
     * Get all contact submissions
     */
    getAll: async (): Promise<Contact[]> => {
        try {
            const response = await axiosInstance.get('/api/contact');
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },

    /**
     * Get contact submission by ID
     */
    getById: async (id: string): Promise<Contact> => {
        try {
            const response = await axiosInstance.get(`/api/contact/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },

    /**
     * Update contact status
     */
    updateStatus: async (
        id: string,
        status: 'new' | 'read' | 'replied'
    ): Promise<{ message: string }> => {
        try {
            const response = await axiosInstance.put(`/api/contact/${id}`, { status });
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },

    /**
     * Delete contact submission
     */
    delete: async (id: string): Promise<{ message: string }> => {
        try {
            const response = await axiosInstance.delete(`/api/contact/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },
};
