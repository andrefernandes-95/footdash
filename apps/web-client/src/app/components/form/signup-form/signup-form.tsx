'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { EmailInput } from '@/app/components/form/email-input/email-input';
import TextInput from '@/app/components/form/text-input/text-input';
import { PasswordInput } from '@/app/components/form/password-input/password-input';
import PrimaryButton from '@/app/components/form/submit-input/submit-input';
import { Alert } from '@mui/material';
import { ApiRequests } from '@/app/api-requests/api-requests';
import { redirect } from 'next/navigation';
import { AppRoutes } from '@/app/data/routes';
import { useRouter } from 'next/navigation';

type CreateUserForm = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  username: yup.string().required('Username is required'),
  password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function SignupForm() {
  const { control, handleSubmit } = useForm<CreateUserForm>({
    resolver: yupResolver(schema),
  });
  const [networkError, setNetworkError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: CreateUserForm) => {
    setNetworkError(null);
    setLoading(true);

    try {
      const { email, username, password } = data;
      await ApiRequests.signUp({ email, username, password });
      router.push(AppRoutes.CREATE_ACCOUNT_SUCCESS)
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

      <EmailInput<CreateUserForm> name="email" control={control} label="Email" />
      <TextInput<CreateUserForm> name="username" control={control} label="Username" />
      <PasswordInput<CreateUserForm> name="password" control={control} label="Password" />
      <PasswordInput<CreateUserForm> name="confirmPassword" control={control} label="Confirm Password" />

      <PrimaryButton label="Create account" fullWidth type="submit" disabled={loading} />
    </form>
  );
}
