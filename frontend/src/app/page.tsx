'use client';

import { useAuth } from '@/core/stores/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loading from '@/components/ui/Loading';

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Loading size="lg" text="Carregando aplicação..." />
      </div>
    );
  }

  return null;
}
