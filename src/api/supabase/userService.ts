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

  if (error) throw new Error(`[signInWithOAuth] : ${error}`);
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

// auth.users 테이블의 유저 아이디 가져오기
export const getUserId = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) throw new Error(`[getUserId] : ${error}`);

  return data.session?.user.id;
};

// 휴대폰 OTP 전송
export const sendOtp = async (phone: string) => {
  const { error } = await supabase.auth.signInWithOtp({
    phone,
  });

  if (error) throw new Error(`[sendOtp] : ${error}`);
};

// 휴대폰 OTP 인증
export const verifyOtp = async (phone: string, token: string) => {
  const { data, error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: 'sms',
  });

  return { data, error };
};

// 휴대폰 번호 중복검사
export const isPhoneNumberExists = async (phoneNumber: string) => {
  const { data } = await supabase
    .from('profile')
    .select('profile_id')
    .eq('phone', phoneNumber)
    .limit(1);

  return data && data.length !== 0;
};

// 이름과 번호로 일치하는 유저의 이메일 반환
export const getUserEmail = async (name: string, phoneNumber: string) => {
  const { data } = await supabase
    .from('profile')
    .select('email')
    .eq('name', name)
    .eq('phone', phoneNumber)
    .limit(1);

  const isExists = data && data.length !== 0;

  return isExists && data[0].email;
};
