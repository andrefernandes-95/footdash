
'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';

export function useAuth(redirectIfLoggedIn = false) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<unknown>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/auth/me', { withCredentials: true });
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
