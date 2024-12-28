import { Outlet } from 'react-router-dom';
import Header from '../components/Layout/Header';
import BottomNav from '../components/Layout/BottomNav';
import { useState } from 'react';

function Layout() {
  // Filter 내용이 하나라도 존재하는지 유무 확인 (임시로 정한 초기값인 true 위치에 DB에서 filter가 존재하는지 확인하는 로직 필요)
  const [isFilterExists, setIsFilterExists] = useState(true);

  return (
    <>
      <Header isFilterExists={isFilterExists} />
      <div className={`${isFilterExists ? 'mt-[120px]' : 'mt-[60px]'}`}>
        <Outlet />
      </div>
      <BottomNav />
    </>
  );
}

export default Layout;
