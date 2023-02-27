import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

const CLIENT_URL = "https://mxaadvyrpqdbrpmyxgvy.supabase.co";
const CLIENT_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14YWFkdnlycHFkYnJwbXl4Z3Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY4NTQ5NzUsImV4cCI6MTk5MjQzMDk3NX0.Dc6e0d3ZewDZ-tpZ3msDPtVYDk3e_tMgeGlBgIfAkg4";

// Better put your these secret keys in .env file
export const supabase = createClient(CLIENT_URL, CLIENT_KEY, {
  auth: {
    detectSessionInUrl: false,
    storage: AsyncStorage,
  },
});
