
'use client'

import { useEffect, useState } from 'react';
import { ApiRequests } from '@/app/data/api-requests';
import { Team } from '@/app/types/models';
import { useRouter } from 'next/navigation';

export function useCanControlTeam(teamSlug: string | null | undefined) {
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState<Team | null>(null);

  const router = useRouter()

  useEffect(() => {
    if (!teamSlug) {
      return;
    }

    const fetchData = async () => {
      try {
        const { data } = await ApiRequests.meTeam(teamSlug)
        setTeam(data.team);

        if (!data.team) {
            router.push('/')
        }
      } catch {
        setTeam(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teamSlug]);

  return { team, loading };
}
