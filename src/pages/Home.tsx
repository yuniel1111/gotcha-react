import '../css/tailwind.css';
import { useEffect, useRef, useState } from 'react';
import JobPostCard from '../components/Post/JobPostCard';
import SortDropdown from '../components/Post/SortDropdown';
import { GotchaPostType } from '../types/gotchaPostType';
import { useJobPost } from '../hooks/useJobPost';
import BannerSlider from '../components/Post/BannerSlider';
import SkeletonJobPostCard from '../components/Post/SkeletonJobPostCard';
// import { supabase } from '../api/supabase/supabaseClient';
// import { useUserStore } from '../stores/useUserStore';

export interface SortLabelListType {
  [key: string]: [string, boolean];
}

function Home() {
  // const { setUserSession, setUserLogin } = useUserStore(
  //   (state) => state.actions,
  // );

  // const handleLogout = async () => {
  //   await supabase.auth.signOut();
  //   setUserSession(null);
  //   setUserLogin(false);
  // };

  const sortLabelList: SortLabelListType = {
    최신순: ['posting_date', true],
    마감순: ['expiration_date', true],
  };
  const [sortLabel, setSortLabel] = useState('최신순');
  const {
    data: posts,
    // error,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useJobPost(
    `posts-${sortLabel}`,
    sortLabelList[sortLabel][0],
    sortLabelList[sortLabel][1],
    5,
  );

  const files = import.meta.glob('/src/assets/company/*');
  const companyImages = Object.keys(files);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className='response-page-padding'>
      <BannerSlider />
      <div className='flex justify-between'>
        <h1 className='page-title'>채용공고</h1>
        <SortDropdown
          sortLabel={sortLabel}
          setSortLabel={setSortLabel}
          sortLabelList={sortLabelList}
        />
      </div>
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
    </div>
  );
}

export default Home;
