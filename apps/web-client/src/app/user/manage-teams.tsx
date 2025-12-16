'use client';

import { AppConfig } from '@/app/data/config';
import { AppRoutes } from '@/app/data/routes';
import { useGetMyTeams } from '@/app/hooks/useGetMyTeams';
import { User } from '@/app/types/models';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Button,
} from '@mui/material';

const sampleTeams = [
  {
    id: 1,
    name: 'FC Porto Legends',
    role: 'Owner',
    color: '#19779B',
  },
  {
    id: 2,
    name: 'Sunday League Lions',
    role: 'Player',
    color: '#EFB034',
  },
  {
    id: 3,
    name: 'Northside Ultras',
    role: 'Fan',
    color: '#9D4EDD',
  },
];

interface Props {
  user: User | null;
}

export default function TeamsPage({ user }: Props) {
  const { teams, loading } = useGetMyTeams();

  return (
    <Box sx={{ width: '100%' }}>
      {/* HEADER */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          mb: 4,
          color: 'white',
          textShadow: '0 2px 10px rgba(0,0,0,0.4)',
        }}
      >
        Your Teams
      </Typography>

      <Typography
        sx={{
          mb: 6,
          opacity: 0.75,
          maxWidth: 650,
          lineHeight: 1.6,
        }}
      >
        These are the teams you own, play for, or support. Click on a team to
        manage rosters, schedules, merchandise, and fan engagement.
      </Typography>

      {/* TEAMS GRID */}
      <Grid container spacing={4}>
        {/* @ts-expect-error fix later        */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              height: 180,
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(16px)',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.18)',
              transition: '0.2s ease',
              cursor: 'pointer',
              '&:hover': {
                background: 'rgba(255,255,255,0.12)',
                boxShadow: '0 0 25px rgba(255,255,255,0.12)',
              },
            }}
          >
            <CardActionArea
              href="/create-team"
              sx={{ height: '100%', display: 'flex', alignItems: 'center' }}
            >
              <Typography
                sx={{
                  width: '100%',
                  textAlign: 'center',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: 'white',
                }}
              >
                + Create Team
              </Typography>
            </CardActionArea>
          </Card>
        </Grid>

        {/* EXISTING TEAMS */}
        {(teams ?? []).map((team) => (
          // @ts-expect-error fix later
          <Grid item xs={12} sm={6} md={4} key={team.id}>
            <Card
              sx={{
                height: 180,
                width: 180,
                borderRadius: 4,
                position: 'relative',
                overflow: 'hidden',
                background: `linear-gradient(135deg, ${team.color}33 0%, ${team.color}22 100%)`,
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.18)',
                transition: '0.25s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 10px 30px ${team.color}55`,
                  background: `linear-gradient(135deg, ${team.color}55 0%, ${team.color}33 100%)`,
                },
              }}
            >
              <CardActionArea
                href={AppRoutes.TEAM_DASHBOARD(team.slug)}
                sx={{ height: '100%' }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 800, color: 'white', mb: 1 }}
                  >
                    {team.name}
                  </Typography>

                  <Chip
                    label={
                      team.members?.find((x) => x.userId === user?.id)?.teamRole
                    }
                    sx={{
                      background: 'rgba(0,0,0,0.4)',
                      color: 'white',
                      fontWeight: 700,
                      backdropFilter: 'blur(4px)',
                    }}
                  />

                  <Box sx={{ mt: 3 }}>
                    <Button
                      variant="text"
                      sx={{
                        color: 'white',
                        opacity: 0.85,
                        textTransform: 'none',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        p: 0,
                        '&:hover': { opacity: 1 },
                      }}
                    >
                      Manage →
                    </Button>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
