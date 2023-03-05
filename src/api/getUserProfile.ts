import { supabase } from '../initSupabase';
import { Database } from '../../@types/supabase';

type Payload = Database['public']['Tables']['user_profile']['Row'];

export const getUserProfile = async (userId: string) => {
  return await supabase
    .from<'user_profile', Payload>('user_profile')
    .select()
    .eq('user_id', userId);
};
