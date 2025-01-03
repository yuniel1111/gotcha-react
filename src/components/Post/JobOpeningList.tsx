import JobOpeningCard from "./JobOpeningCard"

function JobOpeningList() {
  return (
    <section className='flex flex-wrap'>
      {
        Array.from({length: 5}).map((_, idx) => 
          <JobOpeningCard key={idx}/>
      )}
    </section>
  )
}

export default JobOpeningList