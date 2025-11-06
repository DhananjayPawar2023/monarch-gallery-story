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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      artist_interviews: {
        Row: {
          artist_id: string
          audio_title: string | null
          audio_url: string | null
          content: string
          cover_image_url: string | null
          created_at: string
          created_by: string
          excerpt: string
          featured: boolean
          id: string
          interview_date: string
          slug: string
          status: string
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          artist_id: string
          audio_title?: string | null
          audio_url?: string | null
          content: string
          cover_image_url?: string | null
          created_at?: string
          created_by: string
          excerpt: string
          featured?: boolean
          id?: string
          interview_date?: string
          slug: string
          status?: string
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          artist_id?: string
          audio_title?: string | null
          audio_url?: string | null
          content?: string
          cover_image_url?: string | null
          created_at?: string
          created_by?: string
          excerpt?: string
          featured?: boolean
          id?: string
          interview_date?: string
          slug?: string
          status?: string
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "artist_interviews_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
        ]
      }
      artists: {
        Row: {
          audio_title: string | null
          audio_url: string | null
          bio: string
          cover_image_url: string | null
          created_at: string
          created_by: string
          id: string
          image_url: string
          instagram: string | null
          location: string | null
          name: string
          quote: string | null
          short_bio: string | null
          specialization: string | null
          twitter: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          audio_title?: string | null
          audio_url?: string | null
          bio: string
          cover_image_url?: string | null
          created_at?: string
          created_by: string
          id?: string
          image_url: string
          instagram?: string | null
          location?: string | null
          name: string
          quote?: string | null
          short_bio?: string | null
          specialization?: string | null
          twitter?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          audio_title?: string | null
          audio_url?: string | null
          bio?: string
          cover_image_url?: string | null
          created_at?: string
          created_by?: string
          id?: string
          image_url?: string
          instagram?: string | null
          location?: string | null
          name?: string
          quote?: string | null
          short_bio?: string | null
          specialization?: string | null
          twitter?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      artworks: {
        Row: {
          artist_id: string
          audio_title: string | null
          audio_url: string | null
          collection_id: string | null
          created_at: string
          created_by: string
          description: string
          dimensions: string | null
          edition: string
          featured: boolean
          id: string
          image_url: string
          medium: string
          price: string | null
          story: string
          title: string
          updated_at: string
          video_url: string | null
          year: number
        }
        Insert: {
          artist_id: string
          audio_title?: string | null
          audio_url?: string | null
          collection_id?: string | null
          created_at?: string
          created_by: string
          description: string
          dimensions?: string | null
          edition: string
          featured?: boolean
          id?: string
          image_url: string
          medium: string
          price?: string | null
          story: string
          title: string
          updated_at?: string
          video_url?: string | null
          year: number
        }
        Update: {
          artist_id?: string
          audio_title?: string | null
          audio_url?: string | null
          collection_id?: string | null
          created_at?: string
          created_by?: string
          description?: string
          dimensions?: string | null
          edition?: string
          featured?: boolean
          id?: string
          image_url?: string
          medium?: string
          price?: string | null
          story?: string
          title?: string
          updated_at?: string
          video_url?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "artworks_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artworks_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
        ]
      }
      collections: {
        Row: {
          audio_title: string | null
          audio_url: string | null
          cover_image_url: string | null
          created_at: string
          created_by: string
          curator_statement: string
          description: string
          id: string
          name: string
          release_date: string
          status: string
          updated_at: string
        }
        Insert: {
          audio_title?: string | null
          audio_url?: string | null
          cover_image_url?: string | null
          created_at?: string
          created_by: string
          curator_statement: string
          description: string
          id?: string
          name: string
          release_date: string
          status?: string
          updated_at?: string
        }
        Update: {
          audio_title?: string | null
          audio_url?: string | null
          cover_image_url?: string | null
          created_at?: string
          created_by?: string
          curator_statement?: string
          description?: string
          id?: string
          name?: string
          release_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      collectors: {
        Row: {
          bio: string
          collection_focus: string | null
          created_at: string
          created_by: string
          featured: boolean
          id: string
          image_url: string
          instagram: string | null
          location: string | null
          name: string
          updated_at: string
          website: string | null
        }
        Insert: {
          bio: string
          collection_focus?: string | null
          created_at?: string
          created_by: string
          featured?: boolean
          id?: string
          image_url: string
          instagram?: string | null
          location?: string | null
          name: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          bio?: string
          collection_focus?: string | null
          created_at?: string
          created_by?: string
          featured?: boolean
          id?: string
          image_url?: string
          instagram?: string | null
          location?: string | null
          name?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      exhibition_artworks: {
        Row: {
          artwork_id: string
          display_order: number | null
          exhibition_id: string
          id: string
        }
        Insert: {
          artwork_id: string
          display_order?: number | null
          exhibition_id: string
          id?: string
        }
        Update: {
          artwork_id?: string
          display_order?: number | null
          exhibition_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exhibition_artworks_artwork_id_fkey"
            columns: ["artwork_id"]
            isOneToOne: false
            referencedRelation: "artworks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exhibition_artworks_exhibition_id_fkey"
            columns: ["exhibition_id"]
            isOneToOne: false
            referencedRelation: "exhibitions"
            referencedColumns: ["id"]
          },
        ]
      }
      exhibitions: {
        Row: {
          cover_image_url: string | null
          created_at: string
          created_by: string
          curator_statement: string
          description: string
          end_date: string
          featured: boolean
          id: string
          slug: string
          start_date: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          cover_image_url?: string | null
          created_at?: string
          created_by: string
          curator_statement: string
          description: string
          end_date: string
          featured?: boolean
          id?: string
          slug: string
          start_date: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          cover_image_url?: string | null
          created_at?: string
          created_by?: string
          curator_statement?: string
          description?: string
          end_date?: string
          featured?: boolean
          id?: string
          slug?: string
          start_date?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      journal_entries: {
        Row: {
          author: string
          category: string
          content: string
          cover_image_url: string | null
          created_at: string
          created_by: string
          excerpt: string
          featured: boolean
          id: string
          published_date: string
          read_time: string
          slug: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          author?: string
          category: string
          content: string
          cover_image_url?: string | null
          created_at?: string
          created_by: string
          excerpt: string
          featured?: boolean
          id?: string
          published_date?: string
          read_time: string
          slug: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          category?: string
          content?: string
          cover_image_url?: string | null
          created_at?: string
          created_by?: string
          excerpt?: string
          featured?: boolean
          id?: string
          published_date?: string
          read_time?: string
          slug?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          name: string | null
          preferences: Json | null
          status: string
          subscribed_at: string
        }
        Insert: {
          email: string
          id?: string
          name?: string | null
          preferences?: Json | null
          status?: string
          subscribed_at?: string
        }
        Update: {
          email?: string
          id?: string
          name?: string | null
          preferences?: Json | null
          status?: string
          subscribed_at?: string
        }
        Relationships: []
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
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
      app_role: ["admin", "user"],
    },
  },
} as const
