'use client';

import { Box, useTheme } from '@mui/material';
import PageBackdrop from '@/app/components/page-backdrop/page-backdrop';

export default function GlassContainer({
    children,
    maxWidth = 500,
}: {
    children: React.ReactNode;
    maxWidth?: number;
}) {
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
                justifyContent: 'center',
                alignItems: 'center',
                p: { xs: 3, sm: 4 },
            }}
        >
            <PageBackdrop />

            <Box
                sx={{
                    maxWidth,
                    width: '100%',
                    textAlign: 'center',
                    p: { xs: 4, sm: 6 },
                    borderRadius: 3,
                    backdropFilter: 'blur(18px)',
                    background: 'rgba(255,255,255,0.08)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
