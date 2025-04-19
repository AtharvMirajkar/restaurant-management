import { User } from './data/users';

export const rolePermissions = {
  owner: ['dashboard', 'orders', 'menu', 'staff', 'settings'],
  manager: ['dashboard', 'orders', 'menu', 'staff'],
  chef: ['dashboard', 'orders', 'menu'],
  waiter: ['dashboard', 'orders'],
} as const;

export type UserRole = keyof typeof rolePermissions;

export const hasPermission = (user: User | null, route: string): boolean => {
  if (!user) return false;
  
  const allowedRoutes = rolePermissions[user.role as UserRole];
  return allowedRoutes.some(permission => route.startsWith(`/dashboard/${permission}`));
};

export const getDashboardRedirect = (role: UserRole): string => {
  switch (role) {
    case 'waiter':
      return '/dashboard/orders';
    case 'chef':
      return '/dashboard/orders';
    default:
      return '/dashboard';
  }
};