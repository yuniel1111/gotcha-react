import kakaoLogoImage from '../../assets/kakao_logo.png';
import googleLogoImage from '../../assets/google_logo.png';
import githubLogoImage from '../../assets/github_logo.png';
import { supabase } from '../../api/supabase/supabaseClient';

function SocialLogin() {
  const handleKakaoLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
    });

    if (error) throw new Error(`Kakao OAuth Login Error : ${error}`);
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) throw new Error(`Google OAuth Login Error : ${error}`);
  };

  const handleGithubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });

    if (error) throw new Error(`Github OAuth Login Error : ${error}`);
  };

  return (
    <>
      <div className='mt-8 flex items-center justify-between'>
        <div className='h-[1px] w-[80px] bg-brand-gray-4'></div>
        <p className='text-sm text-brand-gray-4'>소셜 계정으로 간편 로그인</p>
        <div className='h-[1px] w-[80px] bg-brand-gray-4'></div>
      </div>

      <ul className='mt-8 flex justify-center gap-3'>
        <img
          src={kakaoLogoImage}
          alt='KAKAO'
          onClick={handleKakaoLogin}
          className='h-[50px] w-[50px] cursor-pointer'
        />
        <img
          src={googleLogoImage}
          alt='GOOGLE'
          onClick={handleGoogleLogin}
          className='h-[50px] w-[50px] cursor-pointer'
        />
        <img
          src={githubLogoImage}
          alt='GITHUB'
          onClick={handleGithubLogin}
          className='h-[50px] w-[50px] cursor-pointer'
        />
      </ul>
    </>
  );
}

export default SocialLogin;
