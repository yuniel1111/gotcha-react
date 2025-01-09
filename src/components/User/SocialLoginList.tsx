import kakaoLogoImage from '../../assets/kakao_logo.png';
import googleLogoImage from '../../assets/google_logo.png';
import githubLogoImage from '../../assets/github_logo.png';
import SocialLoginItem from './SocialLoginItem';
import { ProviderType } from '../../types/oAuthProviderType';
import { v4 as uuid4 } from 'uuid';

const providers: ProviderType[] = [
  {
    provider: 'kakao',
    src: kakaoLogoImage,
    alt: 'KAKAO',
  },
  {
    provider: 'google',
    src: googleLogoImage,
    alt: 'GOOGLE',
  },
  {
    provider: 'github',
    src: githubLogoImage,
    alt: 'GITHUB',
  },
];

function SocialLoginList() {
  return (
    <>
      <div className='mt-8 flex items-center justify-between'>
        <div className='h-[1px] w-[80px] bg-brand-gray-4'></div>
        <p className='text-sm text-brand-gray-4'>소셜 계정으로 간편 로그인</p>
        <div className='h-[1px] w-[80px] bg-brand-gray-4'></div>
      </div>

      <ul className='mt-8 flex justify-center gap-3'>
        {providers.map((provider) => (
          <SocialLoginItem key={uuid4()} provider={provider} />
        ))}
      </ul>
    </>
  );
}

export default SocialLoginList;
