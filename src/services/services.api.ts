import axiosInstance, { handleApiError } from '@/lib/axios';
import { Service } from '@/types';

/**
 * Services API
 * All API calls related to services
 */

export const servicesApi = {
    /**
     * Get all services
     */
    getAll: async (): Promise<Service[]> => {
        try {
            const response = await axiosInstance.get('/api/services');
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },

    /**
     * Get service by ID
     */
    getById: async (id: string): Promise<Service> => {
        try {
            const response = await axiosInstance.get(`/api/services/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },

    /**
     * Create new service
     */
    create: async (data: Partial<Service>): Promise<{ message: string; id: string }> => {
        try {
            const response = await axiosInstance.post('/api/services', data);
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },

    /**
     * Update service
     */
    update: async (id: string, data: Partial<Service>): Promise<{ message: string }> => {
        try {
            const response = await axiosInstance.put(`/api/services/${id}`, data);
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },

    /**
     * Delete service
     */
    delete: async (id: string): Promise<{ message: string }> => {
        try {
            const response = await axiosInstance.delete(`/api/services/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },
};
