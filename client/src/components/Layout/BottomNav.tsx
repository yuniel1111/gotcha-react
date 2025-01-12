import NavMenus from './MenuList';

function BottomNav() {
  return (
    <nav className='shadow-brand-main-shadow fixed bottom-0 w-full sm:hidden'>
      <NavMenus />
    </nav>
  );
}

export default BottomNav;
