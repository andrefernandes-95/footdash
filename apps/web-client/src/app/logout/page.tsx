'use client';

import { useEffect } from 'react';
import { ApiRequests } from '@/app/data/api-requests';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        await ApiRequests.logout();
      } catch (err) {
        console.error('Logout failed', err);
      } finally {
        router.push('/'); // redirect after logout
      }
    };

    logout();
  }, [router]);
  
  return (
    <></>
  );
}
