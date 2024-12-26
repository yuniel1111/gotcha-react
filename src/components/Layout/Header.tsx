import logoImage from '../../assets/gotcha_logo.png';
import {
  BiHome,
  BiBookmark,
  BiEditAlt,
  BiFileBlank,
  BiUser,
  BiSliderAlt,
  BiChevronLeft,
} from 'react-icons/bi';
import { NavType } from '../../types/navType';

function Header({ isActive, handleNavMenuClick }: NavType) {
  return (
    <header className='relative h-[60px] border border-b-brand-gray-1 flex items-center px-3 justify-end md:justify-between md:static'>
      <div
        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer 
               md:static md:transform-none md:-translate-x-0 md:-translate-y-0'
        onClick={() => handleNavMenuClick('/', 0)}
      >
        <img src={logoImage} alt='GOTCHA' className='w-25 h-4' />
      </div>
      <nav className='w-full md:w-auto'>
        <ul className='flex gap-1 justify-between md:justify-normal'>
          {
            // 특정 페이지에서만 뒤로가기 표출 (의논 필요)
          }
          <li className='cursor-pointer px-2 py-3 md:hidden'>
            <BiChevronLeft className='w-[20px] h-[20px]' />
          </li>
          <li
            className='cursor-pointer px-2 py-3 hidden md:block'
            onClick={() => handleNavMenuClick('/', 0)}
          >
            <BiHome
              className={`w-[20px] h-[20px] ${isActive[0] ? 'text-brand-sub' : 'text-brand-black'}`}
            />
          </li>
          <li
            className='cursor-pointer px-2 py-3 hidden md:block'
            onClick={() => handleNavMenuClick('/bookmark', 1)}
          >
            <BiBookmark
              className={`w-[20px] h-[20px] ${isActive[1] ? 'text-brand-sub' : 'text-brand-black'}`}
            />
          </li>
          <li
            className='cursor-pointer px-2 py-3 hidden md:block'
            onClick={() => handleNavMenuClick('/note', 2)}
          >
            <BiEditAlt
              className={`w-[20px] h-[20px] ${isActive[2] ? 'text-brand-sub' : 'text-brand-black'}`}
            />
          </li>
          <li
            className='cursor-pointer px-2 py-3 hidden md:block'
            onClick={() => handleNavMenuClick('/resume', 3)}
          >
            <BiFileBlank
              className={`w-[20px] h-[20px] ${isActive[3] ? 'text-brand-sub' : 'text-brand-black'}`}
            />
          </li>
          {
            // 유저가 로그인 상태면 마이페이지("/my-page")로 이동하고, 로그아웃 상태면 로그인("/sign-in") 페이지로 이동
          }
          <li
            className='cursor-pointer px-2 py-3 hidden md:block'
            onClick={() => handleNavMenuClick('/sign-in', 4)}
          >
            <BiUser
              className={`w-[20px] h-[20px] ${isActive[4] ? 'text-brand-sub' : 'text-brand-black'}`}
            />
          </li>
          {
            // 필터는 페이지 이동이 아닌 모달 형태이기 때문에 별도로 관리
          }
          <li className='cursor-pointer px-2 py-3'>
            <BiSliderAlt className='w-[20px] h-[20px]' />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
