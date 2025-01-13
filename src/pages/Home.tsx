import { supabase } from '../api/supabase/supabaseClient';
import '../css/tailwind.css';
import { useUserStore } from '../stores/useUserStore';

export interface SortLabelListType {
  [key: string]: [string, boolean];
}

function Home() {
  const { setUserSession, setUserLogin } = useUserStore(
    (state) => state.actions,
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserSession(null);
    setUserLogin(false);
  };

  return (
    <main>
      <button type='button' onClick={handleLogout}>
        로그아웃
      </button>
    </main>
  );
}

export default Home;
