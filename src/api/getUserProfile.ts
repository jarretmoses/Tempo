import { supabase } from '../initSupabase';
import { Database } from '../../@types/supabase';

type Payload = Database['public']['Tables']['profile']['Row'];

export const getUserProfile = async (userId: string) => {
  return await supabase
    .from<'profile', Payload>('profile')
    .select()
    .eq('user_id', userId);
};
