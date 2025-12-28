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
      profiles: {
        Row: {
          id: string
          email: string
          name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      entitlements: {
        Row: {
          id: string
          user_id: string
          type: 'credits' | 'pass' | 'subscription'
          credits_remaining: number
          expires_at: string | null
          stripe_subscription_id: string | null
          stripe_customer_id: string | null
          plan_name: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'credits' | 'pass' | 'subscription'
          credits_remaining?: number
          expires_at?: string | null
          stripe_subscription_id?: string | null
          stripe_customer_id?: string | null
          plan_name: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'credits' | 'pass' | 'subscription'
          credits_remaining?: number
          expires_at?: string | null
          stripe_subscription_id?: string | null
          stripe_customer_id?: string | null
          plan_name?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      reports: {
        Row: {
          id: string
          user_id: string
          vin: string
          license_plate: string | null
          license_state: string | null
          report_data: Json | null
          status: 'pending' | 'completed' | 'failed'
          error_message: string | null
          entitlement_id: string | null
          source: string
          created_at: string
          expires_at: string
        }
        Insert: {
          id?: string
          user_id: string
          vin: string
          license_plate?: string | null
          license_state?: string | null
          report_data?: Json | null
          status?: 'pending' | 'completed' | 'failed'
          error_message?: string | null
          entitlement_id?: string | null
          source?: string
          created_at?: string
          expires_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          vin?: string
          license_plate?: string | null
          license_state?: string | null
          report_data?: Json | null
          status?: 'pending' | 'completed' | 'failed'
          error_message?: string | null
          entitlement_id?: string | null
          source?: string
          created_at?: string
          expires_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          stripe_event_id: string
          stripe_payment_intent_id: string | null
          stripe_checkout_session_id: string | null
          user_id: string | null
          amount: number
          currency: string
          status: 'pending' | 'completed' | 'failed' | 'refunded'
          plan_name: string | null
          entitlement_id: string | null
          metadata: Json
          processed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          stripe_event_id: string
          stripe_payment_intent_id?: string | null
          stripe_checkout_session_id?: string | null
          user_id?: string | null
          amount: number
          currency?: string
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          plan_name?: string | null
          entitlement_id?: string | null
          metadata?: Json
          processed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          stripe_event_id?: string
          stripe_payment_intent_id?: string | null
          stripe_checkout_session_id?: string | null
          user_id?: string | null
          amount?: number
          currency?: string
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          plan_name?: string | null
          entitlement_id?: string | null
          metadata?: Json
          processed_at?: string | null
          created_at?: string
        }
      }
      rate_limit_events: {
        Row: {
          id: string
          user_id: string | null
          ip_address: string | null
          endpoint: string
          blocked: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          ip_address?: string | null
          endpoint: string
          blocked?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          ip_address?: string | null
          endpoint?: string
          blocked?: boolean
          created_at?: string
        }
      }
    }
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Entitlement = Database['public']['Tables']['entitlements']['Row']
export type Report = Database['public']['Tables']['reports']['Row']
export type Transaction = Database['public']['Tables']['transactions']['Row']
