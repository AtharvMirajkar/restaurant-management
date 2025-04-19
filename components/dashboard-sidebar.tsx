'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import {
  LayoutDashboard,
  Users,
  UtensilsCrossed,
  ClipboardList,
  Settings,
  LogOut,
  ChefHat,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { rolePermissions, UserRole } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout } from '@/lib/features/authSlice';

const baseNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Orders', href: '/dashboard/orders', icon: ClipboardList },
  { name: 'Menu', href: '/dashboard/menu', icon: UtensilsCrossed },
  { name: 'Staff', href: '/dashboard/staff', icon: Users },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

interface DashboardSidebarProps {
  open: boolean;
}

export function DashboardSidebar({ open }: DashboardSidebarProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/auth/login');
  };

  const navigation = baseNavigation.filter(item => {
    const route = item.href.split('/')[2] || 'dashboard';
    return rolePermissions[user?.role as UserRole]?.includes(route);
  });

  return (
    <div
      className={cn(
        'fixed left-0 top-0 h-screen bg-card border-r transition-all duration-300',
        open ? 'w-64' : 'w-20'
      )}
    >
      <div className="p-6">
        <Link
          href="/dashboard"
          className={cn(
            'flex items-center space-x-2',
            !open && 'justify-center'
          )}
        >
          <ChefHat className="h-6 w-6" />
          {open && <span className="font-bold text-lg">RestaurantOS</span>}
        </Link>
      </div>

      <nav className="space-y-1 px-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors',
              !open && 'justify-center px-2'
            )}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {open && <span className="ml-3">{item.name}</span>}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-4 w-full px-2">
        <button
          onClick={handleLogout}
          className={cn(
            'flex items-center w-full px-4 py-3 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-destructive',
            !open && 'justify-center px-2'
          )}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {open && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
}