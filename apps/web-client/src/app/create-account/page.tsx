'use client';

import {
  Box,
  Typography,
  Stack,
  useTheme,
} from '@mui/material';

import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

import SignupForm from '@/app/components/form/signup-form/signup-form';
import PageBackdrop from '@/app/components/page-backdrop/page-backdrop';

export default function SignUpTwoStep() {
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
      <PageBackdrop />

      {/* Form panel */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },        // full width mobile
          minHeight: { xs: '100vh', },
          p: { xs: 4, sm: 5, md: 6 },              // tighter padding on small devices
          backdropFilter: 'blur(18px)',
          background:
            'linear-gradient(to bottom right, rgba(255,255,255,0.12), rgba(255,255,255,0.04))',
          borderRight: {
            xs: 'none',
            md: '1px solid rgba(255,255,255,0.15)',
          },
          borderBottom: {
            xs: '1px solid rgba(255,255,255,0.15)',
            md: 'none',
          },
          boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: { xs: 'flex-start', md: 'center' },
          zIndex: 1,
          pt: { xs: 10, sm: 12, md: 6 },           // more breathing room on phones
          pb: { xs: 12, md: 6 },
        }}
      >
        {/* Header */}
        <Stack spacing={1.5} sx={{ mb: { xs: 4, sm: 5, md: 6 } }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
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

          <Typography
            variant="body1"
            sx={{
              opacity: 0.85,
              fontSize: { xs: '1rem', sm: '1.05rem' },
              lineHeight: 1.6,
            }}
          >
            Build your team’s home on the web, manage your squad, and engage with fans —
            all from one modern dashboard.
          </Typography>
        </Stack>

        {/* Form */}
        <Stack spacing={{ xs: 4, sm: 5 }}>
          <SignupForm />
        </Stack>

        {/* Friendly reassurance points */}
        <Stack spacing={3} sx={{ mt: { xs: 4 } }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <EmojiPeopleIcon sx={{ opacity: 0.75, fontSize: { xs: 22, md: 26 } }} />
            <Typography sx={{ opacity: 0.85, fontSize: { xs: '0.95rem', md: '1rem' } }}>
              Manage your squad — players, staff, and content creators.
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <VolunteerActivismIcon sx={{ opacity: 0.75, fontSize: { xs: 22, md: 26 } }} />
            <Typography sx={{ opacity: 0.85, fontSize: { xs: '0.95rem', md: '1rem' } }}>
              Engage supporters with updates, matchday moments, and more.
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
