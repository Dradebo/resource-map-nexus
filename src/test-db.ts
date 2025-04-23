import { supabase } from '@/lib/supabase';

async function testDatabaseConnection() {
  try {
    console.log('Testing database connection...');
    
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Database error:', error);
      return;
    }

    console.log('Connection successful!');
    console.log('Sample data:', data);
  } catch (err) {
    console.error('Connection error:', err);
  }
}

testDatabaseConnection(); 