import gotchaLogoImage from '../assets/gotcha_logo.png';
import kakaoLogoImage from '../assets/kakao_logo.png';
import googleLogoImage from '../assets/google_logo.png';
import githubLogoImage from '../assets/github_logo.png';

function SignIn() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <main className='flex flex-col items-center'>
      <div className='mt-[60px]'>
        <img
          src={gotchaLogoImage}
          alt='GOTCHA'
          className='h-[30px] w-[180px]'
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className='mt-[60px] w-[450px] rounded-xl p-9 shadow-brand-main-shadow'
      >
        <div className='flex justify-center'>
          <h1 className='w-[140px] border-b-4 border-brand-main pb-1 text-center text-lg font-bold text-brand-main'>
            로그인
          </h1>
          <h1 className='w-[140px] text-center text-lg font-bold text-brand-gray-2'>
            회원가입
          </h1>
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

        <div className='mt-4 flex gap-4'>
          <div className='flex items-center gap-1'>
            <input
              type='checkbox'
              id='keepLogin'
              className='accent-brand-main'
            />
            <label htmlFor='keepLogin' className='text-sm text-brand-gray-4'>
              로그인 유지
            </label>
          </div>
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
          <button type='button'>아이디 찾기</button>
          <div className='mx-1 h-4 w-[1px] bg-brand-gray-4'></div>
          <button type='button'>비밀번호 찾기</button>
        </div>

        <div className='mt-8 flex items-center justify-between'>
          <div className='h-[1px] w-[100px] bg-brand-gray-4'></div>
          <p className='text-sm text-brand-gray-4'>소셜 계정으로 간편 로그인</p>
          <div className='h-[1px] w-[100px] bg-brand-gray-4'></div>
        </div>

        <div className='mt-8 flex justify-center gap-3'>
          <img src={kakaoLogoImage} alt='KAKAO' className='h-[50px] w-[50px]' />
          <img
            src={googleLogoImage}
            alt='GOOGLE'
            className='h-[50px] w-[50px]'
          />
          <img
            src={githubLogoImage}
            alt='GITHUB'
            className='h-[50px] w-[50px]'
          />
        </div>
      </form>
    </main>
  );
}

export default SignIn;
