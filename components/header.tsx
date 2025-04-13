'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChefHat, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="container flex items-center justify-between py-4 px-6 mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <ChefHat className="h-8 w-8" />
          <span className="font-bold text-xl">RestaurantOS</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <ThemeToggle />
          <Link href="/auth/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/auth/register">
            <Button>Register Restaurant</Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center space-x-4 md:hidden">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/auth/login"
                  className="text-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="text-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Register Restaurant
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}