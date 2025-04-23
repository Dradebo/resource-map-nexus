import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Resource } from '@/types';

export function useResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchResources() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('resources')
          .select('*');

        if (error) {
          throw error;
        }

        setResources(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch resources'));
      } finally {
        setLoading(false);
      }
    }

    fetchResources();
  }, []);

  return { resources, loading, error };
} 