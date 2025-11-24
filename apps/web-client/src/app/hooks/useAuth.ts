
'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { ApiRequests } from '@/app/data/api-requests';
import { User } from '@/app/types/models';

export function useAuth(redirectIfLoggedIn = false) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await ApiRequests.me()
        setUser(data.user);

        if (redirectIfLoggedIn && data.user) {
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [redirectIfLoggedIn]);

  return { user, loading };
}
