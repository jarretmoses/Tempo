export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      user_profile: {
        Row: {
          created_at: string | null;
          id: number;
          raw_profile_data: Json | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          raw_profile_data?: Json | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          raw_profile_data?: Json | null;
          user_id?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
