import { useEffect, useRef, useState } from 'react';
import SkeletonJobPostCard from './SkeletonJobPostCard';
import { GotchaPostType } from '../../types/gotchaPostType';
import JobPostCard from './JobPostCard';

interface JobPostListType {
  posts: GotchaPostType[];
  fetchNextPage: any;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  initialBookmark: boolean;
}

function JobPostList({
  posts,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  initialBookmark,
}: JobPostListType) {
  const files = import.meta.glob('/src/assets/company/*');
  const companyImages = Object.keys(files);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current) return;

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    intersectionObserver.observe(observerRef.current);
    return () => intersectionObserver.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <ul className='flex flex-wrap'>
      {posts?.map((post, idx) => (
        <JobPostCard
          key={post.post_id}
          post={post}
          companyImage={companyImages[idx]}
          initialBookmark={initialBookmark}
        />
      ))}

      {isFetchingNextPage &&
        Array.from({ length: 5 }).map((_, index) => (
          <SkeletonJobPostCard key={`skeleton-${index}`} />
        ))}

      <div ref={observerRef} className='h-10'></div>
    </ul>
  );
}

export default JobPostList;
