'use client';

import {
  Box,
  Typography,
  Stack,
  useTheme,
  Divider,
} from '@mui/material';

import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

import SignupForm from '@/app/components/form/signup-form/signup-form';
import GlassContainer from '@/app/components/glass-container/glass-container';

export default function CreateAccountPage() {
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
            Join FootDash
          </Typography>
        </Box>

      <Stack sx={{ mb: { xs: 2} }} />

        {/* Friendly reassurance points */}
      <Stack spacing={3} sx={{ mt: { xs: 4 } }}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <EmojiPeopleIcon sx={{ opacity: 0.75, fontSize: { xs: 22, md: 26 } }} />
          <Typography align="left" sx={{ opacity: 0.85, fontSize: { xs: '0.95rem', md: '1rem' } }}>
            Manage your squad — players, staff, and content creators.
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="flex-start">
          <VolunteerActivismIcon sx={{ opacity: 0.75, fontSize: { xs: 22, md: 26 } }} />
          <Typography align="left" sx={{ opacity: 0.85, fontSize: { xs: '0.95rem', md: '1rem' } }}>
            Engage supporters with updates, matchday moments, and more.
          </Typography>
        </Stack>
      </Stack>
      </Stack>

      <Stack sx={{ mb: { xs: 2} }} />

      {/* Form */}
      <Stack spacing={{ xs: 4, sm: 5 }}>
        <SignupForm />
      </Stack>
    </GlassContainer>
  );
}
