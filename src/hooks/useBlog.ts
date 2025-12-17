import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { blogApi } from '@/services/blog.api';
import { Blog } from '@/types';

export function useBlogs() {
    return useQuery({
        queryKey: ['blogs'],
        queryFn: blogApi.getAll,
        staleTime: 5 * 60 * 1000,
    });
}

export function useBlog(id: string) {
    return useQuery({
        queryKey: ['blogs', id],
        queryFn: () => blogApi.getById(id),
        enabled: !!id,
    });
}

export function useCreateBlog() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: blogApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
        },
    });
}

export function useUpdateBlog() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Blog> }) =>
            blogApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
        },
    });
}

export function useDeleteBlog() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: blogApi.delete,
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['blogs'] });
            const previousBlogs = queryClient.getQueryData(['blogs']);
            queryClient.setQueryData<Blog[]>(['blogs'], (old) =>
                old ? old.filter((blog) => blog._id !== id) : []
            );
            return { previousBlogs };
        },
        onError: (err, id, context) => {
            if (context?.previousBlogs) {
                queryClient.setQueryData(['blogs'], context.previousBlogs);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
        },
    });
}
