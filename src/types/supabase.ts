export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      resources: {
        Row: {
          id: string
          name: string
          type: string
          address: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          type: string
          address: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string
          address?: string
          created_at?: string
        }
      }
      services: {
        Row: {
          id: string
          name: string
          description: string
          resource_id: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          resource_id: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          resource_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}