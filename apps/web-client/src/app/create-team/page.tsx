'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Typography, Stack, Alert } from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import GlassContainer from '@/app/components/glass-container/glass-container';
import TextInput from '@/app/components/form/text-input/text-input';
import PrimaryButton from '@/app/components/form/submit-input/submit-input';
import { ApiRequests } from '@/app/data/api-requests';
import { useRouter } from 'next/navigation';
import { AppRoutes } from '@/app/data/routes';
import { MuiColorInput } from 'mui-color-input'

type CreateTeamForm = {
  name: string;
  slug: string;
  color: string;
};

const schema = yup.object({
  name: yup.string().required('Team name is required'),
  slug: yup.string().required('Team slug is required'),
  color: yup.string().required('Team color is required')
});

export default function CreateTeamPage() {
  const { control, handleSubmit } = useForm<CreateTeamForm>({
    resolver: yupResolver(schema),
  });

  const [networkError, setNetworkError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: CreateTeamForm) => {
    setNetworkError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const response = await ApiRequests.createTeam(data);
      setSuccessMessage(`Team "${data.name}" created successfully!`);
      // Optionally redirect to the team dashboard
      router.push(AppRoutes.USER)
      // router.push(`/user/${response.userId}/teams`);
    } catch (error: any) {
      console.error(error);
      setNetworkError(error?.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassContainer>
      {/* Header */}
      <Stack spacing={1.5} sx={{ mb: { xs: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
          <SportsSoccerIcon sx={{ fontSize: { xs: 30, sm: 32, md: 34 }, color: '#fff' }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, fontSize: { xs: '1.6rem', sm: '2rem', md: '2.2rem' } }}
          >
            Create Team
          </Typography>
        </Box>
      </Stack>

      <Stack sx={{ mb: { xs: 2 } }} />

      {/* Form */}
      <Stack spacing={{ xs: 4, sm: 5 }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-end' }}
        >
          {networkError && <Alert severity="error" style={{ width: '100%' }}>{networkError}</Alert>}
          {successMessage && <Alert severity="success" style={{ width: '100%' }}>{successMessage}</Alert>}

          <TextInput<CreateTeamForm> name="name" control={control} label="Team Name" />
          <TextInput<CreateTeamForm> name="slug" control={control} label="Team Slug" />

          <Controller
            name="color"
            control={control}
            defaultValue='#19779B'
            render={({ field }) => (
              <MuiColorInput format="hex" value={field.value} onChange={field.onChange} />
            )} />

          <PrimaryButton label="Create Team" fullWidth type="submit" disabled={loading} />
        </form>
      </Stack>
    </GlassContainer>
  );
}
