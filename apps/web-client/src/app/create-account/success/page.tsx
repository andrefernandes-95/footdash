'use client';

import { Typography, Stack } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Link from 'next/link';
import SubmitInput from '@/app/components/form/submit-input/submit-input';
import GlassContainer from '@/app/components/glass-container/glass-container';

export default function AccountCreatedPage() {
    return (
        <GlassContainer>
            <CheckCircleOutlineIcon
                sx={{
                    fontSize: { xs: 60, sm: 80 },
                    color: '#4caf50',
                    mb: 3,
                }}
            />

            <Typography
                variant="h4"
                sx={{
                    fontWeight: 800,
                    mb: 2,
                }}
            >
                Account Created!
            </Typography>

            <Typography
                variant="body1"
                sx={{
                    opacity: 0.85,
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    mb: 4,
                }}
            >
                Thanks for signing up! Please check your email for a validation link to activate your account.
            </Typography>

            <Stack spacing={2} direction="row" justifyContent="center">
                <Link href="/" passHref>
                    <SubmitInput label='Return to homepage' />
                </Link>
            </Stack>
        </GlassContainer>
    );
}
