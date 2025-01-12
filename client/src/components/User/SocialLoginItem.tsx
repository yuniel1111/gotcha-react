import { Provider } from '@supabase/supabase-js';
import { supabase } from '../../api/supabase/supabaseClient';
import { ProviderType } from '../../types/oAuthProviderType';

function SocialLoginItem({ provider }: { provider: ProviderType }) {
  const handleSocialLogin = async (providerName: Provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: providerName,
      options: {
        redirectTo: 'http://localhost:5173/',
      },
    });

    if (error) throw new Error(`${providerName} OAuth Login Error : ${error}`);
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
