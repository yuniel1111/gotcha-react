import { GotchaPostType } from '../../types/gotchaPostType';

interface JobPostDetailCardPropsType {
  post: GotchaPostType;
  handlePostLink: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

function JobPostDetailCard({
  post,
  handlePostLink,
}: JobPostDetailCardPropsType) {
  const detailPostData = [
    ['근무지', post.location],
    ['직무', post.job],
    ['경력', post.experience],
    [
      '마감일',
      post.deadline ? new Date(post.deadline).toLocaleDateString() : '미정',
    ],
    ['연봉', post.salary],
    ['기업형태', post.company_type],
    ['고용형태', post.employment_type],
  ];

  return (
    <section
      className={
        'absolute left-0 top-0 z-10 flex max-h-[170%] w-full flex-col rounded-md bg-black bg-opacity-85 px-3 py-5 text-brand-white'
      }
    >
      <div className='flex flex-col items-center overflow-y-scroll'>
        <div className='pb-5 pt-3 text-center text-lg font-bold'>
          {post.title}
        </div>
        <table className='w-[90%] table-auto self-center text-left text-sm'>
          <tbody>
            <tr>
              <th className='border-brand-whitetext-center text-nowrap border-r py-1 pr-3 align-top'>
                회사명
              </th>
              <td className='pl-4'>
                {post.company_url ? (
                  <a
                    href={post.company_url}
                    target='_blank'
                    className='text-brand-sub underline'
                  >
                    {post.company}
                  </a>
                ) : (
                  `${post.company}`
                )}
              </td>
            </tr>

            {detailPostData.map((rowData, index) => (
              <tr key={index}>
                <th className='border-brand-whitetext-center text-nowrap border-r py-1 pr-3 align-top'>
                  {rowData[0]}
                </th>
                <td className='pl-4'>{rowData[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <a
        href={post.post_url}
        target='_blank'
        onClick={handlePostLink}
        className='sticky bottom-0 mt-4 w-full rounded-md border border-brand-white bg-black py-2 text-center font-bold hover:bg-brand-sub'
      >
        지원하러 가기
      </a>
    </section>
  );
}
export default JobPostDetailCard;
