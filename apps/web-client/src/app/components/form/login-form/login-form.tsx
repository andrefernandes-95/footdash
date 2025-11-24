'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { EmailInput } from '@/app/components/form/email-input/email-input';
import { PasswordInput } from '@/app/components/form/password-input/password-input';
import PrimaryButton from '@/app/components/form/submit-input/submit-input';
import { Alert } from '@mui/material';
import { ApiRequests } from '@/app/data/api-requests';
import { AppRoutes } from '@/app/data/routes';
import { useRouter } from 'next/navigation';

type LoginForm = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
});

export default function LoginForm() {
  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });
  const [networkError, setNetworkError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    setNetworkError(null);
    setLoading(true);

    try {
      const { email, password } = data;
      await ApiRequests.login({ email, password });
      router.push(AppRoutes.USER)
    } catch (error: any) {
      console.error(error);
      setNetworkError(error?.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-end' }}
    >
      {networkError && <Alert severity="error" style={{ width: '100%' }}>{networkError}</Alert>}

      <EmailInput<LoginForm> name="email" control={control} label="Email" />
      <PasswordInput<LoginForm> name="password" control={control} label="Password" />

      <PrimaryButton label="Login" fullWidth type="submit" disabled={loading} />
    </form>
  );
}
