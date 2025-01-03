import '../css/tailwind.css';
import saraminBanner from '../assets/saramin_banner.jpeg'
import JobOpeningList from '../components/Post/JobOpeningList';

function Home() {

  return <div className='response-page-padding'>
  <section className='py-6'>
    <a href='https://www.saramin.co.kr/zf_user/' target='_blank'>
      <img className='rounded-lg' src={saraminBanner} alt="saramin banner" />
    </a>
  </section>
  <h1 className='page-title'>채용공고</h1>
  <JobOpeningList />
  </div>;
}

export default Home;
