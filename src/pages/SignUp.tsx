import { Link } from 'react-router-dom';
import gotchaLogoImage from '../assets/gotcha_logo.png';
import SocialLoginList from '../components/User/SocialLoginList';
import { useForm, useWatch } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import { useEffect } from 'react';

interface FormDataType {
  email: string;
  password: string;
  name: string;
  passwordCheck: string;
  verificationCode: string;
  selectAllAgreement: boolean;
  ageAgreement: boolean;
  termsAgreement: boolean;
  personalAgreement: boolean;
}

const agreementItems = [
  { label: '[필수] 만 14세 이상입니다.', key: 'ageAgreement' },
  { label: '[필수] GOTCHA 이용약관 동의', key: 'termsAgreement' },
  {
    label: '[필수] GOTCHA 개인정보 수집 및 이용 동의',
    key: 'personalAgreement',
  },
];

function SignUp() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
    control,
  } = useForm<FormDataType>({
    mode: 'onBlur',
  });

  const [ageAgreement, termsAgreement, personalAgreement] = useWatch({
    control,
    name: ['ageAgreement', 'termsAgreement', 'personalAgreement'],
  });

  const handleSendOtp = () => {};

  const handleSelectAllAgreement = (e: React.FormEvent<HTMLInputElement>) => {
    const isChecked = e.currentTarget.checked;

    agreementItems.forEach((agreement) => {
      setValue(agreement.key as keyof FormDataType, isChecked);
    });
  };

  const onSubmit = (data: FormDataType) => {
    console.log(data);
    // 이메일 인증코드 검사
    // crypto-js의 SHA256 방식을 사용한 비밀번호 암호화 구현
    // 이메일이 중복 검사 + 에러 문구 변경
  };

  useEffect(() => {
    const isAllAgreementChecked =
      ageAgreement && termsAgreement && personalAgreement;

    setValue('selectAllAgreement', isAllAgreementChecked);
    if (isAllAgreementChecked) clearErrors('selectAllAgreement');
  }, [ageAgreement, termsAgreement, personalAgreement, setValue, clearErrors]);

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
          <Link to='/sign-in'>
            <h1 className='w-[120px] cursor-pointer text-center text-lg font-bold text-brand-gray-2'>
              로그인
            </h1>
          </Link>
          <h1 className='w-[120px] border-b-4 border-brand-main pb-1 text-center text-lg font-bold text-brand-main'>
            회원가입
          </h1>
        </div>

        <div className='mt-8'>
          <div className='flex gap-2'>
            <input
              type='email'
              placeholder='이메일'
              className={`w-full ${errors.email ? 'brand-main-input-error' : 'brand-main-input'}`}
              {...register('email', {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message:
                    '올바른 이메일 형식을 입력해주세요. 예) example@gotcha.com',
                },
              })}
            />
            <button
              type='button'
              onClick={handleSendOtp}
              className='brand-confirm-button w-[120px] text-sm'
            >
              이메일 인증
            </button>
          </div>
          {errors.email && (
            <p className='text-brand-red-1 mt-1 text-xs'>
              {errors.email.message}
            </p>
          )}
        </div>

        <div className='mt-4'>
          <input
            type='text'
            placeholder='인증코드 입력'
            className={`w-full ${errors.verificationCode ? 'brand-main-input-error' : 'brand-main-input'}`}
            {...register('verificationCode', {
              required: '인증코드를 입력해주세요.',
            })}
          />
          {errors.verificationCode && (
            <p className='text-brand-red-1 mt-1 text-xs'>
              {errors.verificationCode.message}
            </p>
          )}
        </div>

        <div className='mt-4'>
          <input
            type='password'
            placeholder='비밀번호(10자리 이상)'
            className={`w-full ${errors.password ? 'brand-main-input-error' : 'brand-main-input'}`}
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{10,}$/,
                message:
                  '비밀번호는 10자 이상 영어, 숫자, 특수문자(@$!%*?&) 조합이어야 합니다.',
              },
            })}
          />
          {errors.password && (
            <p className='text-brand-red-1 mt-1 text-xs'>
              {errors.password.message}
            </p>
          )}
        </div>

        <div className='mt-4'>
          <input
            type='password'
            placeholder='비밀번호 확인'
            className={`w-full ${errors.passwordCheck ? 'brand-main-input-error' : 'brand-main-input'}`}
            {...register('passwordCheck', {
              required: '비밀번호를 확인해주세요.',
              validate: (value) =>
                value === getValues('password') ||
                '비밀번호가 일치하지 않습니다.',
            })}
          />
          {errors.passwordCheck && (
            <p className='text-brand-red-1 mt-1 text-xs'>
              {errors.passwordCheck?.message}
            </p>
          )}
        </div>

        <div className='mt-4'>
          <input
            type='text'
            placeholder='이름'
            className={`w-full ${errors.name ? 'brand-main-input-error' : 'brand-main-input'}`}
            {...register('name', { required: '이름을 입력해주세요.' })}
          />
          {errors.name && (
            <p className='text-brand-red-1 mt-1 text-xs'>
              {errors.name.message}
            </p>
          )}
        </div>

        <div className='mt-8 flex items-center justify-between'>
          <div className='h-[1px] w-full bg-brand-gray-4'></div>
          <p className='mx-2 whitespace-nowrap text-sm text-brand-gray-4'>
            이용약관 동의
          </p>
          <div className='h-[1px] w-full bg-brand-gray-4'></div>
        </div>

        <div className='mt-4'>
          <div className=''>
            <div className='flex items-center gap-1'>
              <input
                type='checkbox'
                id='selectAllAgreement'
                className='accent-brand-main'
                {...register('selectAllAgreement', {
                  required: '모든 약관에 동의가 필요합니다.',
                  onChange: (e) => handleSelectAllAgreement(e),
                })}
              />
              <label
                htmlFor='selectAllAgreement'
                className='text-sm text-brand-gray-4'
              >
                전체 동의
              </label>
            </div>
            {errors.selectAllAgreement && (
              <p className='text-brand-red-1 mt-1 text-xs'>
                {errors.selectAllAgreement.message}
              </p>
            )}
          </div>
        </div>

        <div className='mt-4 h-[1px] bg-brand-gray-1'></div>

        {agreementItems.map((agreement) => (
          <div key={uuid()} className='mt-4'>
            <div className='flex items-center gap-1'>
              <input
                type='checkbox'
                id={agreement.key}
                className='accent-brand-main'
                {...register(agreement.key as keyof FormDataType)}
              />
              <label
                htmlFor={agreement.key}
                className='text-sm text-brand-gray-4'
              >
                {agreement.label}
              </label>
            </div>
          </div>
        ))}

        <div className='mt-4'>
          <button type='submit' className='brand-main-button w-full'>
            회원가입
          </button>
        </div>

        <SocialLoginList />
      </form>
    </main>
  );
}

export default SignUp;
