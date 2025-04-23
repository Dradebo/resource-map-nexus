export interface Resource {
  id: string;
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  type: string;
  website?: string;
  phone?: string;
  email?: string;
  services: string[];
  created_at: string;
  updated_at: string;
}

export interface Partner {
  id: string;
  name: string;
  description: string;
  website?: string;
  email?: string;
  phone?: string;
  address: string;
  location: string;
  resource_type: string[];
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
} 