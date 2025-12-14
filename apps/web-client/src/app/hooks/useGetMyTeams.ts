
'use client'

import { useEffect, useState } from 'react';
import { ApiRequests } from '@/app/data/api-requests';
import { Team } from '@/app/types/models';

export function useGetMyTeams() {
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState<Team[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await ApiRequests.myTeams()
        setTeams(data);
      } catch (e) {
                console.error(e)

        setTeams([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { teams, loading };
}
