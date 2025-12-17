import axiosInstance, { handleApiError } from '@/lib/axios';
import { Portfolio } from '@/types';

/**
 * Portfolio API
 * All API calls related to portfolio
 */

export const portfolioApi = {
    /**
     * Get all portfolio items
     */
    getAll: async (): Promise<Portfolio[]> => {
        try {
            const response = await axiosInstance.get('/api/portfolio');
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },

    /**
     * Get portfolio item by ID
     */
    getById: async (id: string): Promise<Portfolio> => {
        try {
            const response = await axiosInstance.get(`/api/portfolio/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },

    /**
     * Create new portfolio item
     */
    create: async (data: Partial<Portfolio>): Promise<{ message: string; id: string }> => {
        try {
            const response = await axiosInstance.post('/api/portfolio', data);
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },

    /**
     * Update portfolio item
     */
    update: async (id: string, data: Partial<Portfolio>): Promise<{ message: string }> => {
        try {
            const response = await axiosInstance.put(`/api/portfolio/${id}`, data);
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },

    /**
     * Delete portfolio item
     */
    delete: async (id: string): Promise<{ message: string }> => {
        try {
            const response = await axiosInstance.delete(`/api/portfolio/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },
};
