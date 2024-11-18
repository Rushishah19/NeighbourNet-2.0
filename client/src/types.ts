export interface Worker {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  hourlyRate: number;
  experience: number;
  location: string;
  availability: string;
  availabilityNumber: number;
  rating: number;
  completedJobs: number;
  description: string;
  certifications: string[];
  photo?: String | null,
}

export interface User {
  id: string;
  email: string;
  password?: string;
  type: 'worker' | 'customer' | 'admin';
  name: string;
  phone: string;
}

export interface Contact {
  workerId: string;
  customerId: string;
  timestamp: number;
}

export interface Admin {
  adminId: string;
}