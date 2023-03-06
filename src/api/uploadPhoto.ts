import cuid from 'cuid';
import { supabase } from '../initSupabase';

interface IImageUpload {
  userId: string;
  photoUrl: string;
}

export const uploadPhoto = async ({ photoUrl, userId }: IImageUpload) => {
  await supabase.storage
    .from('images')
    .upload(`${cuid()}-${userId}`, photoUrl, {
      cacheControl: '3600',
      upsert: false,
    });
};
