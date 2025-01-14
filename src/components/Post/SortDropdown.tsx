import { useId, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { SortLabelListType } from '../../pages/Home';

interface SortDropdownMenuProps {
  sortLabel: string;
  setSortLabel: React.Dispatch<React.SetStateAction<string>>;
  sortLabelList: SortLabelListType;
}

export default function SortDropdownMenu({
  sortLabel,
  setSortLabel,
  sortLabelList,
}: SortDropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const uuid = useId();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSort = (val: string) => {
    setIsOpen(false);
    setSortLabel(val);
  };

  return (
    <div className='relative'>
      <button
        onClick={toggleMenu}
        className='flex h-10 w-20 items-center justify-center gap-2 rounded-md border border-brand-gray-1 text-sm text-brand-gray-4'
      >
        <p>{sortLabel}</p>
        <IoIosArrowDown />
      </button>

      {isOpen && (
        <ul className='absolute right-0 z-10 mt-1 w-20 overflow-hidden rounded-md bg-white text-sm text-brand-gray-4 ring-1 ring-black ring-opacity-5'>
          {Object.keys(sortLabelList).map((val, idx) => (
            <li
              key={`${uuid}-${idx}`}
              className='z-20 cursor-pointer py-2.5 text-center hover:bg-gray-100'
              onClick={() => handleSort(val)}
            >
              {val}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
