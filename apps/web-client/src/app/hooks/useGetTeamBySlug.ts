
'use client'

import { useEffect, useState } from 'react';
import { ApiRequests } from '@/app/data/api-requests';
import { Team } from '@/app/types/models';

export function useGetTeamBySlug(slug: string) {
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState<Team | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiRequests.getTeamBySlug(slug)
        setTeam(response.data);
      } catch (e) {
        console.error(e)
        setTeam(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  return { team, loading };
}
