import { create } from 'zustand';
import { User, Worker, Contact, Admin } from './types';

interface AppState {
  currentUser: User | null;
  workers: Worker[];
  users: User[];
  contacts: Contact[];
  admins: Admin[];

  setCurrentUser: (user: User | null) => void;
  addWorker: (worker: Worker) => void;
  updateWorker: (worker: Worker) => void;
  addUser: (user: User) => void;
  addContact: (contact: Contact) => void;
  isEmailRegistered: (email: string) => boolean;

  removeFromCart: (workerId: string, timeSlotId: string) => void;
  clearCart: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  currentUser: null,
  users: [
    {
      id: 'admin-1',
      email: 'admin@gmail.com',
      password: '1234',
      type: 'admin',
      name: 'Admin User',
      phone: '',
    },
  ],
  contacts: [],
  admins: [],
  workers: [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      skills: ['Plumbing', 'Electrical'],
      hourlyRate: 45,
      experience: 8,
      location: 'Toronto, ON',
      availability: 'Weekdays ',
      availabilityNumber: 40,
      rating: 4.8,
      completedJobs: 156,
      description: 'Licensed plumber with electrical certification',
      certifications: ['Red Seal Plumber', 'Electrical Safety Certificate'],
      photo: null,
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1 (555) 234-5678',
      skills: ['Carpentry', 'Furniture Making'],
      hourlyRate: 55,
      experience: 12,
      location: 'Vancouver, BC',
      availability: 'Flexible ',
      availabilityNumber: 55,
      rating: 4.9,
      completedJobs: 243,
      description: 'Master carpenter specializing in custom furniture',
      certifications: ['Red Seal Carpenter', 'Fine Woodworking Certificate'],
      photo: null,
    },
    {
      id: '3',
      name: 'Michael Chen',
      email: 'michael@example.com',
      phone: '+1 (555) 345-6789',
      skills: ['HVAC', 'Refrigeration'],
      hourlyRate: 50,
      experience: 10,
      location: 'Calgary, AB',
      availability: 'Mon-Sat',
      availabilityNumber: 40,
      rating: 4.7,
      completedJobs: 189,
      description: 'HVAC specialist with refrigeration expertise',
      certifications: ['HVAC License', 'Refrigeration Technician Certificate'],
      photo: null,
    },
  ],
  setCurrentUser: (user) => set({ currentUser: user }),
  addWorker: (worker) => set((state) => ({ workers: [...state.workers, worker] })),
  updateWorker: (worker) => set((state) => ({
    workers: state.workers.map((w) => (w.id === worker.id ? worker : w)),
  })),
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  addContact: (contact) => set((state) => ({ contacts: [...state.contacts, contact] })),
  isEmailRegistered: (email) => {
    const state = get();
    return state.users.some((user) => user.email === email);
  },
  
  // Implementing removeFromCart and clearCart to resolve the error
  removeFromCart: (workerId, timeSlotId) => {
    // Define your logic here to remove a worker/time slot from the cart if needed
  },
  clearCart: () => {
    // Define your logic here to clear the cart if needed
  },
}));
