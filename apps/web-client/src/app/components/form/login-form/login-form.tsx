'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { EmailInput } from '@/app/components/form/email-input/email-input';
import { PasswordInput } from '@/app/components/form/password-input/password-input';
import { Alert, Button } from '@mui/material';
import { ApiRequests } from '@/app/data/api-requests';
import { AppRoutes } from '@/app/data/routes';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { onError } from '@/app/data/error';

type LoginForm = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Minimum 6 characters')
    .required('Password is required'),
});

export default function LoginForm() {
  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  const [networkError, setNetworkError] = useState<string | null>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  // Mutation for login
  const loginMutation = useMutation({
    mutationFn: (data: LoginForm) => ApiRequests.login(data),
    onSuccess: async () => {
      // Refetch or update cached user
      try {
        const { data } = await ApiRequests.me();
        queryClient.setQueryData(['auth', 'me'], data.user);
      } catch {
        queryClient.setQueryData(['auth', 'me'], null);
      }
      router.push(AppRoutes.HOME);
    },
    onError: (error) => onError(error, (msg) => setNetworkError(msg)),
  });

  const onSubmit = (data: LoginForm) => {
    setNetworkError(null);
    loginMutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        minWidth: 400,
      }}
    >
      {networkError && (
        <Alert severity="error" style={{ width: '100%' }}>
          {networkError}
        </Alert>
      )}

      <EmailInput<LoginForm> name="email" control={control} label="Email" />
      <PasswordInput<LoginForm>
        name="password"
        control={control}
        label="Password"
      />

      <Button
        fullWidth
        type="submit"
        disabled={loginMutation.isPending}
        size="large"
      >
        {loginMutation.isPending ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
}
