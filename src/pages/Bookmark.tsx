import JobOpeningCard from "../components/Post/JobOpeningCard";

function Bookmark() {
  return <>
    <div className='response-page-padding pt-5'>
      <h1 className='page-title'>관심공고</h1>
      <section className='flex flex-wrap'>
      {
        Array.from({length: 5}).map((_, idx) => 
          <JobOpeningCard key={idx} isBookmarkedProps={true}/>
      )}
      </section>
    </div>
  </>;
}

export default Bookmark;