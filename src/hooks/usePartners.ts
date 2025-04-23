import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Partner } from '@/types';

export function usePartners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPartners() {
      try {
        setLoading(true);
        console.log('Fetching partners...');
        
        const { data, error } = await supabase
          .from('partners')
          .select('*')
          .eq('status', 'approved')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        console.log('Partners data:', data);
        setPartners(data || []);
      } catch (err) {
        console.error('Error in fetchPartners:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch partners'));
      } finally {
        setLoading(false);
      }
    }

    fetchPartners();
  }, []);

  return { partners, loading, error };
} 