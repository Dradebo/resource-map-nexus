import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export interface Resource {
  id: string
  name: string
  type: string
  services: string[]
  address: string
  created_at: string
}

export interface Service {
  id: string
  name: string
  description: string
  resource_id: string
  created_at: string
}

export const getResources = async (): Promise<Resource[]> => {
  const { data, error } = await supabase
    .from('resources')
    .select(`
      *,
      services (
        name
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data.map(resource => ({
    ...resource,
    services: resource.services.map(service => service.name)
  }))
}

export const getServices = async (): Promise<Service[]> => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data
}