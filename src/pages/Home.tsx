import { useEffect } from 'react';
import '../css/tailwind.css';
import { supabase } from '../api/supabase/supabaseClient';

function Home() {
  const checkSupabaseSession = async () => {
    const { data } = await supabase.auth.getSession();
  };

  useEffect(() => {
    checkSupabaseSession();
  }, []);

  return <main>Home</main>;
}

export default Home;
