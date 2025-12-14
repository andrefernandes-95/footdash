import { ApiRequests } from '@/app/data/api-requests';
import { Button } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function Logout() {
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: ApiRequests.logout,
    onSuccess: () => {
      queryClient.setQueryData(['auth', 'me'], null);
    },
  });

  return (
    <Button
      variant="text"
      color="secondary"
      onClick={() => logoutMutation.mutate()}
    >
      Logout
    </Button>
  );
}
