import { Outlet } from 'react-router-dom';
import Header from '../components/Layout/Header';
import BottomNav from '../components/Layout/BottomNav';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Layout() {
  const [isActive, setIsActive] = useState<boolean[]>(() => {
    const savedNavActiveState = localStorage.getItem('navActiveState');
    return savedNavActiveState
      ? JSON.parse(savedNavActiveState)
      : [true, false, false, false, false];
  });

  const navigate = useNavigate();

  const setActiveMenu = (url: string) => {
    const clickedIdxList = {
      '/': 0,
      '/bookmark': 1,
      '/note': 2,
      '/resume': 3,
      '/sign-in': 4,
    };

    const clickedIdx = clickedIdxList[url as keyof typeof clickedIdxList];

    const newActive = isActive.map((_, idx) =>
      idx === clickedIdx ? true : false,
    );

    setIsActive(newActive);
    localStorage.setItem('navActiveState', JSON.stringify(newActive));
  };

  const handleNavMenuClick = (url: string) => {
    navigate(url);
    setActiveMenu(url);
  };

  return (
    <>
      <Header
        isActive={isActive}
        handleNavMenuClick={handleNavMenuClick}
        setActiveMenu={setActiveMenu}
      />
      <Outlet />
      <BottomNav isActive={isActive} handleNavMenuClick={handleNavMenuClick} />
    </>
  );
}

export default Layout;
