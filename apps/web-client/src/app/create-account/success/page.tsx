'use client';

import { Typography, Stack, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Link from 'next/link';
import SubmitInput from '@/app/components/form/submit-input/submit-input';
import PageLayout from '@/app/components/page-layout/page-layout';
import PaddedContainer from '@/app/components/padded-container/padded-container';

export default function AccountCreatedPage() {
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
          <CheckCircleOutlineIcon
            sx={{
              fontSize: { xs: 25, sm: 50 },
              mb: 3,
            }}
            color="primary"
          />

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mb: 2,
            }}
            color="primary"
          >
            Account Created!
          </Typography>
        </Box>

        <Typography
          variant="body1"
          sx={{
            opacity: 0.85,
            fontSize: { xs: '1rem', sm: '1.1rem' },
            mb: 4,
          }}
        >
          Thanks for signing up! Please check your email for a validation link
          to activate your account.
        </Typography>

        <Stack spacing={2} direction="row" justifyContent="center">
          <Link href="/" passHref>
            <SubmitInput label="Return to homepage" />
          </Link>
        </Stack>
      </PaddedContainer>
    </PageLayout>
  );
}
