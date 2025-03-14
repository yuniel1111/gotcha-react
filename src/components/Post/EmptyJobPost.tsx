import { MdDashboard } from 'react-icons/md';

function EmptyJobPost() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='flex flex-col items-center gap-5 p-10'>
        <div className='flex h-32 w-32 items-center justify-center rounded-full border-2 border-brand-black p-5 text-6xl'>
          <MdDashboard />
        </div>
        <div className='flex flex-col items-center gap-1'>
          <p className='text-lg font-bold'>저장한 항목 없음</p>
          <p className='text-brand-gray-1'>
            북마크한 모든 공고가 여기에 표시됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmptyJobPost;
