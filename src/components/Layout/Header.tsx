import logoImage from '../../assets/gotcha_logo.png';
import { BiChevronLeft, BiSliderAlt } from 'react-icons/bi';
import NavMenus from './MenuList';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigateStore } from '../../stores/useNavigateStore';

function Header({ isFilterExists }: { isFilterExists: boolean }) {
  const { setActiveMenu, handleNavMenuClick } = useNavigateStore(
    (state) => state.actions,
  );

  const location = useLocation();
  const navigate = useNavigate();

  const isFilterOpen =
    location.pathname === '/' || location.pathname === '/bookmark';
  const isGoBackOpen = location.pathname !== '/';

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location.pathname]);

  return (
    <header className='fixed top-0 z-50 flex h-[60px] w-full items-center justify-end border-b border-b-brand-gray-1 sm:justify-between'>
      <div
        className='absolute left-1/2 top-1/2 z-40 ml-4 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer sm:static sm:-translate-x-0 sm:-translate-y-0 sm:transform-none'
        onClick={() => handleNavMenuClick('/', navigate)}
      >
        <img src={logoImage} alt='GOTCHA' className='w-25 h-4' />
      </div>

      <div className='relative flex h-[60px] w-full sm:w-auto'>
        {isGoBackOpen && (
          <div
            className='flex h-[60px] w-[60px] cursor-pointer items-center justify-center sm:hidden'
            onClick={() => navigate(-1)}
          >
            <BiChevronLeft className='h-[32px] w-[32px]' />
          </div>
        )}

        <nav className='hidden items-center sm:flex'>
          <NavMenus />
        </nav>

        {
          // Filter 아이콘 부분
        }
        {isFilterOpen && (
          <div
            className={`absolute right-0 flex h-[60px] w-[60px] cursor-pointer flex-col items-center justify-center sm:static ${isFilterExists ? 'bg-brand-black' : 'bg-brand-white'} ${isFilterExists ? 'text-brand-white' : 'text-brand-black'}`}
          >
            <BiSliderAlt className='h-[20px] w-[20px]' />
            <span className='text-[10px]'>Filter</span>
          </div>
        )}
      </div>
      {
        // Filter 슬라이드 부분
      }
      {isFilterOpen && isFilterExists && (
        <div className='absolute left-0 top-full h-[60px] w-full bg-brand-black'></div>
      )}
    </header>
  );
}

export default Header;
