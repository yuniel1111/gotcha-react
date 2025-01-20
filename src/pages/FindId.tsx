import { useForm, FormProvider } from 'react-hook-form';
import gotchaLogoImage from '../assets/gotcha_logo.png';
import { Link } from 'react-router-dom';
import VerifyOtp from '../components/User/VerifyOtp';
import { getUserEmail } from '../api/supabase/userService';

interface FormDataType {
  name: string;
  phoneNumber: string;
  verificationCode: string;
  verificationError: string;
  email: string;
}

function FindId() {
  const methods = useForm<FormDataType>({
    mode: 'onBlur',
  });
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: FormDataType) => {
    const { data: userData, error: userError } = await getUserEmail(
      data.name,
      data.phoneNumber,
    );

    if (userError) {
      setError('verificationError', {
        message: '가입 시 정보와 일치하지 않습니다.',
      });
      setValue('email', '');
      return;
    }

    if (userData) {
      setValue('email', userData.email);
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

      <FormProvider {...methods}>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className='w-[400px] rounded-xl p-9 sm:mt-[60px] sm:shadow-brand-main-shadow'
        >
          <div className='flex justify-center'>
            <h1 className='w-[120px] border-b-4 border-brand-main pb-1 text-center text-lg font-bold text-brand-main'>
              아이디 찾기
            </h1>
            <Link to='/find-password'>
              <h1 className='w-[120px] cursor-pointer text-center text-lg font-bold text-brand-gray-2'>
                비밀번호 찾기
              </h1>
            </Link>
          </div>

          <div className='mt-8'>
            <input
              type='text'
              placeholder='이름'
              className='brand-main-input w-full'
              {...register('name', { required: '이름을 입력해주세요.' })}
            />
            {errors.name && (
              <p className='mt-1 text-xs text-brand-red-1'>
                {errors.name.message}
              </p>
            )}
          </div>

          <VerifyOtp />

          {errors.verificationError && (
            <p className='mt-1 text-xs text-brand-red-1'>
              {errors.verificationError.message}
            </p>
          )}

          <div className='mt-8'>
            <button type='submit' className='brand-main-button w-full'>
              인증 확인
            </button>
          </div>
        </form>
      </FormProvider>
    </main>
  );
}

export default FindId;
