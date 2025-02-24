import { supabase } from '../api/supabase/supabaseClient';
import { useUserStore } from '../stores/useUserStore';

function Note() {
  const { setUserProfile, setUserLogin } = useUserStore(
    (state) => state.actions,
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserProfile(null);
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
