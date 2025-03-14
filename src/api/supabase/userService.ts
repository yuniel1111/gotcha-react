import { Provider } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';

// public.profile 테이블의 유저 정보 가져오기
export const getUserProfile = async (profileId: string) => {
  const { data } = await supabase
    .from('profile')
    .select(
      'profile_id, email, name, created_at, updated_at, is_deleted, phone',
    )
    .eq('profile_id', profileId)
    .single();

  return data;
};

// 이메일, 비밀번호로 로그인
export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
};

// 소셜 로그인
export const signInWithOAuth = async (provider: Provider) => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: 'http://localhost:5173/',
    },
  });

  return error;
};

// 로그아웃
export const signOut = async () => {
  supabase.auth.signOut();
};

// 회원가입
export const signUp = async (
  email: string,
  password: string,
  name: string,
  phone: string,
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        password,
        name,
        phone,
      },
    },
  });

  return { data, error };
};

// auth.users 테이블의 유저 세션 정보 가져오기
export const getUserId = async () => {
  const { data } = await supabase.auth.getSession();

  return data.session?.user.id;
};

// 휴대폰 OTP 전송
export const sendVerificationCode = async (phone: string) => {
  const { error } = await supabase.auth.signInWithOtp({
    phone,
  });

  return error;
};

// 휴대폰 OTP 인증
export const verifyCode = async (phone: string, token: string) => {
  const { data, error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: 'sms',
  });

  return { data, error };
};
