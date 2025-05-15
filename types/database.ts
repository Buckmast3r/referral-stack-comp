export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          username: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string
          updated_at: string
          last_login_at: string | null
          account_status: string
          email_verified: boolean
          subscription_tier: string
          subscription_expires_at: string | null
          stripe_customer_id: string | null
        }
        Insert: {
          id?: string
          email: string
          username: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
          last_login_at?: string | null
          account_status?: string
          email_verified?: boolean
          subscription_tier?: string
          subscription_expires_at?: string | null
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          email?: string
          username?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
          last_login_at?: string | null
          account_status?: string
          email_verified?: boolean
          subscription_tier?: string
          subscription_expires_at?: string | null
          stripe_customer_id?: string | null
        }
      }
      referrals: {
        Row: {
          id: string
          user_id: string
          name: string
          category: string
          url: string
          custom_slug: string | null
          logo_color: string
          status: string
          created_at: string
          updated_at: string
          is_featured: boolean
          display_order: number | null
          description: string | null
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          category: string
          url: string
          custom_slug?: string | null
          logo_color: string
          status?: string
          created_at?: string
          updated_at?: string
          is_featured?: boolean
          display_order?: number | null
          description?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          category?: string
          url?: string
          custom_slug?: string | null
          logo_color?: string
          status?: string
          created_at?: string
          updated_at?: string
          is_featured?: boolean
          display_order?: number | null
          description?: string | null
        }
      }
      clicks: {
        Row: {
          id: string
          referral_id: string
          clicked_at: string
          ip_address: string | null
          user_agent: string | null
          referer_url: string | null
          country_code: string | null
          region: string | null
          city: string | null
          device_type: string | null
          browser: string | null
          os: string | null
        }
        Insert: {
          id?: string
          referral_id: string
          clicked_at?: string
          ip_address?: string | null
          user_agent?: string | null
          referer_url?: string | null
          country_code?: string | null
          region?: string | null
          city?: string | null
          device_type?: string | null
          browser?: string | null
          os?: string | null
        }
        Update: {
          id?: string
          referral_id?: string
          clicked_at?: string
          ip_address?: string | null
          user_agent?: string | null
          referer_url?: string | null
          country_code?: string | null
          region?: string | null
          city?: string | null
          device_type?: string | null
          browser?: string | null
          os?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          display_name: string
          color_code: string
          icon_name: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          display_name: string
          color_code: string
          icon_name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          display_name?: string
          color_code?: string
          icon_name?: string | null
          created_at?: string
        }
      }
      user_settings: {
        Row: {
          user_id: string
          public_profile: boolean
          default_logo_color: string
          custom_domain: string | null
          white_labeling: boolean
          api_access: boolean
          auto_expiring_links: boolean
          notification_preferences: Json | null
          theme_preferences: Json | null
        }
        Insert: {
          user_id: string
          public_profile?: boolean
          default_logo_color?: string
          custom_domain?: string | null
          white_labeling?: boolean
          api_access?: boolean
          auto_expiring_links?: boolean
          notification_preferences?: Json | null
          theme_preferences?: Json | null
        }
        Update: {
          user_id?: string
          public_profile?: boolean
          default_logo_color?: string
          custom_domain?: string | null
          white_labeling?: boolean
          api_access?: boolean
          auto_expiring_links?: boolean
          notification_preferences?: Json | null
          theme_preferences?: Json | null
        }
      }
      api_keys: {
        Row: {
          id: string
          user_id: string
          key_name: string
          api_key: string
          created_at: string
          last_used_at: string | null
          expires_at: string | null
          is_active: boolean
          permissions: Json | null
        }
        Insert: {
          id?: string
          user_id: string
          key_name: string
          api_key: string
          created_at?: string
          last_used_at?: string | null
          expires_at?: string | null
          is_active?: boolean
          permissions?: Json | null
        }
        Update: {
          id?: string
          user_id?: string
          key_name?: string
          api_key?: string
          created_at?: string
          last_used_at?: string | null
          expires_at?: string | null
          is_active?: boolean
          permissions?: Json | null
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan_id: string
          status: string
          current_period_start: string
          current_period_end: string
          cancel_at_period_end: boolean
          payment_provider: string
          payment_provider_subscription_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_id: string
          status: string
          current_period_start: string
          current_period_end: string
          cancel_at_period_end?: boolean
          payment_provider: string
          payment_provider_subscription_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_id?: string
          status?: string
          current_period_start?: string
          current_period_end?: string
          cancel_at_period_end?: boolean
          payment_provider?: string
          payment_provider_subscription_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      add_ons: {
        Row: {
          id: string
          user_id: string
          add_on_type: string
          status: string
          current_period_start: string
          current_period_end: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          add_on_type: string
          status: string
          current_period_start: string
          current_period_end: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          add_on_type?: string
          status?: string
          current_period_start?: string
          current_period_end?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Functions: {
      get_clicks_by_day: {
        Args: {
          user_id_param: string
          start_date_param: string
        }
        Returns: {
          day: string
          count: number
        }[]
      }
    }
  }
}
