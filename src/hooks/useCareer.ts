import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { careerApi } from '@/services/career.api';
import { Career } from '@/types';

export function useCareers() {
    return useQuery({
        queryKey: ['careers'],
        queryFn: careerApi.getAll,
        staleTime: 5 * 60 * 1000,
    });
}

export function useCareer(id: string) {
    return useQuery({
        queryKey: ['careers', id],
        queryFn: () => careerApi.getById(id),
        enabled: !!id,
    });
}

export function useCreateCareer() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: careerApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['careers'] });
        },
    });
}

export function useUpdateCareer() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Career> }) =>
            careerApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['careers'] });
        },
    });
}

export function useDeleteCareer() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: careerApi.delete,
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['careers'] });
            const previousCareers = queryClient.getQueryData(['careers']);
            queryClient.setQueryData<Career[]>(['careers'], (old) =>
                old ? old.filter((career) => career._id !== id) : []
            );
            return { previousCareers };
        },
        onError: (err, id, context) => {
            if (context?.previousCareers) {
                queryClient.setQueryData(['careers'], context.previousCareers);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['careers'] });
        },
    });
}
