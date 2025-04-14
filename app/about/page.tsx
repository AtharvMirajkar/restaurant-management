'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/header';
import { Award, Clock, Users, Utensils } from 'lucide-react';

const features = [
  {
    name: 'Efficient Management',
    description: 'Streamline your restaurant operations with our comprehensive management tools.',
    icon: Utensils,
  },
  {
    name: '24/7 Support',
    description: 'Round-the-clock customer support to help you whenever you need assistance.',
    icon: Clock,
  },
  {
    name: 'Team Collaboration',
    description: 'Enhanced communication between kitchen staff, waiters, and management.',
    icon: Users,
  },
  {
    name: 'Quality Service',
    description: 'Improve customer satisfaction with efficient order management.',
    icon: Award,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container pt-28 pb-16 px-8 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto px-4"
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">About RestaurantOS</h1>
            <p className="text-xl text-muted-foreground">
              Transforming restaurant management with innovative solutions
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
            <p>
              RestaurantOS is a comprehensive restaurant management system designed to streamline
              operations and enhance efficiency in modern restaurants. Our platform brings together
              all aspects of restaurant management into one intuitive system.
            </p>
            <p>
              Whether you're a small café or a large restaurant chain, our solution adapts to
              your needs, providing the tools necessary to manage orders, staff, and inventory
              effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center p-6 rounded-lg border bg-card"
              >
                <feature.icon className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}