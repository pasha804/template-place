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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          entity: string
          entity_id: string | null
          id: string
          metadata: Json
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          entity: string
          entity_id?: string | null
          id?: string
          metadata?: Json
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          entity?: string
          entity_id?: string | null
          id?: string
          metadata?: Json
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_name: string
          body: string
          cover_url: string | null
          created_at: string
          deleted_at: string | null
          excerpt: string
          id: string
          is_published: boolean
          published_at: string | null
          slug: string
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          author_name?: string
          body?: string
          cover_url?: string | null
          created_at?: string
          deleted_at?: string | null
          excerpt?: string
          id?: string
          is_published?: boolean
          published_at?: string | null
          slug: string
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          author_name?: string
          body?: string
          cover_url?: string | null
          created_at?: string
          deleted_at?: string | null
          excerpt?: string
          id?: string
          is_published?: boolean
          published_at?: string | null
          slug?: string
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          accent: string | null
          created_at: string
          deleted_at: string | null
          description: string
          icon: string | null
          id: string
          is_active: boolean
          name: string
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          accent?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string
          icon?: string | null
          id?: string
          is_active?: boolean
          name: string
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          accent?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string
          icon?: string | null
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      cms_blocks: {
        Row: {
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      coupons: {
        Row: {
          amount_off_cents: number | null
          code: string
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean
          max_redemptions: number | null
          percent_off: number | null
          redeemed_count: number
          updated_at: string
        }
        Insert: {
          amount_off_cents?: number | null
          code: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_redemptions?: number | null
          percent_off?: number | null
          redeemed_count?: number
          updated_at?: string
        }
        Update: {
          amount_off_cents?: number | null
          code?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_redemptions?: number | null
          percent_off?: number | null
          redeemed_count?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_templates: {
        Row: {
          body_html: string
          id: string
          key: string
          subject: string
          updated_at: string
        }
        Insert: {
          body_html: string
          id?: string
          key: string
          subject: string
          updated_at?: string
        }
        Update: {
          body_html?: string
          id?: string
          key?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string
          id: string
          template_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          template_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          template_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      feature_flags: {
        Row: {
          description: string
          id: string
          is_enabled: boolean
          key: string
          updated_at: string
        }
        Insert: {
          description?: string
          id?: string
          is_enabled?: boolean
          key: string
          updated_at?: string
        }
        Update: {
          description?: string
          id?: string
          is_enabled?: boolean
          key?: string
          updated_at?: string
        }
        Relationships: []
      }
      invoices: {
        Row: {
          amount_cents: number
          currency: string
          id: string
          issued_at: string
          number: string
          order_id: string | null
          pdf_url: string | null
          user_id: string
        }
        Insert: {
          amount_cents?: number
          currency?: string
          id?: string
          issued_at?: string
          number: string
          order_id?: string | null
          pdf_url?: string | null
          user_id: string
        }
        Update: {
          amount_cents?: number
          currency?: string
          id?: string
          issued_at?: string
          number?: string
          order_id?: string | null
          pdf_url?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string
          created_at: string
          id: string
          kind: string
          link: string | null
          read_at: string | null
          title: string
          user_id: string
        }
        Insert: {
          body?: string
          created_at?: string
          id?: string
          kind?: string
          link?: string | null
          read_at?: string | null
          title: string
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          kind?: string
          link?: string | null
          read_at?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          label: string
          order_id: string
          page_id: string | null
          quantity: number
          template_id: string | null
          unit_price_cents: number
        }
        Insert: {
          created_at?: string
          id?: string
          label: string
          order_id: string
          page_id?: string | null
          quantity?: number
          template_id?: string | null
          unit_price_cents?: number
        }
        Update: {
          created_at?: string
          id?: string
          label?: string
          order_id?: string
          page_id?: string | null
          quantity?: number
          template_id?: string | null
          unit_price_cents?: number
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
            foreignKeyName: "order_items_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          coupon_id: string | null
          created_at: string
          currency: string
          discount_cents: number
          id: string
          paid_at: string | null
          plan_kind: Database["public"]["Enums"]["plan_kind"]
          provider: string | null
          provider_session_id: string | null
          reference: string
          status: Database["public"]["Enums"]["order_status"]
          subtotal_cents: number
          total_cents: number
          updated_at: string
          user_id: string
        }
        Insert: {
          coupon_id?: string | null
          created_at?: string
          currency?: string
          discount_cents?: number
          id?: string
          paid_at?: string | null
          plan_kind?: Database["public"]["Enums"]["plan_kind"]
          provider?: string | null
          provider_session_id?: string | null
          reference?: string
          status?: Database["public"]["Enums"]["order_status"]
          subtotal_cents?: number
          total_cents?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          coupon_id?: string | null
          created_at?: string
          currency?: string
          discount_cents?: number
          id?: string
          paid_at?: string | null
          plan_kind?: Database["public"]["Enums"]["plan_kind"]
          provider?: string | null
          provider_session_id?: string | null
          reference?: string
          status?: Database["public"]["Enums"]["order_status"]
          subtotal_cents?: number
          total_cents?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_coupon_id_fkey"
            columns: ["coupon_id"]
            isOneToOne: false
            referencedRelation: "coupons"
            referencedColumns: ["id"]
          },
        ]
      }
      page_versions: {
        Row: {
          created_at: string
          id: string
          label: string | null
          page_id: string
          snapshot: Json
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          label?: string | null
          page_id: string
          snapshot: Json
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          label?: string | null
          page_id?: string
          snapshot?: Json
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "page_versions_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      page_views: {
        Row: {
          browser: string | null
          country: string | null
          created_at: string
          device: string | null
          id: string
          page_id: string
          referrer: string | null
          visitor_hash: string | null
        }
        Insert: {
          browser?: string | null
          country?: string | null
          created_at?: string
          device?: string | null
          id?: string
          page_id: string
          referrer?: string | null
          visitor_hash?: string | null
        }
        Update: {
          browser?: string | null
          country?: string | null
          created_at?: string
          device?: string | null
          id?: string
          page_id?: string
          referrer?: string | null
          visitor_hash?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "page_views_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      pages: {
        Row: {
          blocks: Json
          content: Json
          created_at: string
          deleted_at: string | null
          expires_at: string | null
          id: string
          is_public: boolean
          og_image_url: string | null
          password_hash: string | null
          pin_code: string | null
          published_at: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: Database["public"]["Enums"]["page_status"]
          template_id: string
          theme: Json
          title: string
          updated_at: string
          user_id: string
          view_count: number
        }
        Insert: {
          blocks?: Json
          content?: Json
          created_at?: string
          deleted_at?: string | null
          expires_at?: string | null
          id?: string
          is_public?: boolean
          og_image_url?: string | null
          password_hash?: string | null
          pin_code?: string | null
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: Database["public"]["Enums"]["page_status"]
          template_id: string
          theme?: Json
          title?: string
          updated_at?: string
          user_id: string
          view_count?: number
        }
        Update: {
          blocks?: Json
          content?: Json
          created_at?: string
          deleted_at?: string | null
          expires_at?: string | null
          id?: string
          is_public?: boolean
          og_image_url?: string | null
          password_hash?: string | null
          pin_code?: string | null
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["page_status"]
          template_id?: string
          theme?: Json
          title?: string
          updated_at?: string
          user_id?: string
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "pages_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      permissions: {
        Row: {
          description: string
          id: string
          key: string
        }
        Insert: {
          description?: string
          id?: string
          key: string
        }
        Update: {
          description?: string
          id?: string
          key?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          country: string | null
          created_at: string
          deleted_at: string | null
          email: string | null
          full_name: string | null
          id: string
          locale: string
          marketing_opt_in: boolean
          storage_quota_bytes: number
          storage_used_bytes: number
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          country?: string | null
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          locale?: string
          marketing_opt_in?: boolean
          storage_quota_bytes?: number
          storage_used_bytes?: number
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          country?: string | null
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          locale?: string
          marketing_opt_in?: boolean
          storage_quota_bytes?: number
          storage_used_bytes?: number
          updated_at?: string
        }
        Relationships: []
      }
      recently_viewed: {
        Row: {
          id: string
          template_id: string
          user_id: string
          viewed_at: string
        }
        Insert: {
          id?: string
          template_id: string
          user_id: string
          viewed_at?: string
        }
        Update: {
          id?: string
          template_id?: string
          user_id?: string
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "recently_viewed_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          body: string
          created_at: string
          id: string
          rating: number
          status: Database["public"]["Enums"]["review_status"]
          template_id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          body?: string
          created_at?: string
          id?: string
          rating: number
          status?: Database["public"]["Enums"]["review_status"]
          template_id: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          rating?: number
          status?: Database["public"]["Enums"]["review_status"]
          template_id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          id: string
          permission_id: string
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          id?: string
          permission_id: string
          role: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          id?: string
          permission_id?: string
          role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      storage_objects: {
        Row: {
          created_at: string
          id: string
          mime_type: string
          page_id: string | null
          path: string
          size_bytes: number
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          mime_type: string
          page_id?: string | null
          path: string
          size_bytes?: number
          url: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          mime_type?: string
          page_id?: string | null
          path?: string
          size_bytes?: number
          url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "storage_objects_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          id: string
          pages_allowance: number
          plan_kind: Database["public"]["Enums"]["plan_kind"]
          plan_name: string
          provider_subscription_id: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          id?: string
          pages_allowance?: number
          plan_kind: Database["public"]["Enums"]["plan_kind"]
          plan_name: string
          provider_subscription_id?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          id?: string
          pages_allowance?: number
          plan_kind?: Database["public"]["Enums"]["plan_kind"]
          plan_name?: string
          provider_subscription_id?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          status: Database["public"]["Enums"]["ticket_status"]
          subject: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          status?: Database["public"]["Enums"]["ticket_status"]
          subject: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          status?: Database["public"]["Enums"]["ticket_status"]
          subject?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      template_media: {
        Row: {
          alt: string
          created_at: string
          id: string
          kind: string
          sort_order: number
          template_id: string
          url: string
        }
        Insert: {
          alt?: string
          created_at?: string
          id?: string
          kind?: string
          sort_order?: number
          template_id: string
          url: string
        }
        Update: {
          alt?: string
          created_at?: string
          id?: string
          kind?: string
          sort_order?: number
          template_id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "template_media_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      templates: {
        Row: {
          category_id: string | null
          cover_url: string | null
          created_at: string
          deleted_at: string | null
          description: string
          id: string
          is_featured: boolean
          is_premium: boolean
          is_published: boolean
          name: string
          plan_kind: Database["public"]["Enums"]["plan_kind"]
          plugin_id: string
          preview_video_url: string | null
          price_cents: number
          rating_avg: number
          rating_count: number
          slug: string
          sort_order: number
          tagline: string
          tags: string[]
          updated_at: string
          uses_count: number
          views_count: number
        }
        Insert: {
          category_id?: string | null
          cover_url?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string
          id?: string
          is_featured?: boolean
          is_premium?: boolean
          is_published?: boolean
          name: string
          plan_kind?: Database["public"]["Enums"]["plan_kind"]
          plugin_id: string
          preview_video_url?: string | null
          price_cents?: number
          rating_avg?: number
          rating_count?: number
          slug: string
          sort_order?: number
          tagline?: string
          tags?: string[]
          updated_at?: string
          uses_count?: number
          views_count?: number
        }
        Update: {
          category_id?: string | null
          cover_url?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string
          id?: string
          is_featured?: boolean
          is_premium?: boolean
          is_published?: boolean
          name?: string
          plan_kind?: Database["public"]["Enums"]["plan_kind"]
          plugin_id?: string
          preview_video_url?: string | null
          price_cents?: number
          rating_avg?: number
          rating_count?: number
          slug?: string
          sort_order?: number
          tagline?: string
          tags?: string[]
          updated_at?: string
          uses_count?: number
          views_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "templates_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_messages: {
        Row: {
          author_id: string | null
          body: string
          created_at: string
          id: string
          ticket_id: string
        }
        Insert: {
          author_id?: string | null
          body: string
          created_at?: string
          id?: string
          ticket_id: string
        }
        Update: {
          author_id?: string | null
          body?: string
          created_at?: string
          id?: string
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          granted_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          granted_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          granted_at?: string
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
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "moderator" | "support" | "user"
      order_status: "pending" | "paid" | "failed" | "refunded" | "cancelled"
      page_status: "draft" | "published" | "expired" | "archived" | "pending_approval"
      plan_kind: "free" | "one_time" | "monthly" | "yearly"
      review_status: "pending" | "approved" | "rejected"
      ticket_status: "open" | "pending" | "resolved" | "closed"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
      app_role: ["admin", "moderator", "support", "user"],
      order_status: ["pending", "paid", "failed", "refunded", "cancelled"],
      page_status: ["draft", "published", "expired", "archived"],
      plan_kind: ["free", "one_time", "monthly", "yearly"],
      review_status: ["pending", "approved", "rejected"],
      ticket_status: ["open", "pending", "resolved", "closed"],
    },
  },
} as const
