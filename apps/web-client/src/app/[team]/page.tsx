'use client'
import Hero from '@/app/components/hero/hero';
import { useGetTeamBySlug } from '@/app/hooks/useGetTeamBySlug';
import { Team } from '@/app/types/models';
import { Box } from '@mui/material';
import { useParams } from 'next/navigation';

export default function TeamHome() {
  const params = useParams<{ team: string; }>()

  const teamSlug = params.team

  const { team, loading } = useGetTeamBySlug(teamSlug)

  if (loading) {
    return <></>
  }

  return (
    <>
      {team && <Hero imageUrl="hero.jpg" team={team as Team} />}
    </>
  );
}
