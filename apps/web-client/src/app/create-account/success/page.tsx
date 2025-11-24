'use client';

import { Box, Typography, Stack, Button, useTheme } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Link from 'next/link';
import PageBackdrop from '@/app/components/page-backdrop/page-backdrop';
import SubmitInput from '@/app/components/form/submit-input/submit-input';

export default function AccountCreatedPage() {
    const theme = useTheme();

    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                bgcolor: theme.palette.grey[900],
                color: 'white',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' }, // mobile stacking
            }}
        >
            <Box
                sx={{
                    minHeight: '100vh',
                    width: '100%',
                    bgcolor: theme.palette.grey[900],
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: { xs: 4, sm: 6 },
                }}
            >
                <PageBackdrop />
                <Box
                    sx={{
                        maxWidth: 500,
                        width: '100%',
                        textAlign: 'center',
                        p: 6,
                        borderRadius: 3,
                        backdropFilter: 'blur(18px)',
                        background: 'rgba(255,255,255,0.08)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
                    }}
                >
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
                </Box>
            </Box>
        </Box>
    );
}
