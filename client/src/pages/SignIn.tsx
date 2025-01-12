import { Link, useNavigate } from 'react-router-dom';
import gotchaLogoImage from '../assets/gotcha_logo.png';
import SocialLoginList from '../components/User/SocialLoginList';
import { useForm } from 'react-hook-form';
import { supabase } from '../api/supabase/supabaseClient';
import CryptoJS from 'crypto-js';
import { useUserStore } from '../stores/useUserStore';

interface FormDataType {
  email: string;
  password: string;
}

function SignIn() {
  const navigate = useNavigate();
  const { setUserLogin, setUserSession } = useUserStore(
    (state) => state.actions,
  );
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormDataType>();

  const onSubmit = async (data: FormDataType) => {
    const { data: userData, error: userError } =
      await supabase.auth.signInWithPassword({
        email: data.email,
        password: CryptoJS.SHA256(data.password).toString(),
      });

    if (userError)
      setError('password', {
        message: '이메일 또는 비밀번호가 일치하지 않습니다.',
      });

    if (userData) {
      setUserLogin(true);
      setUserSession(userData.session);
      navigate('/');
    }
  };

  return (
    <main className='flex flex-col items-center pb-[60px] sm:pt-[60px]'>
      <div className='hidden sm:block'>
        <img
          src={gotchaLogoImage}
          alt='GOTCHA'
          className='h-[30px] w-[180px]'
        />
      </div>

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
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
            type='email'
            placeholder='이메일'
            className='brand-main-input w-full'
            {...register('email')}
          />
        </div>
        <div className='mt-4'>
          <input
            type='password'
            placeholder='비밀번호'
            className='brand-main-input w-full'
            {...register('password')}
          />
        </div>

        {errors.password && (
          <p className='mt-1 text-xs text-red-500'>{errors.password.message}</p>
        )}

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
