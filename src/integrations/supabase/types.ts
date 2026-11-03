export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      account_access: {
        Row: {
          reason: string
          status: string
          updated_at: string
          updated_by: string | null
          user_id: string
        }
        Insert: {
          reason?: string
          status?: string
          updated_at?: string
          updated_by?: string | null
          user_id: string
        }
        Update: {
          reason?: string
          status?: string
          updated_at?: string
          updated_by?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "account_access_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_audit_log: {
        Row: {
          action: string
          actor_id: string | null
          after_state: Json
          before_state: Json
          created_at: string
          entity_id: string
          entity_type: string
          id: string
          outcome: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          after_state?: Json
          before_state?: Json
          created_at?: string
          entity_id: string
          entity_type: string
          id?: string
          outcome?: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          after_state?: Json
          before_state?: Json
          created_at?: string
          entity_id?: string
          entity_type?: string
          id?: string
          outcome?: string
        }
        Relationships: []
      }
      ai_recommendation_history: {
        Row: {
          created_at: string
          id: string
          recommendations: Json
          request: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          recommendations?: Json
          request: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          recommendations?: Json
          request?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_recommendation_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      business_profiles: {
        Row: {
          business_name: string
          business_type: string
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          business_name: string
          business_type?: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          business_name?: string
          business_type?: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      buyer_tool_sessions: {
        Row: {
          created_at: string
          id: string
          inputs: Json
          kind: string
          results: Json
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          inputs: Json
          kind: string
          results: Json
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          inputs?: Json
          kind?: string
          results?: Json
          user_id?: string
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          cart_id: string
          created_at: string
          id: string
          product_id: string
          quantity: number
        }
        Insert: {
          cart_id: string
          created_at?: string
          id?: string
          product_id: string
          quantity: number
        }
        Update: {
          cart_id?: string
          created_at?: string
          id?: string
          product_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "shopping_carts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      environmental_impact_records: {
        Row: {
          created_at: string
          id: string
          items_replaced: number
          methodology: string
          order_id: string | null
          plastic_avoided_g: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          items_replaced: number
          methodology: string
          order_id?: string | null
          plastic_avoided_g: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          items_replaced?: number
          methodology?: string
          order_id?: string | null
          plastic_avoided_g?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "environmental_impact_records_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "environmental_impact_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      green_points_ledger: {
        Row: {
          amount: number
          created_at: string
          id: string
          request_id: string | null
          source_key: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          request_id?: string | null
          source_key: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          request_id?: string | null
          source_key?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "green_points_ledger_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "recycling_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "green_points_ledger_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      green_supplier_consent: {
        Row: {
          approved: boolean
          supplier_id: string
          updated_at: string
        }
        Insert: {
          approved?: boolean
          supplier_id: string
          updated_at?: string
        }
        Update: {
          approved?: boolean
          supplier_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "green_supplier_consent_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: true
            referencedRelation: "supplier_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      green_vouchers: {
        Row: {
          admin_review: string
          expires_at: string
          id: string
          is_demo: boolean
          issued_at: string
          maximum_discount: number
          minimum_order: number
          percent: number
          source_key: string
          used_at: string | null
          used_order_id: string | null
          user_id: string
        }
        Insert: {
          admin_review?: string
          expires_at: string
          id?: string
          is_demo?: boolean
          issued_at?: string
          maximum_discount: number
          minimum_order?: number
          percent: number
          source_key: string
          used_at?: string | null
          used_order_id?: string | null
          user_id: string
        }
        Update: {
          admin_review?: string
          expires_at?: string
          id?: string
          is_demo?: boolean
          issued_at?: string
          maximum_discount?: number
          minimum_order?: number
          percent?: number
          source_key?: string
          used_at?: string | null
          used_order_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "green_vouchers_used_order_id_fkey"
            columns: ["used_order_id"]
            isOneToOne: true
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "green_vouchers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      group_buying_campaigns: {
        Row: {
          business_count: number
          closes_at: string
          committed_quantity: number
          created_at: string
          id: string
          lifecycle: string
          max_quantity: number
          normal_price: number
          product_id: string
          starts_at: string
          status: string
          supplier_id: string
          target_quantity: number
          title: string
          unit_price: number
        }
        Insert: {
          business_count?: number
          closes_at: string
          committed_quantity?: number
          created_at?: string
          id?: string
          lifecycle?: string
          max_quantity?: number
          normal_price?: number
          product_id: string
          starts_at?: string
          status?: string
          supplier_id: string
          target_quantity: number
          title: string
          unit_price: number
        }
        Update: {
          business_count?: number
          closes_at?: string
          committed_quantity?: number
          created_at?: string
          id?: string
          lifecycle?: string
          max_quantity?: number
          normal_price?: number
          product_id?: string
          starts_at?: string
          status?: string
          supplier_id?: string
          target_quantity?: number
          title?: string
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "group_buying_campaigns_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_buying_campaigns_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "supplier_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      group_buying_participants: {
        Row: {
          campaign_id: string
          commitment_status: string
          created_at: string
          delivery: Json
          id: string
          order_id: string | null
          quantity: number
          user_id: string
        }
        Insert: {
          campaign_id: string
          commitment_status?: string
          created_at?: string
          delivery?: Json
          id?: string
          order_id?: string | null
          quantity: number
          user_id: string
        }
        Update: {
          campaign_id?: string
          commitment_status?: string
          created_at?: string
          delivery?: Json
          id?: string
          order_id?: string | null
          quantity?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_buying_participants_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "group_buying_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_buying_participants_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_buying_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          name_ar: string
          name_en: string
          order_id: string
          pack_size: number
          price_unit: string
          product_id: string
          quantity: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          id?: string
          name_ar?: string
          name_en?: string
          order_id: string
          pack_size?: number
          price_unit?: string
          product_id: string
          quantity: number
          unit_price: number
        }
        Update: {
          created_at?: string
          id?: string
          name_ar?: string
          name_en?: string
          order_id?: string
          pack_size?: number
          price_unit?: string
          product_id?: string
          quantity?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          buyer_id: string
          campaign_id: string | null
          created_at: string
          delivery: Json
          green_discount: number
          green_voucher_id: string | null
          id: string
          is_demo: boolean
          request_key: string | null
          status: string
          supplier_id: string
          total: number
          updated_at: string
        }
        Insert: {
          buyer_id: string
          campaign_id?: string | null
          created_at?: string
          delivery?: Json
          green_discount?: number
          green_voucher_id?: string | null
          id?: string
          is_demo?: boolean
          request_key?: string | null
          status?: string
          supplier_id: string
          total: number
          updated_at?: string
        }
        Update: {
          buyer_id?: string
          campaign_id?: string | null
          created_at?: string
          delivery?: Json
          green_discount?: number
          green_voucher_id?: string | null
          id?: string
          is_demo?: boolean
          request_key?: string | null
          status?: string
          supplier_id?: string
          total?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "group_buying_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_green_voucher_id_fkey"
            columns: ["green_voucher_id"]
            isOneToOne: false
            referencedRelation: "green_vouchers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "supplier_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_settings: {
        Row: {
          announcement_ar: string
          announcement_en: string
          id: boolean
          support_email: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          announcement_ar?: string
          announcement_en?: string
          id?: boolean
          support_email?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          announcement_ar?: string
          announcement_en?: string
          id?: boolean
          support_email?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      product_categories: {
        Row: {
          created_at: string
          id: string
          name_ar: string
          name_en: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name_ar: string
          name_en: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name_ar?: string
          name_en?: string
          slug?: string
        }
        Relationships: []
      }
      product_documents: {
        Row: {
          file_name: string
          id: string
          product_id: string
          storage_path: string
        }
        Insert: {
          file_name: string
          id?: string
          product_id: string
          storage_path: string
        }
        Update: {
          file_name?: string
          id?: string
          product_id?: string
          storage_path?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_documents_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_images: {
        Row: {
          created_at: string
          id: string
          position: number
          product_id: string
          storage_path: string | null
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          position?: number
          product_id: string
          storage_path?: string | null
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          position?: number
          product_id?: string
          storage_path?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_sustainability_attributes: {
        Row: {
          attribute: string
          created_at: string
          id: string
          product_id: string
        }
        Insert: {
          attribute: string
          created_at?: string
          id?: string
          product_id: string
        }
        Update: {
          attribute?: string
          created_at?: string
          id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_sustainability_attributes_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category_id: string | null
          category_slug: string
          composition: string
          created_at: string
          description_ar: string
          description_en: string
          id: string
          is_demo: boolean
          material: string
          moq: number
          name_ar: string
          name_en: string
          non_plastic: boolean
          pack_size: number
          price: number
          price_unit: string
          sizes: string[]
          specs: Json
          status: string
          stock: number
          supplier_id: string
          updated_at: string
          volume_discounts: Json
        }
        Insert: {
          category_id?: string | null
          category_slug?: string
          composition?: string
          created_at?: string
          description_ar?: string
          description_en?: string
          id?: string
          is_demo?: boolean
          material?: string
          moq?: number
          name_ar?: string
          name_en: string
          non_plastic?: boolean
          pack_size?: number
          price: number
          price_unit?: string
          sizes?: string[]
          specs?: Json
          status?: string
          stock?: number
          supplier_id: string
          updated_at?: string
          volume_discounts?: Json
        }
        Update: {
          category_id?: string | null
          category_slug?: string
          composition?: string
          created_at?: string
          description_ar?: string
          description_en?: string
          id?: string
          is_demo?: boolean
          material?: string
          moq?: number
          name_ar?: string
          name_en?: string
          non_plastic?: boolean
          pack_size?: number
          price?: number
          price_unit?: string
          sizes?: string[]
          specs?: Json
          status?: string
          stock?: number
          supplier_id?: string
          updated_at?: string
          volume_discounts?: Json
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "supplier_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          city: string
          created_at: string
          full_name: string
          id: string
          phone: string
          updated_at: string
        }
        Insert: {
          city?: string
          created_at?: string
          full_name: string
          id: string
          phone?: string
          updated_at?: string
        }
        Update: {
          city?: string
          created_at?: string
          full_name?: string
          id?: string
          phone?: string
          updated_at?: string
        }
        Relationships: []
      }
      recycling_businesses: {
        Row: {
          approved: boolean
          public_ranking: boolean
          user_id: string
        }
        Insert: {
          approved?: boolean
          public_ranking?: boolean
          user_id: string
        }
        Update: {
          approved?: boolean
          public_ranking?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recycling_businesses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      recycling_files: {
        Row: {
          created_at: string
          file_name: string
          id: string
          kind: string
          request_id: string
          storage_path: string
          uploaded_by: string
        }
        Insert: {
          created_at?: string
          file_name: string
          id?: string
          kind: string
          request_id: string
          storage_path: string
          uploaded_by: string
        }
        Update: {
          created_at?: string
          file_name?: string
          id?: string
          kind?: string
          request_id?: string
          storage_path?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "recycling_files_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "recycling_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      recycling_months: {
        Row: {
          finalized_at: string
          finalized_by: string
          period: string
          results: Json
        }
        Insert: {
          finalized_at?: string
          finalized_by: string
          period: string
          results: Json
        }
        Update: {
          finalized_at?: string
          finalized_by?: string
          period?: string
          results?: Json
        }
        Relationships: []
      }
      recycling_partners: {
        Row: {
          approved: boolean
          company_name: string
          id: string
          operating_areas: string[]
          user_id: string
        }
        Insert: {
          approved?: boolean
          company_name: string
          id?: string
          operating_areas?: string[]
          user_id: string
        }
        Update: {
          approved?: boolean
          company_name?: string
          id?: string
          operating_areas?: string[]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recycling_partners_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      recycling_requests: {
        Row: {
          actual_weights: Json
          buyer_id: string
          city: string
          collected_at: string | null
          confirmed_recycled: boolean
          created_at: string
          estimated_weights: Json
          id: string
          location: string
          partner_id: string | null
          request_key: string
          scheduled_at: string | null
          status: string
          verified_at: string | null
          verified_by: string | null
          verified_kg: number
        }
        Insert: {
          actual_weights?: Json
          buyer_id: string
          city: string
          collected_at?: string | null
          confirmed_recycled?: boolean
          created_at?: string
          estimated_weights: Json
          id?: string
          location: string
          partner_id?: string | null
          request_key: string
          scheduled_at?: string | null
          status?: string
          verified_at?: string | null
          verified_by?: string | null
          verified_kg?: number
        }
        Update: {
          actual_weights?: Json
          buyer_id?: string
          city?: string
          collected_at?: string | null
          confirmed_recycled?: boolean
          created_at?: string
          estimated_weights?: Json
          id?: string
          location?: string
          partner_id?: string | null
          request_key?: string
          scheduled_at?: string | null
          status?: string
          verified_at?: string | null
          verified_by?: string | null
          verified_kg?: number
        }
        Relationships: [
          {
            foreignKeyName: "recycling_requests_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recycling_requests_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "recycling_partners"
            referencedColumns: ["id"]
          },
        ]
      }
      recycling_settings: {
        Row: {
          expiry_days: number
          id: boolean
          max_discount: number
          minimum_order: number
          points_per_kg: number
          rewards: Json
          winner_percents: number[]
        }
        Insert: {
          expiry_days?: number
          id?: boolean
          max_discount?: number
          minimum_order?: number
          points_per_kg?: number
          rewards?: Json
          winner_percents?: number[]
        }
        Update: {
          expiry_days?: number
          id?: boolean
          max_discount?: number
          minimum_order?: number
          points_per_kg?: number
          rewards?: Json
          winner_percents?: number[]
        }
        Relationships: []
      }
      saved_products: {
        Row: {
          created_at: string
          id: string
          product_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_products_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      shopping_carts: {
        Row: {
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shopping_carts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      supplier_profiles: {
        Row: {
          city: string
          company_name: string
          created_at: string
          description: string
          id: string
          is_demo: boolean
          updated_at: string
          user_id: string | null
          verification_status: string
        }
        Insert: {
          city?: string
          company_name: string
          created_at?: string
          description?: string
          id?: string
          is_demo?: boolean
          updated_at?: string
          user_id?: string | null
          verification_status?: string
        }
        Update: {
          city?: string
          company_name?: string
          created_at?: string
          description?: string
          id?: string
          is_demo?: boolean
          updated_at?: string
          user_id?: string | null
          verification_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "supplier_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      supplier_verification_documents: {
        Row: {
          created_at: string
          file_name: string
          id: string
          storage_path: string
          supplier_id: string
        }
        Insert: {
          created_at?: string
          file_name: string
          id?: string
          storage_path: string
          supplier_id: string
        }
        Update: {
          created_at?: string
          file_name?: string
          id?: string
          storage_path?: string
          supplier_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "supplier_verification_documents_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "supplier_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      supplier_verification_history: {
        Row: {
          admin_id: string
          created_at: string
          decision: string
          id: string
          supplier_id: string
        }
        Insert: {
          admin_id: string
          created_at?: string
          decision: string
          id?: string
          supplier_id: string
        }
        Update: {
          admin_id?: string
          created_at?: string
          decision?: string
          id?: string
          supplier_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "supplier_verification_history_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_verification_history_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "supplier_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      account_active: { Args: { uid: string }; Returns: boolean }
      admin_manage: { Args: { action: string; payload: Json }; Returns: Json }
      admin_session_allowed: { Args: never; Returns: boolean }
      admin_set_role: {
        Args: {
          chosen: Database["public"]["Enums"]["app_role"]
          target: string
        }
        Returns: undefined
      }
      admin_verify_supplier: {
        Args: { decision: string; supplier: string }
        Returns: undefined
      }
      change_order_status: {
        Args: { next_status: string; order_id: string }
        Returns: undefined
      }
      create_group_campaign: { Args: { payload: Json }; Returns: string }
      expire_group_campaigns: { Args: never; Returns: undefined }
      group_buyer_eligible: { Args: never; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      join_group_campaign: {
        Args: { address: Json; cid: string; qty: number }
        Returns: string
      }
      joined_group_campaign: { Args: { cid: string }; Returns: boolean }
      manage_group_campaign: {
        Args: { action: string; cid: string }
        Returns: string
      }
      market_unit_price: {
        Args: { base: number; qty: number; tiers: Json }
        Returns: number
      }
      owns_supplier: { Args: { sid: string }; Returns: boolean }
      public_product: { Args: { pid: string }; Returns: boolean }
      recycling_access: { Args: { rid: string }; Returns: boolean }
      recycling_action: {
        Args: { action: string; payload: Json }
        Returns: Json
      }
      recycling_public_board: { Args: never; Returns: Json }
      recycling_rankings: { Args: { month_start: string }; Returns: Json }
      recycling_weights: { Args: { w: Json }; Returns: number }
      release_group_campaign: {
        Args: { cid: string; final_state: string }
        Returns: undefined
      }
      request_cart_order: {
        Args: { address: Json; request_id: string }
        Returns: string[]
      }
    }
    Enums: {
      app_role: "buyer" | "supplier" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["buyer", "supplier", "admin"],
    },
  },
} as const
