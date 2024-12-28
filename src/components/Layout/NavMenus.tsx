import {
  BiHome,
  BiBookmark,
  BiEditAlt,
  BiFileBlank,
  BiUser,
} from 'react-icons/bi';
import { NavType } from '../../types/navType';

function NavMenus({ isActive, handleNavMenuClick }: NavType) {
  return (
    <ul className='flex gap-1 h-[60px] justify-between items-center sm:justify-normal'>
      <li
        className={`w-[60px] h-full cursor-pointer flex flex-col justify-center items-center ${isActive[0] ? 'text-brand-sub' : 'text-brand-black'}`}
        onClick={() => handleNavMenuClick('/', 0)}
      >
        <BiHome
          className={`w-[20px] h-[20px] ${isActive[0] ? 'text-brand-sub' : 'text-brand-black'}`}
        />
        <span className='text-[10px]'>Home</span>
      </li>
      <li
        className={`w-[60px] h-full cursor-pointer flex flex-col justify-center items-center ${isActive[1] ? 'text-brand-sub' : 'text-brand-black'}`}
        onClick={() => handleNavMenuClick('/bookmark', 1)}
      >
        <BiBookmark
          className={`w-[20px] h-[20px] ${isActive[1] ? 'text-brand-sub' : 'text-brand-black'}`}
        />
        <span className='text-[10px]'>Bookmark</span>
      </li>
      <li
        className={`w-[60px] h-full cursor-pointer flex flex-col justify-center items-center ${isActive[2] ? 'text-brand-sub' : 'text-brand-black'}`}
        onClick={() => handleNavMenuClick('/note', 2)}
      >
        <BiEditAlt
          className={`w-[20px] h-[20px] ${isActive[2] ? 'text-brand-sub' : 'text-brand-black'}`}
        />
        <span className='text-[10px]'>Memo</span>
      </li>
      <li
        className={`w-[60px] h-full cursor-pointer flex flex-col justify-center items-center ${isActive[3] ? 'text-brand-sub' : 'text-brand-black'}`}
        onClick={() => handleNavMenuClick('/resume', 3)}
      >
        <BiFileBlank
          className={`w-[20px] h-[20px] ${isActive[3] ? 'text-brand-sub' : 'text-brand-black'}`}
        />
        <span className='text-[10px]'>Resume</span>
      </li>
      {
        // 유저가 로그인 상태면 마이페이지("/my-page")로 이동하고, 로그아웃 상태면 로그인("/sign-in") 페이지로 이동
      }
      <li
        className={`w-[60px] h-full cursor-pointer flex flex-col justify-center items-center ${isActive[4] ? 'text-brand-sub' : 'text-brand-black'}`}
        onClick={() => handleNavMenuClick('/sign-in', 4)}
      >
        <BiUser
          className={`w-[20px] h-[20px] ${isActive[4] ? 'text-brand-sub' : 'text-brand-black'}`}
        />
        <span className='text-[10px]'>My Page</span>
      </li>
    </ul>
  );
}

export default NavMenus;
