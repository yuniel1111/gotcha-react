import {
  BiHome,
  BiBookmark,
  BiEditAlt,
  BiFileBlank,
  BiUser,
  BiSolidHome,
  BiSolidBookmark,
  BiSolidEditAlt,
  BiSolidFileBlank,
  BiSolidUser,
} from 'react-icons/bi';
import { NavType } from '../../types/navType';

function NavMenus({ isActive, handleNavMenuClick }: NavType) {
  return (
    <ul className='flex h-[60px] items-center justify-between gap-1 font-bold sm:justify-normal'>
      <li
        className={`flex h-full w-[60px] cursor-pointer flex-col items-center justify-center ${isActive[0] ? 'text-brand-sub' : 'text-brand-black'}`}
        onClick={() => handleNavMenuClick('/')}
      >
        {isActive[0] ? (
          <BiSolidHome
            className={`h-[20px] w-[20px] ${isActive[0] ? 'text-brand-main' : 'text-brand-black'}`}
          />
        ) : (
          <BiHome
            className={`h-[20px] w-[20px] ${isActive[0] ? 'text-brand-main' : 'text-brand-black'}`}
          />
        )}
        <span
          className={`text-[10px] ${isActive[0] ? 'text-brand-main' : 'text-brand-black'}`}
        >
          Home
        </span>
      </li>
      <li
        className={`flex h-full w-[60px] cursor-pointer flex-col items-center justify-center ${isActive[1] ? 'text-brand-sub' : 'text-brand-black'}`}
        onClick={() => handleNavMenuClick('/bookmark')}
      >
        {isActive[1] ? (
          <BiSolidBookmark
            className={`h-[20px] w-[20px] ${isActive[1] ? 'text-brand-main' : 'text-brand-black'}`}
          />
        ) : (
          <BiBookmark
            className={`h-[20px] w-[20px] ${isActive[1] ? 'text-brand-main' : 'text-brand-black'}`}
          />
        )}
        <span
          className={`text-[10px] ${isActive[1] ? 'text-brand-main' : 'text-brand-black'}`}
        >
          Bookmark
        </span>
      </li>
      <li
        className={`flex h-full w-[60px] cursor-pointer flex-col items-center justify-center ${isActive[2] ? 'text-brand-sub' : 'text-brand-black'}`}
        onClick={() => handleNavMenuClick('/note')}
      >
        {isActive[2] ? (
          <BiSolidEditAlt
            className={`h-[20px] w-[20px] ${isActive[2] ? 'text-brand-main' : 'text-brand-black'}`}
          />
        ) : (
          <BiEditAlt
            className={`h-[20px] w-[20px] ${isActive[2] ? 'text-brand-main' : 'text-brand-black'}`}
          />
        )}
        <span
          className={`text-[10px] ${isActive[2] ? 'text-brand-main' : 'text-brand-black'}`}
        >
          Memo
        </span>
      </li>
      <li
        className={`flex h-full w-[60px] cursor-pointer flex-col items-center justify-center ${isActive[3] ? 'text-brand-sub' : 'text-brand-black'}`}
        onClick={() => handleNavMenuClick('/resume')}
      >
        {isActive[3] ? (
          <BiSolidFileBlank
            className={`h-[20px] w-[20px] ${isActive[3] ? 'text-brand-main' : 'text-brand-black'}`}
          />
        ) : (
          <BiFileBlank
            className={`h-[20px] w-[20px] ${isActive[3] ? 'text-brand-main' : 'text-brand-black'}`}
          />
        )}
        <span
          className={`text-[10px] ${isActive[3] ? 'text-brand-main' : 'text-brand-black'}`}
        >
          Resume
        </span>
      </li>
      {
        // 유저가 로그인 상태면 마이페이지("/my-page")로 이동하고, 로그아웃 상태면 로그인("/sign-in") 페이지로 이동
      }
      <li
        className={`flex h-full w-[60px] cursor-pointer flex-col items-center justify-center ${isActive[4] ? 'text-brand-sub' : 'text-brand-black'}`}
        onClick={() => handleNavMenuClick('/sign-in')}
      >
        {isActive[4] ? (
          <BiSolidUser
            className={`h-[20px] w-[20px] ${isActive[4] ? 'text-brand-main' : 'text-brand-black'}`}
          />
        ) : (
          <BiUser
            className={`h-[20px] w-[20px] ${isActive[4] ? 'text-brand-main' : 'text-brand-black'}`}
          />
        )}
        <span
          className={`text-[10px] ${isActive[4] ? 'text-brand-main' : 'text-brand-black'}`}
        >
          My Page
        </span>
      </li>
    </ul>
  );
}

export default NavMenus;
