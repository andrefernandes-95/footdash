'use client';

import { useEffect, useState } from 'react';
import { Alert, Box, CircularProgress, Typography, Stack } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ApiRequests } from '@/app/data/api-requests';
import PrimaryButton from '@/app/components/form/submit-input/submit-input';
import { AppRoutes } from '@/app/data/routes';
import PageLayout from '@/app/components/page-layout/page-layout';
import PaddedContainer from '@/app/components/padded-container/padded-container';
import { MailOutline } from '@mui/icons-material';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function run() {
      if (!token) {
        setError('No verification token provided.');
        setLoading(false);
        return;
      }

      try {
        await ApiRequests.verifyEmail(token);
        setSuccess(true);
      } catch (err: any) {
        const message =
          err?.response?.data?.message ??
          'Verification failed or token is invalid.';
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    run();
  }, [token]);

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
          <MailOutline
            sx={{
              fontSize: { xs: 25, sm: 50 },
              mb: 3,
            }}
            color="primary"
          />
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              fontWeight: 800,
              fontSize: { xs: '1.9rem', sm: '2.2rem' },
            }}
            color="primary"
          >
            Email Verification
          </Typography>
        </Box>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                opacity: 0.85,
                fontSize: { xs: '1rem', sm: '1.1rem' },
              }}
            >
              We're validating your account. This may take a moment.
            </Typography>

            <CircularProgress size={42} />
          </Box>
        )}

        {!loading && success && (
          <Alert
            severity="success"
            sx={{
              mb: 4,
              fontSize: '1rem',
              borderRadius: 2,
            }}
          >
            Your email has been verified successfully! You may now log in.
          </Alert>
        )}

        {!loading && error && (
          <Alert
            severity="error"
            sx={{
              mb: 4,
              fontSize: '1rem',
              borderRadius: 2,
            }}
          >
            {error}
          </Alert>
        )}

        <Stack direction="row" justifyContent="center">
          {success && (
            <Link href={AppRoutes.LOGIN} passHref>
              <PrimaryButton label="Login" />
            </Link>
          )}
          <Link href="/" passHref>
            <PrimaryButton label="Return Home" />
          </Link>
        </Stack>
      </PaddedContainer>
    </PageLayout>
  );
}
