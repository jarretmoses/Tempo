import { supabase } from "../initSupabase";
import { Database } from "../../@types/supabase";

type CreateProfileReturnType = Awaited<ReturnType<typeof updateUserProfile>>;
export type CreateProfileResponseSuccess = CreateProfileReturnType["data"];
export type CreateProfileResponseError = CreateProfileReturnType["error"];

type Payload =
  Database["public"]["Tables"]["user_profile"]["Insert"]["raw_profile_data"];
interface IUpdateUserProfile {
  userId: string;
  payload: Payload;
}

export const updateUserProfile = async ({
  userId,
  payload,
}: IUpdateUserProfile) => {
  return await supabase
    .from("user_profile")
    .update(payload)
    .eq("user_id", userId);
};