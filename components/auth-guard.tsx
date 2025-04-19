'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { hasPermission } from '@/lib/auth';

const publicRoutes = ['/', '/about', '/contact', '/auth/register'];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Allow access to public routes without authentication
    if (publicRoutes.includes(pathname)) {
      return;
    }

    // Allow access to login page without authentication
    if (pathname === '/auth/login') {
      return;
    }

    // Require authentication for dashboard routes
    if (pathname.startsWith('/dashboard/')) {
      if (!isAuthenticated) {
        router.push('/auth/login');
        return;
      }

      if (!hasPermission(user, pathname)) {
        router.push('/dashboard');
        return;
      }
    }

    // Redirect to dashboard if trying to access login while authenticated
    if (isAuthenticated && pathname === '/auth/login') {
      router.push('/dashboard');
      return;
    }
  }, [isAuthenticated, pathname, router, user]);

  return <>{children}</>;
}