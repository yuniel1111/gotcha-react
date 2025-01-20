function SkeletonJobPostCard() {
  return (
    <li className='responsive-post-width relative my-3 animate-pulse list-none px-2 py-2'>
      <div className='relative h-40 w-full rounded-t-md bg-brand-gray-1'></div>

      {/* 공고 정보 (스켈레톤) */}
      <div className='rounded-b-md border-x border-b border-brand-gray-1 px-3 py-2'>
        <div className='mb-2 h-5 w-3/4 rounded-md bg-brand-gray-1'></div>
        <div className='mb-1 h-4 w-2/3 rounded-md bg-gray-300'></div>
        <div className='mb-1 h-4 w-1/2 rounded-md bg-gray-300'></div>
      </div>
    </li>
  );
}

export default SkeletonJobPostCard;
