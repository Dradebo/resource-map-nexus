
import { createClient } from '@supabase/supabase-js';

// These environment variables will need to be set in your Supabase project
// For development, you'll use the local instance values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type Resource = {
  id: string;
  name: string;
  type: 'Center' | 'Expert';
  services: string[];
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  email?: string;
  website?: string;
  description?: string;
  image_url?: string;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  category: string;
};

// Resource API functions
export const getResources = async () => {
  const { data, error } = await supabase
    .from('resources')
    .select('*');
  
  if (error) {
    console.error('Error fetching resources:', error);
    return [];
  }
  
  return data as Resource[];
};

export const getResourceById = async (id: string) => {
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching resource with id ${id}:`, error);
    return null;
  }
  
  return data as Resource;
};

export const getResourcesByType = async (type: 'Center' | 'Expert') => {
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .eq('type', type);
  
  if (error) {
    console.error(`Error fetching resources of type ${type}:`, error);
    return [];
  }
  
  return data as Resource[];
};

export const getResourcesByService = async (serviceId: string) => {
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .contains('services', [serviceId]);
  
  if (error) {
    console.error(`Error fetching resources with service ${serviceId}:`, error);
    return [];
  }
  
  return data as Resource[];
};

// Services API functions
export const getServices = async () => {
  const { data, error } = await supabase
    .from('services')
    .select('*');
  
  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }
  
  return data as Service[];
};

export const getServicesByCategory = async (category: string) => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('category', category);
  
  if (error) {
    console.error(`Error fetching services in category ${category}:`, error);
    return [];
  }
  
  return data as Service[];
};
