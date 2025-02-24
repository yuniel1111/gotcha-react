import { Provider } from '@supabase/supabase-js';

export interface ProviderType {
  provider: Provider;
  src: string;
  alt: string;
}
