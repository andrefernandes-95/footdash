'use client';

import {
  Box,
  Typography,
  Stack,
} from '@mui/material';

import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

import GlassContainer from '@/app/components/glass-container/glass-container';
import LoginForm from '@/app/components/form/login-form/login-form';

export default function LoginPage() {
  return (
    <GlassContainer>
      {/* Form panel */}

      {/* Header */}
      <Stack spacing={1.5} sx={{ mb: { xs: 2} }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.5,
          }}
        >
          <SportsSoccerIcon
            sx={{
              fontSize: { xs: 30, sm: 32, md: 34 },  // responsive size
              color: '#fff',
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '1.6rem', sm: '2rem', md: '2.2rem' },
            }}
          >
            Login
          </Typography>
        </Box>

      </Stack>

      <Stack sx={{ mb: { xs: 2} }} />

      {/* Form */}
      <Stack spacing={{ xs: 4, sm: 5 }}>
        <LoginForm />
      </Stack>
    </GlassContainer>
  );
}
