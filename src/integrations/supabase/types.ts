export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      badges: {
        Row: {
          color: string
          created_at: string
          criteria: Json
          description: string
          icon: string
          id: string
          name: string
        }
        Insert: {
          color?: string
          created_at?: string
          criteria?: Json
          description: string
          icon: string
          id?: string
          name: string
        }
        Update: {
          color?: string
          created_at?: string
          criteria?: Json
          description?: string
          icon?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      checkpoints: {
        Row: {
          checkpoint_type: string
          created_at: string | null
          description: string | null
          id: string
          order_index: number
          rewards: Json | null
          title: string
          unit_id: string
          unlock_requirements: Json
        }
        Insert: {
          checkpoint_type?: string
          created_at?: string | null
          description?: string | null
          id?: string
          order_index: number
          rewards?: Json | null
          title: string
          unit_id: string
          unlock_requirements?: Json
        }
        Update: {
          checkpoint_type?: string
          created_at?: string | null
          description?: string | null
          id?: string
          order_index?: number
          rewards?: Json | null
          title?: string
          unit_id?: string
          unlock_requirements?: Json
        }
        Relationships: [
          {
            foreignKeyName: "checkpoints_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          age_group: Database["public"]["Enums"]["age_group"]
          created_at: string
          description: string
          difficulty: string
          duration_weeks: number
          id: string
          image_url: string | null
          is_featured: boolean
          title: string
          total_lessons: number
          updated_at: string
        }
        Insert: {
          age_group: Database["public"]["Enums"]["age_group"]
          created_at?: string
          description: string
          difficulty?: string
          duration_weeks?: number
          id?: string
          image_url?: string | null
          is_featured?: boolean
          title: string
          total_lessons?: number
          updated_at?: string
        }
        Update: {
          age_group?: Database["public"]["Enums"]["age_group"]
          created_at?: string
          description?: string
          difficulty?: string
          duration_weeks?: number
          id?: string
          image_url?: string | null
          is_featured?: boolean
          title?: string
          total_lessons?: number
          updated_at?: string
        }
        Relationships: []
      }
      daily_quests: {
        Row: {
          age_group: Database["public"]["Enums"]["age_group"] | null
          created_at: string
          description: string
          heart_gems_reward: number
          icon: string
          id: string
          is_active: boolean
          quest_type: string
          title: string
        }
        Insert: {
          age_group?: Database["public"]["Enums"]["age_group"] | null
          created_at?: string
          description: string
          heart_gems_reward?: number
          icon: string
          id?: string
          is_active?: boolean
          quest_type: string
          title: string
        }
        Update: {
          age_group?: Database["public"]["Enums"]["age_group"] | null
          created_at?: string
          description?: string
          heart_gems_reward?: number
          icon?: string
          id?: string
          is_active?: boolean
          quest_type?: string
          title?: string
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          child_id: string
          completed_at: string | null
          course_id: string
          created_at: string
          current_lesson_id: string | null
          enrolled_by: string | null
          id: string
          progress_percentage: number
          updated_at: string
        }
        Insert: {
          child_id: string
          completed_at?: string | null
          course_id: string
          created_at?: string
          current_lesson_id?: string | null
          enrolled_by?: string | null
          id?: string
          progress_percentage?: number
          updated_at?: string
        }
        Update: {
          child_id?: string
          completed_at?: string | null
          course_id?: string
          created_at?: string
          current_lesson_id?: string | null
          enrolled_by?: string | null
          id?: string
          progress_percentage?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_current_lesson_id_fkey"
            columns: ["current_lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_enrolled_by_fkey"
            columns: ["enrolled_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      exercises: {
        Row: {
          audio_transcript: string | null
          correct_answer: string
          created_at: string | null
          crown_level: number
          difficulty_score: number | null
          exercise_type: Database["public"]["Enums"]["exercise_type"]
          feedback_correct: string
          feedback_incorrect: string
          hint_text: string | null
          id: string
          image_desc: string | null
          lesson_id: string | null
          options: Json | null
          prompt_text: string
          skill_id: string
          xp_reward: number
        }
        Insert: {
          audio_transcript?: string | null
          correct_answer: string
          created_at?: string | null
          crown_level?: number
          difficulty_score?: number | null
          exercise_type: Database["public"]["Enums"]["exercise_type"]
          feedback_correct: string
          feedback_incorrect: string
          hint_text?: string | null
          id?: string
          image_desc?: string | null
          lesson_id?: string | null
          options?: Json | null
          prompt_text: string
          skill_id: string
          xp_reward?: number
        }
        Update: {
          audio_transcript?: string | null
          correct_answer?: string
          created_at?: string | null
          crown_level?: number
          difficulty_score?: number | null
          exercise_type?: Database["public"]["Enums"]["exercise_type"]
          feedback_correct?: string
          feedback_incorrect?: string
          hint_text?: string | null
          id?: string
          image_desc?: string | null
          lesson_id?: string | null
          options?: Json | null
          prompt_text?: string
          skill_id?: string
          xp_reward?: number
        }
        Relationships: [
          {
            foreignKeyName: "exercises_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercises_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_progress: {
        Row: {
          child_id: string
          completed: boolean
          completed_at: string | null
          created_at: string
          heart_gems_earned: number
          id: string
          lesson_id: string
          quiz_score: number | null
          reflection_text: string | null
        }
        Insert: {
          child_id: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          heart_gems_earned?: number
          id?: string
          lesson_id: string
          quiz_score?: number | null
          reflection_text?: string | null
        }
        Update: {
          child_id?: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          heart_gems_earned?: number
          id?: string
          lesson_id?: string
          quiz_score?: number | null
          reflection_text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lesson_progress_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          content: Json
          course_id: string
          created_at: string
          description: string | null
          heart_gems_reward: number
          id: string
          order_index: number
          title: string
        }
        Insert: {
          content?: Json
          course_id: string
          created_at?: string
          description?: string | null
          heart_gems_reward?: number
          id?: string
          order_index: number
          title: string
        }
        Update: {
          content?: Json
          course_id?: string
          created_at?: string
          description?: string | null
          heart_gems_reward?: number
          id?: string
          order_index?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          age: number | null
          avatar_url: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          parent_id: string | null
          pin: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          age?: number | null
          avatar_url?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          parent_id?: string | null
          pin?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          age?: number | null
          avatar_url?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          parent_id?: string | null
          pin?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      quest_completions: {
        Row: {
          child_id: string
          completed_at: string
          id: string
          notes: string | null
          quest_id: string
        }
        Insert: {
          child_id: string
          completed_at?: string
          id?: string
          notes?: string | null
          quest_id: string
        }
        Update: {
          child_id?: string
          completed_at?: string
          id?: string
          notes?: string | null
          quest_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quest_completions_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quest_completions_quest_id_fkey"
            columns: ["quest_id"]
            isOneToOne: false
            referencedRelation: "daily_quests"
            referencedColumns: ["id"]
          },
        ]
      }
      review_queue: {
        Row: {
          child_id: string
          completed_at: string | null
          created_at: string | null
          due_date: string
          ease_factor: number
          id: string
          interval_days: number
          next_review_date: string | null
          priority: number
          repetition_count: number
          review_type: Database["public"]["Enums"]["review_type"]
          skill_id: string
          unit_id: string | null
        }
        Insert: {
          child_id: string
          completed_at?: string | null
          created_at?: string | null
          due_date: string
          ease_factor?: number
          id?: string
          interval_days?: number
          next_review_date?: string | null
          priority?: number
          repetition_count?: number
          review_type: Database["public"]["Enums"]["review_type"]
          skill_id: string
          unit_id?: string | null
        }
        Update: {
          child_id?: string
          completed_at?: string | null
          created_at?: string | null
          due_date?: string
          ease_factor?: number
          id?: string
          interval_days?: number
          next_review_date?: string | null
          priority?: number
          repetition_count?: number
          review_type?: Database["public"]["Enums"]["review_type"]
          skill_id?: string
          unit_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "review_queue_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_queue_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string
          id: string
          max_crown_level: number
          order_index: number
          prerequisite_skills: string[] | null
          title: string
          unit_id: string
          updated_at: string | null
          xp_per_crown: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string
          id?: string
          max_crown_level?: number
          order_index: number
          prerequisite_skills?: string[] | null
          title: string
          unit_id: string
          updated_at?: string | null
          xp_per_crown?: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string
          id?: string
          max_crown_level?: number
          order_index?: number
          prerequisite_skills?: string[] | null
          title?: string
          unit_id?: string
          updated_at?: string | null
          xp_per_crown?: number
        }
        Relationships: [
          {
            foreignKeyName: "skills_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      streaks: {
        Row: {
          child_id: string
          current_streak: number
          id: string
          last_activity_date: string | null
          longest_streak: number
          updated_at: string
        }
        Insert: {
          child_id: string
          current_streak?: number
          id?: string
          last_activity_date?: string | null
          longest_streak?: number
          updated_at?: string
        }
        Update: {
          child_id?: string
          current_streak?: number
          id?: string
          last_activity_date?: string | null
          longest_streak?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "streaks_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      units: {
        Row: {
          course_id: string
          created_at: string | null
          description: string | null
          id: string
          order_index: number
          title: string
          unlock_requirements: Json | null
          updated_at: string | null
        }
        Insert: {
          course_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          order_index: number
          title: string
          unlock_requirements?: Json | null
          updated_at?: string | null
        }
        Update: {
          course_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          order_index?: number
          title?: string
          unlock_requirements?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "units_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          badge_id: string
          child_id: string
          earned_at: string
          id: string
        }
        Insert: {
          badge_id: string
          child_id: string
          earned_at?: string
          id?: string
        }
        Update: {
          badge_id?: string
          child_id?: string
          earned_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_badges_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_checkpoint_progress: {
        Row: {
          checkpoint_id: string
          child_id: string
          completed: boolean
          completed_at: string | null
          created_at: string | null
          id: string
          unlocked: boolean
          unlocked_at: string | null
        }
        Insert: {
          checkpoint_id: string
          child_id: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string | null
          id?: string
          unlocked?: boolean
          unlocked_at?: string | null
        }
        Update: {
          checkpoint_id?: string
          child_id?: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string | null
          id?: string
          unlocked?: boolean
          unlocked_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_checkpoint_progress_checkpoint_id_fkey"
            columns: ["checkpoint_id"]
            isOneToOne: false
            referencedRelation: "checkpoints"
            referencedColumns: ["id"]
          },
        ]
      }
      user_exercise_history: {
        Row: {
          attempts: number | null
          child_id: string
          correct: boolean
          created_at: string | null
          difficulty_at_time: number | null
          exercise_id: string
          hints_used: number | null
          id: string
          response: string | null
          session_id: string | null
          skill_id: string
          time_taken_seconds: number | null
          xp_awarded: number
        }
        Insert: {
          attempts?: number | null
          child_id: string
          correct: boolean
          created_at?: string | null
          difficulty_at_time?: number | null
          exercise_id: string
          hints_used?: number | null
          id?: string
          response?: string | null
          session_id?: string | null
          skill_id: string
          time_taken_seconds?: number | null
          xp_awarded?: number
        }
        Update: {
          attempts?: number | null
          child_id?: string
          correct?: boolean
          created_at?: string | null
          difficulty_at_time?: number | null
          exercise_id?: string
          hints_used?: number | null
          id?: string
          response?: string | null
          session_id?: string | null
          skill_id?: string
          time_taken_seconds?: number | null
          xp_awarded?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_exercise_history_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_exercise_history_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      user_skill_progress: {
        Row: {
          best_streak: number
          child_id: string
          created_at: string | null
          crown_level: number
          current_streak: number
          id: string
          last_practice_date: string | null
          mastery_score: number | null
          skill_id: string
          state: Database["public"]["Enums"]["skill_state"]
          total_xp: number
          updated_at: string | null
        }
        Insert: {
          best_streak?: number
          child_id: string
          created_at?: string | null
          crown_level?: number
          current_streak?: number
          id?: string
          last_practice_date?: string | null
          mastery_score?: number | null
          skill_id: string
          state?: Database["public"]["Enums"]["skill_state"]
          total_xp?: number
          updated_at?: string | null
        }
        Update: {
          best_streak?: number
          child_id?: string
          created_at?: string | null
          crown_level?: number
          current_streak?: number
          id?: string
          last_practice_date?: string | null
          mastery_score?: number | null
          skill_id?: string
          state?: Database["public"]["Enums"]["skill_state"]
          total_xp?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_skill_progress_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_next_review_interval: {
        Args: {
          current_interval: number
          ease_factor: number
          performance_quality: number
        }
        Returns: {
          next_interval: number
          new_ease_factor: number
        }[]
      }
      get_user_profile_id: {
        Args: { user_uuid: string }
        Returns: string
      }
      is_user_own_profile: {
        Args: { profile_user_id: string }
        Returns: boolean
      }
      is_user_parent_of_profile: {
        Args: { profile_id: string }
        Returns: boolean
      }
      schedule_skill_review: {
        Args: {
          p_child_id: string
          p_skill_id: string
          p_performance_quality: number
        }
        Returns: undefined
      }
      schedule_unit_review_after_crown: {
        Args: { p_child_id: string; p_skill_id: string }
        Returns: undefined
      }
    }
    Enums: {
      age_group: "foundational" | "growth" | "purpose"
      exercise_type:
        | "multiple_choice_audio"
        | "picture_choice"
        | "true_false"
        | "fill_blank"
        | "reorder_words"
        | "speak_prompt"
        | "scenario_response"
        | "match_image_text"
      review_type:
        | "skill_practice"
        | "unit_review"
        | "spaced_repetition"
        | "remedial"
      skill_state: "locked" | "unlocked" | "completed" | "mastered"
      user_role: "parent" | "child"
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
      age_group: ["foundational", "growth", "purpose"],
      exercise_type: [
        "multiple_choice_audio",
        "picture_choice",
        "true_false",
        "fill_blank",
        "reorder_words",
        "speak_prompt",
        "scenario_response",
        "match_image_text",
      ],
      review_type: [
        "skill_practice",
        "unit_review",
        "spaced_repetition",
        "remedial",
      ],
      skill_state: ["locked", "unlocked", "completed", "mastered"],
      user_role: ["parent", "child"],
    },
  },
} as const
