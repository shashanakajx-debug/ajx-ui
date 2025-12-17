import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { servicesApi } from '@/services/services.api';
import { Service } from '@/types';

/**
 * React Query hooks for Services CRUD operations
 * 
 * Features:
 * - Automatic caching (5 min staleTime)
 * - Background refetching on window focus
 * - Optimistic UI updates (instant delete feedback)
 * - Auto retry on failure (3x default)
 * 
 * @module useServices
 * @example
 * ```typescript
 * // Fetch all services
 * const { data: services, isLoading } = useServices();
 * 
 * // Delete with optimistic update
 * const deleteMutation = useDeleteService();
 * deleteMutation.mutate(serviceId);
 * ```
 */

/**
 * Fetches all services from the API
 * Data is automatically cached for 5 minutes
 * @returns Query object with services data, loading, and error states
 */
export function useServices() {
    return useQuery({
        queryKey: ['services'],
        queryFn: servicesApi.getAll,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

export function useService(id: string) {
    return useQuery({
        queryKey: ['services', id],
        queryFn: () => servicesApi.getById(id),
        enabled: !!id,
    });
}

export function useCreateService() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: servicesApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] });
        },
    });
}

export function useUpdateService() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Service> }) =>
            servicesApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] });
        },
    });
}

export function useDeleteService() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: servicesApi.delete,
        onMutate: async (id) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: ['services'] });

            // Snapshot previous value
            const previousServices = queryClient.getQueryData(['services']);

            // Optimistically update
            queryClient.setQueryData<Service[]>(['services'], (old) =>
                old ? old.filter((service) => service._id !== id) : []
            );

            return { previousServices };
        },
        onError: (err, id, context) => {
            // Rollback on error
            if (context?.previousServices) {
                queryClient.setQueryData(['services'], context.previousServices);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] });
        },
    });
}
