import { twMerge } from 'tailwind-merge';
import { GotchaPostType } from '../../types/gotchaPostType';

export default function JobPostDetailCard({ post }: { post: GotchaPostType }) {
  const detailPostData = [
    ['회사명', post.company],
    ['근무지', post.location],
    ['직무', post.job],
    ['경력', post.experience],
    ['마감일', post.deadline.toLocaleDateString()],
    ['연봉', post.salary],
    ['기업형태', post.company_type],
    ['고용형태', post.employment_type],
  ];
  return (
    <section
      className={twMerge(
        'z-100 absolute left-0 top-0 flex w-full flex-col gap-8 overflow-visible rounded-md bg-black bg-opacity-85 px-5 py-10 text-brand-white',
      )}
    >
      <div className='text-center text-lg font-extrabold'>{post.title}</div>
      <table className='w-[90%] table-auto self-center text-left text-sm'>
        <tbody>
          {detailPostData.map((rowData) => (
            <tr>
              <th className='border-brand-whitetext-center text-nowrap border-r py-1 pr-4 align-top'>
                {rowData[0]}
              </th>
              <td className='pl-4'>{rowData[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href={post.post_url} target='_blank'>
        <button className='w-full rounded-md border border-brand-white py-2 hover:bg-brand-sub'>
          지원하러 가기
        </button>
      </a>
    </section>
  );
}
