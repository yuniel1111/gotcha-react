import { useState } from "react";

function SortDropdownMenu () {
  const [isOpen, setIsOpen] = useState(false);
  const [sortType, setSortType] = useState('최신순');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSortLatest = () => {
    setIsOpen(false)
    setSortType('최신순')
  }
  const handleSortDeadline = () => {
    setIsOpen(false)
    setSortType('마감순')
  }

  return (
    <div className="relative inline-block text-left">
      {/* 버튼 */}
      <button
        onClick={toggleMenu}
        className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {sortType}
        <svg
          className="ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06-.02L10 10.477l3.71-3.29a.75.75 0 011.04 1.08l-4 3.5a.75.75 0 01-1.04 0l-4-3.5a.75.75 0 01-.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-[7rem] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 text-center">
          <ul className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <li
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              role="menuitem"
              onClick={handleSortLatest}
            >
              최신순
            </li>
            <li
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              role="menuitem"
              onClick={handleSortDeadline}
            >
              마감순
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default SortDropdownMenu