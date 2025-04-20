export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // In production, this would be hashed
  role: 'owner' | 'manager' | 'chef' | 'waiter';
  restaurantId: string;
}

export const dummyUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'owner@restaurant.com',
    password: 'owner123',
    role: 'owner',
    restaurantId: 'rest_01',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'manager@restaurant.com',
    password: 'manager123',
    role: 'manager',
    restaurantId: 'rest_01',
  },
  {
    id: '3',
    name: 'Mike Wilson',
    email: 'chef@restaurant.com',
    password: 'chef123',
    role: 'chef',
    restaurantId: 'rest_01',
  },
  {
    id: '4',
    name: 'Emily Brown',
    email: 'waiter@restaurant.com',
    password: 'waiter123',
    role: 'waiter',
    restaurantId: 'rest_01',
  },
];

export const findUserByEmail = (email: string): User | undefined => {
  return dummyUsers.find(user => user.email === email);
};