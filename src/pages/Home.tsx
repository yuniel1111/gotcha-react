import '../css/tailwind.css';
import saraminBanner from '../assets/saramin_banner.jpeg';
import JobPostCard from '../components/Post/JobPostCard';
import SortDropdown from '../components/Post/SortDropdown';
import { useJobPostStore } from '../stores/useJobPostSotre';
import { usePost } from '../hooks/usePost';

function Home() {
  const jobPosts = useJobPostStore((state) => state.jobPosts);
  const { data, isLoading, erorr } = usePost<any[]>(`posts`);

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
        <SortDropdown />
      </div>
      <section className='flex flex-wrap'>
        {data &&
          data.map((_: any, idx: number) => (
            <JobPostCard key={idx} isBookmarkedProps={false} />
          ))}
      </section>
    </div>
  );
}

export default Home;
