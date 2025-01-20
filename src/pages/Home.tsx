import '../css/tailwind.css';
import { useState } from 'react';
import JobPostCard from '../components/Post/JobPostCard';
import SortDropdown from '../components/Post/SortDropdown';
import { GotchaPostType } from '../types/gotchaPostType';
import { useJobPost } from '../hooks/useJobPost';
import BannerSlider from '../components/Post/BannerSlider';
import companySample from '../assets/company/company_sample.webp';
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
    isLoading,
    error,
  } = useJobPost(
    `posts-${sortLabel}`,
    sortLabelList[sortLabel][0],
    sortLabelList[sortLabel][1],
  );

  const files = import.meta.glob('/src/assets/company/*');
  const companyImages = Object.keys(files);

  if (isLoading) return <p>Loading</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='response-page-padding'>
      <section className='py-6'>
        <BannerSlider />
      </section>
      <div className='flex justify-between'>
        <h1 className='page-title'>채용공고</h1>
        <SortDropdown
          sortLabel={sortLabel}
          setSortLabel={setSortLabel}
          sortLabelList={sortLabelList}
        />
      </div>
      <ul className='flex flex-wrap'>
        {posts &&
          posts.map((post: GotchaPostType, idx: number) => (
            <JobPostCard
              key={idx}
              post={post}
              companyImage={companyImages[idx]}
            />
          ))}
      </ul>
    </div>
  );
}

export default Home;
