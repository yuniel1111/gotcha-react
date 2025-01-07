import { useId, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { usePost } from '../../hooks/usePost';
import { useJobPostStore } from '../../stores/useJobPostSotre';

interface sortLabelListType {
  [key: string]: [string, boolean];
}

function SortDropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [sortLabel, setSortLabel] = useState('최신순');
  const setJobPosts = useJobPostStore((state) => state.setJobPosts);
  const uuid = useId();
  const sortLabelList: sortLabelListType = {
    최신순: ['posting_date', true],
    마감순: ['expiration_date', true],
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSort = (val: string) => {
    setIsOpen(false);
    setSortLabel(val);

    const { data } = usePost<any[]>(
      `post-${val}`,
      sortLabelList[val][0],
      sortLabelList[val][1],
    );

    if (data) {
      setJobPosts(data);
    }
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

export default SortDropdownMenu;
