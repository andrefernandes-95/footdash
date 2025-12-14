'use client';

import { Box, Typography } from '@mui/material';

import LoginForm from '@/app/components/form/login-form/login-form';
import PageLayout from '@/app/components/page-layout/page-layout';
import { LoginOutlined } from '@mui/icons-material';
import PaddedContainer from '@/app/components/padded-container/padded-container';

export default function LoginPage() {
  return (
    <PageLayout>
      <PaddedContainer>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          <LoginOutlined
            sx={{
              fontSize: { xs: 30, sm: 32, md: 34 }, // responsive size
            }}
            color="primary"
          />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '1.6rem', sm: '2rem', md: '2.2rem' },
            }}
            color="primary"
          >
            Login
          </Typography>
        </Box>
        <LoginForm />
      </PaddedContainer>
    </PageLayout>
  );
}
