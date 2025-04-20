'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ChevronLeft, ChevronRight, Search, Plus } from 'lucide-react';
import { format, subDays, isWithinInterval, startOfDay, endOfDay, parseISO } from 'date-fns';
import Link from 'next/link';

// Sample data
const initialOrders = [
  {
    id: '1',
    tableNumber: '12',
    items: [
      { name: 'Classic Burger', quantity: 2, price: 12.99 },
      { name: 'Caesar Salad', quantity: 1, price: 8.99 },
    ],
    total: 34.97,
    status: 'Completed',
    waiter: 'Emily Brown',
    timestamp: '2024-03-10T14:30:00Z',
  },
  {
    id: '2',
    tableNumber: '5',
    items: [
      { name: 'Margherita Pizza', quantity: 1, price: 14.99 },
      { name: 'Chocolate Cake', quantity: 2, price: 6.99 },
    ],
    total: 28.97,
    status: 'In Progress',
    waiter: 'Emily Brown',
    timestamp: '2024-03-11T15:45:00Z',
  },
  {
    id: '3',
    tableNumber: '8',
    items: [
      { name: 'Pasta Carbonara', quantity: 3, price: 16.99 },
      { name: 'Garlic Bread', quantity: 1, price: 4.99 },
    ],
    total: 55.96,
    status: 'Pending',
    waiter: 'Emily Brown',
    timestamp: '2024-03-11T18:20:00Z',
  },
];

const dateFilters = [
  { label: 'All Orders', value: 'all' },
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 7 Days', value: 'week' },
];

const statusFilters = [
  { label: 'All Status', value: 'all' },
  { label: 'Pending', value: 'Pending' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Completed', value: 'Completed' },
];

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  tableNumber: string;
  items: OrderItem[];
  total: number;
  status: string;
  waiter: string;
  timestamp: string;
}

export default function OrdersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [orders] = useState<Order[]>(initialOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const { user } = useSelector((state: RootState) => state.auth);

  const filterOrdersByDate = (order: Order, filter: string) => {
    const orderDate = parseISO(order.timestamp);
    const today = new Date();
    
    switch (filter) {
      case 'today':
        return isWithinInterval(orderDate, {
          start: startOfDay(today),
          end: endOfDay(today),
        });
      case 'yesterday':
        const yesterday = subDays(today, 1);
        return isWithinInterval(orderDate, {
          start: startOfDay(yesterday),
          end: endOfDay(yesterday),
        });
      case 'week':
        const weekAgo = subDays(today, 7);
        return isWithinInterval(orderDate, {
          start: startOfDay(weekAgo),
          end: endOfDay(today),
        });
      default:
        return true;
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.waiter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesDate = filterOrdersByDate(order, dateFilter);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

    return matchesSearch && matchesDate && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <DashboardSidebar open={sidebarOpen} />
        
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Orders Management</h1>
              <div className="flex items-center space-x-4">
                {user?.role === 'waiter' && (
                  <Link href="/dashboard/orders/new">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      New Order
                    </Button>
                  </Link>
                )}
                {user?.role === 'chef' && (
                  <Link href="/dashboard/orders/kitchen">
                    <Button>Kitchen View</Button>
                  </Link>
                )}
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
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Orders</CardTitle>
                <CardDescription>
                  Manage and track all restaurant orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search orders..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <SelectValue placeholder="Filter by date" />
                    </SelectTrigger>
                    <SelectContent>
                      {dateFilters.map((filter) => (
                        <SelectItem key={filter.value} value={filter.value}>
                          {filter.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusFilters.map((filter) => (
                        <SelectItem key={filter.value} value={filter.value}>
                          {filter.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Table</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Waiter</TableHead>
                        <TableHead>Date & Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">#{order.id}</TableCell>
                          <TableCell>Table {order.tableNumber}</TableCell>
                          <TableCell>
                            <div className="max-w-[300px]">
                              {order.items.map((item, index) => (
                                <div key={index} className="text-sm">
                                  {item.quantity}x {item.name}
                                </div>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>${order.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                order.status === 'Completed'
                                  ? 'bg-green-100 text-green-800'
                                  : order.status === 'In Progress'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {order.status}
                            </span>
                          </TableCell>
                          <TableCell>{order.waiter}</TableCell>
                          <TableCell>
                            {format(parseISO(order.timestamp), 'MMM d, yyyy h:mm a')}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}