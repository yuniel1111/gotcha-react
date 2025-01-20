import { useEffect, useRef } from 'react';
import { useJobPost } from '../../hooks/useJobPost';
import SkeletonJobPostCard from './SkeletonJobPostCard';
import { GotchaPostType } from '../../types/gotchaPostType';
import JobPostCard from './JobPostCard';
import { SortLabelListType } from '../../pages/Home';

interface JobPostListType {
  sortLabel: string;
  sortLabelList: SortLabelListType;
}

function JobPostList({ sortLabel, sortLabelList }: JobPostListType) {
  const files = import.meta.glob('/src/assets/company/*');
  const companyImages = Object.keys(files);
  const infinitePageSize = 5;
  const observerRef = useRef<HTMLDivElement | null>(null);

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useJobPost(
    `posts-${sortLabel}`,
    sortLabelList[sortLabel][0],
    sortLabelList[sortLabel][1],
    infinitePageSize,
  );

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
      {posts?.pages.map((page) =>
        page.map((post: GotchaPostType, idx: number) => (
          <JobPostCard
            key={post.post_id}
            post={post}
            companyImage={companyImages[idx]}
          />
        )),
      )}

      {isFetchingNextPage &&
        Array.from({ length: 5 }).map((_, index) => (
          <SkeletonJobPostCard key={`skeleton-${index}`} />
        ))}

      <div ref={observerRef} className='h-10'></div>
    </ul>
  );
}

export default JobPostList;
