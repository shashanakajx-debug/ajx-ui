import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { portfolioApi } from '@/services/portfolio.api';
import { Portfolio } from '@/types';

export function usePortfolio() {
    return useQuery({
        queryKey: ['portfolio'],
        queryFn: portfolioApi.getAll,
        staleTime: 5 * 60 * 1000,
    });
}

export function usePortfolioItem(id: string) {
    return useQuery({
        queryKey: ['portfolio', id],
        queryFn: () => portfolioApi.getById(id),
        enabled: !!id,
    });
}

export function useCreatePortfolio() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: portfolioApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['portfolio'] });
        },
    });
}

export function useUpdatePortfolio() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Portfolio> }) =>
            portfolioApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['portfolio'] });
        },
    });
}

export function useDeletePortfolio() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: portfolioApi.delete,
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['portfolio'] });
            const previousPortfolio = queryClient.getQueryData(['portfolio']);
            queryClient.setQueryData<Portfolio[]>(['portfolio'], (old) =>
                old ? old.filter((item) => item._id !== id) : []
            );
            return { previousPortfolio };
        },
        onError: (err, id, context) => {
            if (context?.previousPortfolio) {
                queryClient.setQueryData(['portfolio'], context.previousPortfolio);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['portfolio'] });
        },
    });
}
