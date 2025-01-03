import { Link } from 'react-router-dom';
import gotchaLogoImage from '../assets/gotcha_logo.png';
import SocialLoginList from '../components/User/SocialLoginList';

function SignIn() {
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
          <h1 className='w-[120px] border-b-4 border-brand-main pb-1 text-center text-lg font-bold text-brand-main'>
            로그인
          </h1>
          <Link to='/sign-up'>
            <h1 className='w-[120px] cursor-pointer text-center text-lg font-bold text-brand-gray-2'>
              회원가입
            </h1>
          </Link>
        </div>

        <div className='mt-8'>
          <input
            type='text'
            placeholder='아이디'
            className='brand-main-input w-full'
          />
        </div>
        <div className='mt-4'>
          <input
            type='password'
            placeholder='비밀번호'
            className='brand-main-input w-full'
          />
        </div>

        <div className='mt-4'>
          <div className='flex items-center gap-1'>
            <input type='checkbox' id='saveId' className='accent-brand-main' />
            <label htmlFor='saveId' className='text-sm text-brand-gray-4'>
              아이디 저장
            </label>
          </div>
        </div>

        <div className='mt-4'>
          <button type='submit' className='brand-main-button w-full'>
            로그인
          </button>
        </div>

        <div className='mt-4 flex items-center justify-center gap-1 text-sm text-brand-gray-4'>
          <Link to='/find-id'>
            <button type='button'>아이디 찾기</button>
          </Link>
          <div className='mx-1 h-4 w-[1px] bg-brand-gray-4'></div>
          <Link to='/find-password'>
            <button type='button'>비밀번호 찾기</button>
          </Link>
        </div>

        <SocialLoginList />
      </form>
    </main>
  );
}

export default SignIn;
