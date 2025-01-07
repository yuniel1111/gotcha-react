import JobOpeningCard from '../components/Post/JobPostCard';

function Bookmark() {
  return (
    <>
      <div className='response-page-padding pt-5'>
        <div className='flex justify-between'>
          <h1 className='page-title'>관심공고</h1>
          <div className='flex gap-2 whitespace-nowrap'>
            <button className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500'>
              마감된 공고 해제
            </button>
            <button className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500'>
              전체 해제
            </button>
          </div>
        </div>
        <section className='flex flex-wrap'>
          {Array.from({ length: 5 }).map((_, idx) => (
            <JobOpeningCard key={idx} isBookmarkedProps={true} />
          ))}
        </section>
      </div>
    </>
  );
}

export default Bookmark;
