'use client';

import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  Card,
  CardContent,
  Chip,
  useTheme,
} from '@mui/material';

import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import StorefrontIcon from '@mui/icons-material/Storefront';
import GroupIcon from '@mui/icons-material/Group';
import StarIcon from '@mui/icons-material/Star';

const features = [
  {
    title: 'Team Calendars',
    description:
      'Organize games, trainings, and events in a shared calendar everyone can rely on.',
    icon: <SportsSoccerIcon fontSize="large" />,
  },
  {
    title: 'Shop & Merchandise',
    description:
      'Sell gear, track orders, and give fans exclusive discounts with zero setup.',
    icon: <StorefrontIcon fontSize="large" />,
  },
  {
    title: 'Player Management',
    description:
      'Track player profiles, stats, attendance, and performance — all in one place.',
    icon: <GroupIcon fontSize="large" />,
  },
  {
    title: 'Fan Subscriptions',
    description:
      'Let fans subscribe for perks, discounts, and exclusive updates automatically.',
    icon: <StarIcon fontSize="large" />,
  },
];

export default function LandingPage() {
  const MAIN_COLOR = '#4f88c5ff'

  return (
    <Box sx={{ bgcolor: '#f6f7fb', color: 'text.primary' }}>

      {/* HERO */}
      <Box
        sx={{
          pt: 18,
          pb: 14,
          backgroundImage: `
            linear-gradient(135deg, rgba(0, 0, 0, .75) 0%, rgba(0, 0, 0, .3) 50%, rgba(0, 0, 0, .75) 100%),
            url('/landing.jpg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4} alignItems="center" textAlign="center">
            <Chip
              label="Introducing the United FC Platform"
              sx={{
                bgcolor: 'rgba(255,255,255,0.25)',
                backdropFilter: 'blur(5px)',
                color: 'white',
                fontWeight: 600,
                px: 2,
                fontSize: 14,
                textShadow: `1px 1px 5px rgba(0, 0, 0, .5)`,
              }}
            />

            <Typography variant="h2" sx={{
              fontWeight: 800, textShadow: `1px 1px 5px rgba(0, 0, 0, .1)`,
            }}>
              Take Your Club to the Next Level
            </Typography>

            <Typography
              variant="h5"
              sx={{
                maxWidth: 650, opacity: 0.9, lineHeight: 1.5, fontWeight: 500,
                textShadow: `1px 1px 5px rgba(0, 0, 0, .2)`,
              }}
            >
              Manage players, games, merchandise, and fans — all from one powerful platform for modern clubs.
            </Typography>

            <Button
              variant="contained"
              size="large"
              sx={{
                px: 7,
                py: 1.8,
                borderRadius: 6,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(2px)',
                color: MAIN_COLOR,
                fontWeight: 900,
                textTransform: 'uppercase',
                fontSize: '1.15rem',
                boxShadow: '0 6px 15px rgba(25, 119, 155, 0.3)',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 1)',
                  boxShadow: '0 10px 25px rgba(25, 119, 155, 0.45)',
                  transform: 'scale(1.05)',
                },
                '&:active': {
                  transform: 'scale(0.98)',
                  boxShadow: '0 5px 12px rgba(25, 119, 155, 0.35)',
                },
              }}
            >
              CREATE YOUR TEAM
            </Button>

          </Stack>
        </Container>
      </Box>

      {/* FEATURES (NO GRID) */}
      <Container maxWidth="lg" sx={{ py: 14 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 10, fontWeight: 800 }}
        >
          Tools Built for Modern Clubs
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="center"
          spacing={4}
          sx={{
            rowGap: 6,
          }}
        >
          {features.map((feature) => (
            <Card
              key={feature.title}
              sx={{
                width: { xs: '100%', sm: '45%', md: '22%' },
                minWidth: 260,
                borderRadius: 5,
                p: 3,
                background: 'white',
                boxShadow: '0px 4px 12px rgba(0,0,0,0.06)',
                transition: 'all 0.25s ease',
                '&:hover': {
                  boxShadow: '0px 8px 20px rgba(0,0,0,0.08)',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Box
                sx={{
                  width: 58,
                  height: 58,
                  borderRadius: 3,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bgcolor: '#eef0ff',
                  color: MAIN_COLOR,
                  mb: 3,
                }}
              >
                {feature.icon}
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                {feature.title}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Card>
          ))}
        </Stack>
      </Container>

      {/* CTA */}
      <Box
        sx={{
          py: 14,
          textAlign: 'center',
          background: '#ffffff',
          borderTop: '1px solid #eee',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
          Ready to Grow Your Team?
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 550, mx: 'auto', mb: 5 }}
        >
          Build your team hub, manage players, and engage your fans — all from a clean, modern dashboard.
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{
            px: 7,
            py: 1.8,
            borderRadius: 4,
            textTransform: 'none',
            fontWeight: 700,
            background: MAIN_COLOR,
            '&:hover': { background: MAIN_COLOR },
          }}
        >
          Get Started Now
        </Button>
      </Box>

      {/* FOOTER */}
      <Box sx={{ py: 5, textAlign: 'center', bgcolor: '#f6f7fb' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} United FC Platform — All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
