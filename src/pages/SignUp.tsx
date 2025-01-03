import { Link } from 'react-router-dom';
import gotchaLogoImage from '../assets/gotcha_logo.png';

function SignUp() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <main className='flex flex-col items-center'>
      <div className='mt-[60px] hidden sm:block'>
        <img
          src={gotchaLogoImage}
          alt='GOTCHA'
          className='h-[30px] w-[180px]'
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className='w-[400px] rounded-xl p-9 sm:mt-[60px] sm:shadow-brand-main-shadow'
      >
        <div className='flex justify-center'>
          <Link to='/sign-in'>
            <h1 className='w-[120px] cursor-pointer text-center text-lg font-bold text-brand-gray-2'>
              로그인
            </h1>
          </Link>
          <h1 className='w-[120px] border-b-4 border-brand-main pb-1 text-center text-lg font-bold text-brand-main'>
            회원가입
          </h1>
        </div>
      </form>
    </main>
  );
}

export default SignUp;
