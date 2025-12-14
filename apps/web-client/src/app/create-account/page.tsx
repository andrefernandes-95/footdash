'use client';

import { Box, Typography } from '@mui/material';

import PageLayout from '@/app/components/page-layout/page-layout';
import { LoginOutlined } from '@mui/icons-material';
import SignupForm from '@/app/components/form/signup-form/signup-form';
import PaddedContainer from '@/app/components/padded-container/padded-container';

export default function CreateAccountPage() {
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
            Create Account
          </Typography>
        </Box>

        <SignupForm />
      </PaddedContainer>
    </PageLayout>
  );
}
