import { useQuery } from '@tanstack/react-query';
import { ApiRequests } from '@/app/data/api-requests';
import { User } from '@/app/types/models';

export function useAuth() {
  const { data, isLoading } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const { data } = await ApiRequests.me();
      return data.user as User;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });

  return {
    user: data ?? null,
    loading: isLoading,
    isAuthenticated: !!data,
  };
}
