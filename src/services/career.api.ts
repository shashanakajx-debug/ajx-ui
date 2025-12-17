import axiosInstance, { handleApiError } from '@/lib/axios';
import { Career } from '@/types';

/**
 * Career API
 * All API calls related to career
 */

export const careerApi = {
    /**
     * Get all career listings
     */
    getAll: async (): Promise<Career[]> => {
        try {
            const response = await axiosInstance.get('/api/career');
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },

    /**
     * Get career listing by ID
     */
    getById: async (id: string): Promise<Career> => {
        try {
            const response = await axiosInstance.get(`/api/career/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },

    /**
     * Create new career listing
     */
    create: async (data: Partial<Career>): Promise<{ message: string; id: string }> => {
        try {
            const response = await axiosInstance.post('/api/career', data);
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },

    /**
     * Update career listing
     */
    update: async (id: string, data: Partial<Career>): Promise<{ message: string }> => {
        try {
            const response = await axiosInstance.put(`/api/career/${id}`, data);
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },

    /**
     * Delete career listing
     */
    delete: async (id: string): Promise<{ message: string }> => {
        try {
            const response = await axiosInstance.delete(`/api/career/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },
};
