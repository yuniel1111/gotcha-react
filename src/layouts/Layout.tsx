import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Layout/Header';
import BottomNav from '../components/Layout/BottomNav';

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <BottomNav />
    </>
  );
}

export default Layout;
