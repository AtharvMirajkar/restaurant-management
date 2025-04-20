'use client';

import { useState } from 'react';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Clock, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample orders data
const initialOrders = [
  {
    id: '1',
    tableNumber: '12',
    waiter: 'Emily Brown',
    status: 'pending',
    items: [
      { name: 'Classic Burger', quantity: 2, notes: 'Medium well' },
      { name: 'Caesar Salad', quantity: 1, notes: 'No croutons' },
    ],
    timestamp: '2024-03-11T15:45:00Z',
  },
  {
    id: '2',
    tableNumber: '5',
    waiter: 'Emily Brown',
    status: 'in-progress',
    items: [
      { name: 'Margherita Pizza', quantity: 1, notes: 'Extra cheese' },
      { name: 'Garlic Bread', quantity: 2 },
    ],
    timestamp: '2024-03-11T15:50:00Z',
  },
];

export default function KitchenPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [orders, setOrders] = useState(initialOrders);
  const { toast } = useToast();

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );

    toast({
      title: 'Order Updated',
      description: `Order #${orderId} marked as ${newStatus}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <DashboardSidebar open={sidebarOpen} />
        
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Kitchen View</h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? (
                  <ChevronLeft className="h-6 w-6" />
                ) : (
                  <ChevronRight className="h-6 w-6" />
                )}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Table {order.tableNumber}</CardTitle>
                        <CardDescription>{order.waiter}</CardDescription>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-start border-b pb-2">
                            <div>
                              <div className="font-medium">{item.name}</div>
                              {item.notes && (
                                <div className="text-sm text-muted-foreground">
                                  Note: {item.notes}
                                </div>
                              )}
                            </div>
                            <div className="text-lg font-semibold">
                              x{item.quantity}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          {new Date(order.timestamp).toLocaleTimeString()}
                        </div>
                        {order.status === 'pending' && (
                          <Button
                            onClick={() => updateOrderStatus(order.id, 'in-progress')}
                          >
                            Start Preparing
                          </Button>
                        )}
                        {order.status === 'in-progress' && (
                          <Button
                            onClick={() => updateOrderStatus(order.id, 'completed')}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Mark Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}