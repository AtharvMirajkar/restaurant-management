'use client';

import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Coffee, UtensilsCrossed, ChefHat } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24">
        <section className="container py-24 space-y-8 px-8 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl font-bold sm:text-6xl">
              Streamline Your Restaurant Operations
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              A comprehensive management system designed for modern restaurants.
              From order management to staff coordination, we've got you covered.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-lg border bg-card text-card-foreground"
            >
              <Coffee className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Order Management</h3>
              <p className="text-muted-foreground">
                Streamline your order process with real-time updates between
                waiters and kitchen staff.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-6 rounded-lg border bg-card text-card-foreground"
            >
              <UtensilsCrossed className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Menu Management</h3>
              <p className="text-muted-foreground">
                Easily update your menu items, prices, and availability in
                real-time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="p-6 rounded-lg border bg-card text-card-foreground"
            >
              <ChefHat className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Staff Management</h3>
              <p className="text-muted-foreground">
                Manage your staff roles and permissions with our intuitive
                interface.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}