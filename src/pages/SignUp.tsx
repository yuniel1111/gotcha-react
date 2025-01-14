import { Link, useNavigate } from 'react-router-dom';
import gotchaLogoImage from '../assets/gotcha_logo.png';
import SocialLoginList from '../components/User/SocialLoginList';
import { useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import { supabase } from '../api/supabase/supabaseClient';
import { useEffect, useRef, useState } from 'react';
import CryptoJS from 'crypto-js';

interface FormDataType {
  email: string;
  password: string;
  phoneNumber: string;
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
  const [isDisabled, setIsDisabled] = useState(true);
  const [verificationCodeTimer, setVerificationCodeTimer] = useState('');
  const timerId = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormDataType>({
    mode: 'onBlur',
  });

  /**
   * 이용약관 동의 관련 함수
   */
  const setAgreementError = (isChecked: boolean) => {
    if (isChecked) {
      clearErrors('selectAllAgreement');
    } else {
      setError('selectAllAgreement', {
        message: '모든 이용약관을 동의해주세요.',
      });
    }
  };

  const handleSelectAllAgreement = () => {
    const isChecked = getValues('selectAllAgreement');

    agreementItems.forEach((agreement) => {
      setValue(agreement.key as keyof FormDataType, isChecked);
    });

    setAgreementError(isChecked);
  };

  const handleSelectEachAgreement = () => {
    const isChecked =
      getValues('ageAgreement') &&
      getValues('termsAgreement') &&
      getValues('personalAgreement');

    setValue('selectAllAgreement', isChecked);
    setAgreementError(isChecked);
  };

  /**
   * 휴대폰 번호 입력 관련 함수
   */
  const handlePhoneNumber = () => {
    const sanitizedPhoneNumber = getValues('phoneNumber').replace(
      /[^0-9]/g,
      '',
    );

    setValue('phoneNumber', sanitizedPhoneNumber);
    if (sanitizedPhoneNumber.length === 11) {
      clearErrors('phoneNumber');
    }
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    if (phoneNumber.startsWith('0')) {
      return '+82' + phoneNumber.slice(1);
    }

    return phoneNumber;
  };

  /**
   * 인증코드 관련 함수
   */
  const handleVerificationSend = async () => {
    const phoneNumber = getValues('phoneNumber');

    if (!phoneNumber || phoneNumber.length < 11) {
      setError('phoneNumber', {
        message: '올바른 휴대폰 형식을 입력해주세요. 예) 01012345678',
      });

      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      phone: formatPhoneNumber(phoneNumber),
    });

    if (error) {
      throw new Error(`Sign In With Otp Error : ${error}`);
    } else {
      setIsDisabled(false);
    }
  };

  const clearVerificationTimer = () => {
    if (timerId.current) clearInterval(timerId.current);
    setIsDisabled(true);
  };

  const handleVerificationValidate = async () => {
    const token = getValues('verificationCode');

    if (token.length !== 6) {
      setError('verificationCode', {
        message: '6자리 인증코드를 입력해주세요.',
      });

      return;
    }

    const { data, error } = await supabase.auth.verifyOtp({
      phone: formatPhoneNumber(getValues('phoneNumber')),
      token,
      type: 'sms',
    });

    if (error) {
      setError('verificationCode', {
        message: '인증코드가 일치하지 않습니다.',
      });
    } else {
      clearErrors('verificationCode');
      if (timerId.current) {
        clearVerificationTimer();
        timerId.current = null;
      }

      if (data) supabase.auth.signOut();
    }
  };

  /**
   * Form 제출
   */
  const onSubmit = async (data: FormDataType) => {
    // 폴더 구조 변경 (server 제거)
    // 최종적으로 회원가입이 완료되면 public user 테이블에도 정보 저장 (trigger 사용)
    // 전화번호 인증 시간관련 설정 찾아보기 (twilio or supabase)
    // 세션 할당 관련해서 알아보기
    const { data: userData, error: userError } = await supabase.auth.signUp({
      email: data.email,
      password: CryptoJS.SHA256(data.password).toString(),
    });

    if (userError) {
      setError('email', {
        message: '이미 가입된 이메일입니다.',
      });

      return;
    }

    if (userData) {
      supabase.auth.signOut();
      navigate('/sign-in');
    }
  };

  /**
   * 인증코드 타이머
   */
  useEffect(() => {
    if (isDisabled) return;

    let timeLeft = 60 * 3;

    timerId.current = setInterval(() => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;

      setVerificationCodeTimer(
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
      );

      timeLeft -= 1;

      if (timeLeft < 0) {
        clearVerificationTimer();
        setError('verificationCode', {
          message: '인증코드가 만료되었습니다. 다시 시도해주세요.',
        });
      }
    }, 1000);

    return () => clearVerificationTimer();
  }, [isDisabled, setError]);

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
          </div>
          {errors.email && (
            <p className='mt-1 text-xs text-brand-red-1'>
              {errors.email.message}
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
            <p className='mt-1 text-xs text-brand-red-1'>
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
              validate: (value: string) =>
                value === getValues('password') ||
                '비밀번호가 일치하지 않습니다.',
            })}
          />
          {errors.passwordCheck && (
            <p className='mt-1 text-xs text-brand-red-1'>
              {errors.passwordCheck?.message}
            </p>
          )}
        </div>

        <div className='mt-4'>
          <div className='flex gap-2'>
            <input
              type='tel'
              placeholder='휴대폰 번호'
              className={`w-full ${errors.phoneNumber ? 'brand-main-input-error' : 'brand-main-input'}`}
              {...register('phoneNumber', {
                required: '휴대폰 번호를 입력해주세요.',
                pattern: {
                  value: /^01[0-9]\d{3,4}\d{4}$/,
                  message: '올바른 휴대폰 형식을 입력해주세요. 예) 01012345678',
                },
                onChange: () => handlePhoneNumber(),
              })}
            />
            <button
              type='button'
              onClick={handleVerificationSend}
              className='brand-confirm-button w-[140px] text-sm'
            >
              인증번호 받기
            </button>
          </div>
          {errors.phoneNumber && (
            <p className='mt-1 text-xs text-brand-red-1'>
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        <div className='mt-4'>
          <input
            type='text'
            placeholder='인증코드 입력'
            disabled={isDisabled}
            className={`w-full ${errors.verificationCode ? 'brand-main-input-error' : 'brand-main-input border border-brand-gray-2'}`}
            {...register('verificationCode', {
              required: '인증코드를 입력해주세요.',
              onChange: () => handleVerificationValidate(),
            })}
          />

          <div className='flex justify-between'>
            {errors.verificationCode && (
              <p className='mt-1 w-full text-xs text-brand-red-1'>
                {errors.verificationCode.message}
              </p>
            )}
            <span
              className={`mt-1 ${timerId.current ? 'inline-block' : 'hidden'} text-right text-xs`}
            >
              {verificationCodeTimer}
            </span>
          </div>
        </div>

        <div className='mt-4'>
          <input
            type='text'
            placeholder='이름'
            className={`w-full ${errors.name ? 'brand-main-input-error' : 'brand-main-input'}`}
            {...register('name', { required: '이름을 입력해주세요.' })}
          />
          {errors.name && (
            <p className='mt-1 text-xs text-brand-red-1'>
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
                  required: '모든 이용약관을 동의해주세요.',
                  onChange: () => handleSelectAllAgreement(),
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
              <p className='mt-1 text-xs text-brand-red-1'>
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
                {...register(agreement.key as keyof FormDataType, {
                  onChange: () => handleSelectEachAgreement(),
                })}
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
