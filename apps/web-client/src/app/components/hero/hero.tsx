'use client';

import { Box, Typography } from '@mui/material';

interface HeroProps {
  imageUrl: string;
}

export default function Hero({ imageUrl }: HeroProps) {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        color: 'common.white',
      }}
    >
      {/* Background Image with gradients */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0)),
            linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0)),
            url(${imageUrl})
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.2)',
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          px: { xs: 3, lg: 12 },
        }}
      >
        <Box sx={{ maxWidth: 600 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 2,
              fontSize: { xs: '3rem', md: '4.5rem' },
            }}
          >
            Footdash
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{ color: 'common.white', fontSize: { xs: '1.25rem', md: '1.75rem' } }}
          >
            Together in the beautiful game
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
