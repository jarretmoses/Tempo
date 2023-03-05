import { supabase } from "../initSupabase";

type CreateProfileReturnType = Awaited<ReturnType<typeof createUserProfile>>;
export type CreateProfileResponseSuccess = CreateProfileReturnType["data"];
export type CreateProfileResponseError = CreateProfileReturnType["error"];

export const createUserProfile = async (userId: string) => {
  return await supabase.from("user_profile").insert({
    user_id: userId,
  });
};
