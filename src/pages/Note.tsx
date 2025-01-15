import { supabase } from '../api/supabase/supabaseClient';
import { useUserStore } from '../stores/useUserStore';

function Note() {
  const { setUserSession, setUserLogin } = useUserStore(
    (state) => state.actions,
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserSession(null);
    setUserLogin(false);
  };
  return (
    <div>
      <button type='button' onClick={handleLogout}>
        로그아웃 임시 버튼
      </button>
    </div>
  );
}

export default Note;
