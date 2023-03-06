export type Json =
  | string
  | number
  | boolean
  | null
  | unknown[]
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profile: {
        Row: {
          created_at: string | null;
          id: number;
          raw_profile_data: Tempo.IOwnerFormData | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          raw_profile_data?: Tempo.IOwnerFormData | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          raw_profile_data?: Tempo.IOwnerFormData | null;
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
