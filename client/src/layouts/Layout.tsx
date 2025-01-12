import { Outlet } from 'react-router-dom';
import Header from '../components/Layout/Header';
import BottomNav from '../components/Layout/BottomNav';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { supabase } from '../api/supabase/supabaseClient';
import { useUserStore } from '../stores/useUserStore';

function Layout() {
  const location = useLocation();
  // Filter 내용이 하나라도 존재하는지 유무 확인 (임시로 정한 초기값인 true 위치에 DB에서 filter가 존재하는지 확인하는 로직 필요)
  const isFilterExists = true;
  const isFilterOpen =
    location.pathname === '/' || location.pathname === '/bookmark';
  const { setUserLogin, setUserSession } = useUserStore(
    (state) => state.actions,
  );

  useEffect(() => {
    // 로그인한 유저의 Session 값 세팅
    const saveSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data?.session) {
        setUserLogin(true);
        setUserSession(data.session);
      }
    };

    saveSession();
  }, [setUserLogin, setUserSession]);

  return (
    <>
      <Header isFilterExists={isFilterExists} isFilterOpen={isFilterOpen} />
      <div
        className={`${isFilterExists && isFilterOpen ? 'mt-[120px]' : 'mt-[60px]'}`}
      >
        <Outlet />
      </div>
      <BottomNav />
    </>
  );
}

export default Layout;
