import {
  BiHome,
  BiBookmark,
  BiEditAlt,
  BiFileBlank,
  BiUser,
} from 'react-icons/bi';
import { NavType } from '../../types/navType';

function BottomNav({ isActive, handleNavMenuClick }: NavType) {
  return (
    <nav className='shadow fixed bottom-0 w-full md:hidden'>
      <ul className='flex justify-between gap-1'>
        <li
          className={`cursor-pointer px-2 py-3 flex flex-col items-center ${isActive[0] ? 'text-brand-sub' : 'text-brand-black'}`}
          onClick={() => handleNavMenuClick('/', 0)}
        >
          <BiHome className='w-[20px] h-[20px]' />
          <span className='text-[10px]'>Home</span>
        </li>
        <li
          className={`cursor-pointer px-2 py-3 flex flex-col items-center ${isActive[1] ? 'text-brand-sub' : 'text-brand-black'}`}
          onClick={() => handleNavMenuClick('/bookmark', 1)}
        >
          <BiBookmark className='w-[20px] h-[20px]' />
          <span className='text-[10px]'>Bookmark</span>
        </li>
        <li
          className={`cursor-pointer px-2 py-3 flex flex-col items-center ${isActive[2] ? 'text-brand-sub' : 'text-brand-black'}`}
          onClick={() => handleNavMenuClick('/note', 2)}
        >
          <BiEditAlt className='w-[20px] h-[20px]' />
          <span className='text-[10px]'>Memo</span>
        </li>
        <li
          className={`cursor-pointer px-2 py-3 flex flex-col items-center ${isActive[3] ? 'text-brand-sub' : 'text-brand-black'}`}
          onClick={() => handleNavMenuClick('/resume', 3)}
        >
          <BiFileBlank className='w-[20px] h-[20px]' />
          <span className='text-[10px]'>Resume</span>
        </li>
        {
          // 유저가 로그인 상태면 마이페이지("/my-page")로 이동하고, 로그아웃 상태면 로그인("/sign-in") 페이지로 이동
        }
        <li
          className={`cursor-pointer px-2 py-3 flex flex-col items-center ${isActive[4] ? 'text-brand-sub' : 'text-brand-black'}`}
          onClick={() => handleNavMenuClick('/sign-in', 4)}
        >
          <BiUser className='w-[20px] h-[20px]' />
          <span className='text-[10px]'>My Page</span>
        </li>
      </ul>
    </nav>
  );
}

export default BottomNav;
