import { useEffect, useRef, useState } from 'react';
import {
  isPhoneNumberExists,
  sendOtp,
  verifyOtp,
  signOut,
} from '../../api/supabase/userService';
import { useFormContext } from 'react-hook-form';

function VerifyOtp({ isSignUp }: { isSignUp?: boolean }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [verificationCodeTimer, setVerificationCodeTimer] = useState('');
  const timerId = useRef<NodeJS.Timeout | null>(null);
  const {
    register,
    getValues,
    setValue,
    clearErrors,
    setError,
    formState: { errors },
  } = useFormContext();

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
    const isPhoneExists = await isPhoneNumberExists(phoneNumber);

    if (!phoneNumber || phoneNumber.length < 11) {
      setError('phoneNumber', {
        message: '올바른 휴대폰 형식을 입력해주세요. 예) 01012345678',
      });

      return;
    } else if (isPhoneExists && isSignUp) {
      setError('phoneNumber', {
        message: '이미 가입된 번호입니다.',
      });

      return;
    }

    await sendOtp(formatPhoneNumber(phoneNumber));
    setIsDisabled(false);
  };

  const clearVerificationTimer = () => {
    if (timerId.current) clearInterval(timerId.current);
    setIsDisabled(true);
  };

  const handleVerificationValidate = async () => {
    const token = getValues('verificationCode');
    const phoneNumber = getValues('phoneNumber');

    if (token.length !== 6) {
      setError('verificationCode', {
        message: '6자리 인증코드를 입력해주세요.',
      });

      return;
    }

    const { data, error } = await verifyOtp(
      formatPhoneNumber(phoneNumber),
      token,
    );

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

      if (data) signOut();
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
    <>
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
            {errors.phoneNumber.message as string}
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
              {errors.verificationCode.message as string}
            </p>
          )}
          <span
            className={`mt-1 ${timerId.current ? 'inline-block' : 'hidden'} text-right text-xs`}
          >
            {verificationCodeTimer}
          </span>
        </div>
      </div>
    </>
  );
}

export default VerifyOtp;
