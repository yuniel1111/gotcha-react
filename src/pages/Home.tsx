import '../css/tailwind.css';
import saraminBanner from '../assets/saramin_banner.jpeg';
import JobPostCard from '../components/Post/JobPostCard';
import SortDropdown from '../components/Post/SortDropdown';
import { useJobPost } from '../hooks/useJobPost';
import { useState } from 'react';
import { GotchaPostType } from '../types/gotchaPostType';

export interface SortLabelListType {
  [key: string]: [string, boolean];
}

function Home() {
  const sortLabelList: SortLabelListType = {
    최신순: ['posting_date', true],
    마감순: ['expiration_date', true],
  };
  const [sortLabel, setSortLabel] = useState('최신순');
  const {
    data: posts,
    isLoading,
    error,
  } = useJobPost(
    `posts-${sortLabel}`,
    sortLabelList[sortLabel][0],
    sortLabelList[sortLabel][1],
  );

  if (isLoading) return <p>Loading</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='response-page-padding'>
      <section className='py-6'>
        <a href='https://www.saramin.co.kr/zf_user/' target='_blank'>
          <img
            className='rounded-lg'
            src={saraminBanner}
            alt='saramin banner'
          />
        </a>
      </section>
      <div className='flex justify-between'>
        <h1 className='page-title'>채용공고</h1>
        <SortDropdown
          sortLabel={sortLabel}
          setSortLabel={setSortLabel}
          sortLabelList={sortLabelList}
        />
      </div>
      <section className='flex flex-wrap'>
        {posts &&
          posts.map((post: GotchaPostType, idx: number) => (
            <JobPostCard key={idx} post={post} />
          ))}
      </section>
    </div>
  );
}

export default Home;
