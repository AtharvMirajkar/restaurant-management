'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Header } from '@/components/header';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/lib/features/authSlice';
import { findUserByEmail } from '@/lib/data/users';
import { getDashboardRedirect } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = findUserByEmail(formData.email);
    
    if (user && user.password === formData.password) {
      dispatch(setCredentials({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          restaurantId: user.restaurantId,
        },
        token: 'dummy-jwt-token',
      }));

      toast({
        title: 'Login successful',
        description: `Welcome back, ${user.name}!`,
      });

      router.push(getDashboardRedirect(user.role));
    } else {
      toast({
        title: 'Login failed',
        description: 'Invalid email or password',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container pt-24 pb-16 px-8 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <Card>
            <CardHeader>
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>
                Login to your restaurant management account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        href="/auth/forgot-password"
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <Link
                      href="/auth/register"
                      className="text-primary hover:underline"
                    >
                      Register here
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold text-center">Demo Accounts</h3>
            <div className="grid gap-2 text-sm text-muted-foreground">
              <p>Owner: owner@restaurant.com / owner123</p>
              <p>Manager: manager@restaurant.com / manager123</p>
              <p>Chef: chef@restaurant.com / chef123</p>
              <p>Waiter: waiter@restaurant.com / waiter123</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}