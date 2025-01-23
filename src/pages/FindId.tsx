import { useForm, FormProvider, useWatch } from 'react-hook-form';
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
  isVerifiySuccess: boolean;
}

function FindId() {
  const methods = useForm<FormDataType>({
    mode: 'onBlur',
    defaultValues: {
      isVerifiySuccess: false,
    },
  });
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    control,
    formState: { errors },
  } = methods;

  const isVerifySuccess = useWatch({
    control,
    name: 'isVerifiySuccess',
  });

  const onSubmit = async (data: FormDataType) => {
    const userEmail = await getUserEmail(data.name, data.phoneNumber);

    if (!userEmail) {
      setError('verificationError', {
        message: '가입한 정보와 일치하지 않습니다.',
      });
      setValue('email', '');
      setValue('isVerifiySuccess', false);

      return;
    }

    setValue('email', userEmail);
    setValue('isVerifiySuccess', true);
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

          {isVerifySuccess && (
            <>
              <div className='mt-8 h-[1px] w-full bg-brand-gray-4'></div>
              <div className='mt-8'>
                <input
                  type='email'
                  disabled={true}
                  className={`w-full ${errors.verificationCode ? 'brand-main-input-error' : 'brand-main-input border border-brand-gray-2'}`}
                  {...register('email')}
                />
              </div>
            </>
          )}
        </form>
      </FormProvider>
    </main>
  );
}

export default FindId;
