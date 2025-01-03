import { useEffect } from 'react';
import '../css/tailwind.css';
import { supabase } from '../api/supabase/supabaseClient';
import { useUserStore } from '../stores/useUserStore';

function Home() {
  const { setUserLogin, setUserSession } = useUserStore(
    (state) => state.actions,
  );
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  useEffect(() => {
    const handleUserLogin = async () => {
      const { data } = await supabase.auth.getSession();

      if (data?.session && !isLoggedIn) {
        setUserLogin(true);
        setUserSession(data.session);
      }
    };

    handleUserLogin();
  });

  return <main>Home</main>;
}

export default Home;
