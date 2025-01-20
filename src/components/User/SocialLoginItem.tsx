import { Provider } from '@supabase/supabase-js';
import { ProviderType } from '../../types/oAuthProviderType';
import { signInWithOAuth } from '../../api/supabase/userService';

function SocialLoginItem({ provider }: { provider: ProviderType }) {
  const handleSocialLogin = async (providerName: Provider) => {
    signInWithOAuth(providerName);
  };

  return (
    <li>
      <img
        src={provider.src}
        alt={provider.alt}
        onClick={() => handleSocialLogin(provider.provider)}
        className='h-[50px] w-[50px] cursor-pointer'
      />
    </li>
  );
}

export default SocialLoginItem;
