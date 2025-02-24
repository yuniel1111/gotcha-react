export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      bookmark: {
        Row: {
          bookmark_id: number;
          created_at: string;
          post: Json | null;
          post_id: number;
          profile_id: string;
        };
        Insert: {
          bookmark_id?: number;
          created_at?: string;
          post?: Json | null;
          post_id?: number;
          profile_id?: string;
        };
        Update: {
          bookmark_id?: number;
          created_at?: string;
          post?: Json | null;
          post_id?: number;
          profile_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'bookmark_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'post';
            referencedColumns: ['post_id'];
          },
          {
            foreignKeyName: 'bookmark_profile_id_fkey';
            columns: ['profile_id'];
            isOneToOne: false;
            referencedRelation: 'profile';
            referencedColumns: ['profile_id'];
          },
        ];
      };
      company_type_code: {
        Row: {
          company_type_code_id: number;
          goyong_code: number | null;
          saramin_code: number | null;
        };
        Insert: {
          company_type_code_id?: number;
          goyong_code?: number | null;
          saramin_code?: number | null;
        };
        Update: {
          company_type_code_id?: number;
          goyong_code?: number | null;
          saramin_code?: number | null;
        };
        Relationships: [];
      };
      education_code: {
        Row: {
          education_code_id: number;
          goyong_code: number | null;
          saramin_code: number | null;
        };
        Insert: {
          education_code_id?: number;
          goyong_code?: number | null;
          saramin_code?: number | null;
        };
        Update: {
          education_code_id?: number;
          goyong_code?: number | null;
          saramin_code?: number | null;
        };
        Relationships: [];
      };
      employment_type_code: {
        Row: {
          employment_type_code_id: number;
          goyong_code: number | null;
          saramin_code: number | null;
        };
        Insert: {
          employment_type_code_id?: number;
          goyong_code?: number | null;
          saramin_code?: number | null;
        };
        Update: {
          employment_type_code_id?: number;
          goyong_code?: number | null;
          saramin_code?: number | null;
        };
        Relationships: [];
      };
      filter: {
        Row: {
          company_type: Json | null;
          created_at: string;
          deadline: string | null;
          education: Json | null;
          employment_type: Json | null;
          experience: Json | null;
          filter_id: number;
          industry: Json | null;
          is_bookmarked: boolean;
          job: Json | null;
          location: Json | null;
          platform_type: string;
          profile_id: string | null;
          salary: Json | null;
        };
        Insert: {
          company_type?: Json | null;
          created_at?: string;
          deadline?: string | null;
          education?: Json | null;
          employment_type?: Json | null;
          experience?: Json | null;
          filter_id?: number;
          industry?: Json | null;
          is_bookmarked?: boolean;
          job?: Json | null;
          location?: Json | null;
          platform_type?: string;
          profile_id?: string | null;
          salary?: Json | null;
        };
        Update: {
          company_type?: Json | null;
          created_at?: string;
          deadline?: string | null;
          education?: Json | null;
          employment_type?: Json | null;
          experience?: Json | null;
          filter_id?: number;
          industry?: Json | null;
          is_bookmarked?: boolean;
          job?: Json | null;
          location?: Json | null;
          platform_type?: string;
          profile_id?: string | null;
          salary?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: 'filter_profile_id_fkey';
            columns: ['profile_id'];
            isOneToOne: false;
            referencedRelation: 'profile';
            referencedColumns: ['profile_id'];
          },
        ];
      };
      job_code: {
        Row: {
          goyong_code: number | null;
          job_code_id: number;
          saramin_code: number | null;
        };
        Insert: {
          goyong_code?: number | null;
          job_code_id?: number;
          saramin_code?: number | null;
        };
        Update: {
          goyong_code?: number | null;
          job_code_id?: number;
          saramin_code?: number | null;
        };
        Relationships: [];
      };
      location_code: {
        Row: {
          goyong_code: number | null;
          location_code_id: number;
          saramin_code: number | null;
        };
        Insert: {
          goyong_code?: number | null;
          location_code_id?: number;
          saramin_code?: number | null;
        };
        Update: {
          goyong_code?: number | null;
          location_code_id?: number;
          saramin_code?: number | null;
        };
        Relationships: [];
      };
      notepad: {
        Row: {
          content: string | null;
          created_at: string;
          files_url: Json | null;
          notepad_id: number;
          profile_id: string | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          files_url?: Json | null;
          notepad_id?: number;
          profile_id?: string | null;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          files_url?: Json | null;
          notepad_id?: number;
          profile_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'notepad_profile_id_fkey';
            columns: ['profile_id'];
            isOneToOne: false;
            referencedRelation: 'profile';
            referencedColumns: ['profile_id'];
          },
        ];
      };
      post: {
        Row: {
          content: Json | null;
          expiration_date: string;
          platform: string;
          post_id: number;
          posting_date: string;
        };
        Insert: {
          content?: Json | null;
          expiration_date?: string;
          platform?: string;
          post_id?: number;
          posting_date?: string;
        };
        Update: {
          content?: Json | null;
          expiration_date?: string;
          platform?: string;
          post_id?: number;
          posting_date?: string;
        };
        Relationships: [];
      };
      profile: {
        Row: {
          created_at: string;
          email: string;
          is_deleted: boolean;
          name: string;
          password: string;
          phone: string | null;
          profile_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          email?: string;
          is_deleted?: boolean;
          name?: string;
          password?: string;
          phone?: string | null;
          profile_id?: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          is_deleted?: boolean;
          name?: string;
          password?: string;
          phone?: string | null;
          profile_id?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      resume: {
        Row: {
          address: string | null;
          birthday: string | null;
          created_at: string;
          email: string | null;
          english_name: string | null;
          gender: string | null;
          introduction: string | null;
          name: string | null;
          phone: string | null;
          profile_id: string | null;
          resume_id: number;
          skills: Json | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          address?: string | null;
          birthday?: string | null;
          created_at?: string;
          email?: string | null;
          english_name?: string | null;
          gender?: string | null;
          introduction?: string | null;
          name?: string | null;
          phone?: string | null;
          profile_id?: string | null;
          resume_id?: number;
          skills?: Json | null;
          title?: string;
          updated_at?: string;
        };
        Update: {
          address?: string | null;
          birthday?: string | null;
          created_at?: string;
          email?: string | null;
          english_name?: string | null;
          gender?: string | null;
          introduction?: string | null;
          name?: string | null;
          phone?: string | null;
          profile_id?: string | null;
          resume_id?: number;
          skills?: Json | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'resume_profile_id_fkey';
            columns: ['profile_id'];
            isOneToOne: false;
            referencedRelation: 'profile';
            referencedColumns: ['profile_id'];
          },
        ];
      };
      'resume-activity': {
        Row: {
          activity_level: string | null;
          created_at: string;
          details: string | null;
          end_date: string | null;
          is_current: boolean | null;
          organization: string | null;
          resume_activity_id: number;
          resume_id: number;
          start_date: string | null;
          title: string;
        };
        Insert: {
          activity_level?: string | null;
          created_at?: string;
          details?: string | null;
          end_date?: string | null;
          is_current?: boolean | null;
          organization?: string | null;
          resume_activity_id?: number;
          resume_id: number;
          start_date?: string | null;
          title?: string;
        };
        Update: {
          activity_level?: string | null;
          created_at?: string;
          details?: string | null;
          end_date?: string | null;
          is_current?: boolean | null;
          organization?: string | null;
          resume_activity_id?: number;
          resume_id?: number;
          start_date?: string | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'resume-activity_resume_id_fkey';
            columns: ['resume_id'];
            isOneToOne: false;
            referencedRelation: 'resume';
            referencedColumns: ['resume_id'];
          },
        ];
      };
      'resume-certificate': {
        Row: {
          certificate_number: string | null;
          created_at: string;
          organization: string | null;
          pass_date: string | null;
          pass_level: string | null;
          resume_certificate_id: number;
          resume_id: number;
          title: string;
        };
        Insert: {
          certificate_number?: string | null;
          created_at?: string;
          organization?: string | null;
          pass_date?: string | null;
          pass_level?: string | null;
          resume_certificate_id?: number;
          resume_id: number;
          title?: string;
        };
        Update: {
          certificate_number?: string | null;
          created_at?: string;
          organization?: string | null;
          pass_date?: string | null;
          pass_level?: string | null;
          resume_certificate_id?: number;
          resume_id?: number;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'resume-certificate_resume_id_fkey';
            columns: ['resume_id'];
            isOneToOne: false;
            referencedRelation: 'resume';
            referencedColumns: ['resume_id'];
          },
        ];
      };
      'resume-cover-letter': {
        Row: {
          contents: string | null;
          created_at: string;
          resume_cover_letter_id: number;
          resume_id: number;
          title: string;
        };
        Insert: {
          contents?: string | null;
          created_at?: string;
          resume_cover_letter_id?: number;
          resume_id: number;
          title?: string;
        };
        Update: {
          contents?: string | null;
          created_at?: string;
          resume_cover_letter_id?: number;
          resume_id?: number;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'resume-cover-letter_resume_id_fkey';
            columns: ['resume_id'];
            isOneToOne: false;
            referencedRelation: 'resume';
            referencedColumns: ['resume_id'];
          },
        ];
      };
      'resume-document': {
        Row: {
          created_at: string;
          document_type: string | null;
          document_url: string | null;
          file_name: string | null;
          file_url: string | null;
          resume_document_id: number;
          resume_id: number;
        };
        Insert: {
          created_at?: string;
          document_type?: string | null;
          document_url?: string | null;
          file_name?: string | null;
          file_url?: string | null;
          resume_document_id?: number;
          resume_id: number;
        };
        Update: {
          created_at?: string;
          document_type?: string | null;
          document_url?: string | null;
          file_name?: string | null;
          file_url?: string | null;
          resume_document_id?: number;
          resume_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'resume-document_resume_id_fkey';
            columns: ['resume_id'];
            isOneToOne: false;
            referencedRelation: 'resume';
            referencedColumns: ['resume_id'];
          },
        ];
      };
      'resume-experience': {
        Row: {
          created_at: string;
          department: string | null;
          end_date: string | null;
          is_current: boolean;
          job: string | null;
          position: string | null;
          reason_for_leaving: string | null;
          responsibility: string | null;
          resume_experience_id: number;
          resume_id: number;
          salary: number | null;
          start_date: string | null;
          title: string;
        };
        Insert: {
          created_at?: string;
          department?: string | null;
          end_date?: string | null;
          is_current?: boolean;
          job?: string | null;
          position?: string | null;
          reason_for_leaving?: string | null;
          responsibility?: string | null;
          resume_experience_id?: number;
          resume_id: number;
          salary?: number | null;
          start_date?: string | null;
          title?: string;
        };
        Update: {
          created_at?: string;
          department?: string | null;
          end_date?: string | null;
          is_current?: boolean;
          job?: string | null;
          position?: string | null;
          reason_for_leaving?: string | null;
          responsibility?: string | null;
          resume_experience_id?: number;
          resume_id?: number;
          salary?: number | null;
          start_date?: string | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'resume-experience_resume_id_fkey';
            columns: ['resume_id'];
            isOneToOne: false;
            referencedRelation: 'resume';
            referencedColumns: ['resume_id'];
          },
        ];
      };
      'resume-item-status': {
        Row: {
          created_at: string;
          is_activity_open: boolean;
          is_certificate_open: boolean;
          is_cover_letter_open: boolean;
          is_document_open: boolean;
          is_experience_open: boolean;
          is_info_open: boolean;
          is_introduction_open: boolean;
          is_language_open: boolean;
          is_note_open: boolean;
          is_preferential_treatment_open: boolean;
          is_private_education_open: boolean;
          is_prize_open: boolean;
          is_project_open: boolean;
          is_public_education_open: boolean;
          is_skill_open: boolean;
          resume_id: number;
          resume_item_status_id: number;
        };
        Insert: {
          created_at?: string;
          is_activity_open?: boolean;
          is_certificate_open?: boolean;
          is_cover_letter_open?: boolean;
          is_document_open?: boolean;
          is_experience_open?: boolean;
          is_info_open?: boolean;
          is_introduction_open?: boolean;
          is_language_open?: boolean;
          is_note_open?: boolean;
          is_preferential_treatment_open?: boolean;
          is_private_education_open?: boolean;
          is_prize_open?: boolean;
          is_project_open?: boolean;
          is_public_education_open?: boolean;
          is_skill_open?: boolean;
          resume_id: number;
          resume_item_status_id?: number;
        };
        Update: {
          created_at?: string;
          is_activity_open?: boolean;
          is_certificate_open?: boolean;
          is_cover_letter_open?: boolean;
          is_document_open?: boolean;
          is_experience_open?: boolean;
          is_info_open?: boolean;
          is_introduction_open?: boolean;
          is_language_open?: boolean;
          is_note_open?: boolean;
          is_preferential_treatment_open?: boolean;
          is_private_education_open?: boolean;
          is_prize_open?: boolean;
          is_project_open?: boolean;
          is_public_education_open?: boolean;
          is_skill_open?: boolean;
          resume_id?: number;
          resume_item_status_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'resume-item-status_resume_id_fkey';
            columns: ['resume_id'];
            isOneToOne: false;
            referencedRelation: 'resume';
            referencedColumns: ['resume_id'];
          },
        ];
      };
      'resume-language': {
        Row: {
          created_at: string;
          grade: string | null;
          language_level: string | null;
          organization: string | null;
          pass_date: string | null;
          resume_id: number;
          resume_language_id: number;
          score: number | null;
          title: string;
        };
        Insert: {
          created_at?: string;
          grade?: string | null;
          language_level?: string | null;
          organization?: string | null;
          pass_date?: string | null;
          resume_id: number;
          resume_language_id?: number;
          score?: number | null;
          title?: string;
        };
        Update: {
          created_at?: string;
          grade?: string | null;
          language_level?: string | null;
          organization?: string | null;
          pass_date?: string | null;
          resume_id?: number;
          resume_language_id?: number;
          score?: number | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'resume-language_resume_id_fkey';
            columns: ['resume_id'];
            isOneToOne: false;
            referencedRelation: 'resume';
            referencedColumns: ['resume_id'];
          },
        ];
      };
      'resume-note': {
        Row: {
          contents: string | null;
          created_at: string;
          resume_id: number;
          resume_note_id: number;
          title: string;
        };
        Insert: {
          contents?: string | null;
          created_at?: string;
          resume_id: number;
          resume_note_id?: number;
          title?: string;
        };
        Update: {
          contents?: string | null;
          created_at?: string;
          resume_id?: number;
          resume_note_id?: number;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'resume-note_resume_id_fkey';
            columns: ['resume_id'];
            isOneToOne: false;
            referencedRelation: 'resume';
            referencedColumns: ['resume_id'];
          },
        ];
      };
      'resume-preferential-treatment': {
        Row: {
          created_at: string;
          disability_grade: string | null;
          discharge_date: string | null;
          enlistment_date: string | null;
          extra_percentage: number | null;
          is_disability: boolean;
          is_military: boolean;
          is_veteran: boolean;
          military_branch: string | null;
          military_type: string | null;
          rank: string | null;
          reason_for_discharge: string | null;
          resume_id: number;
          resume_preferential_treatment_id: number;
          specialty: string | null;
          veteran_number: string | null;
          veteran_relationship: string | null;
          veteran_type: string | null;
        };
        Insert: {
          created_at?: string;
          disability_grade?: string | null;
          discharge_date?: string | null;
          enlistment_date?: string | null;
          extra_percentage?: number | null;
          is_disability?: boolean;
          is_military?: boolean;
          is_veteran?: boolean;
          military_branch?: string | null;
          military_type?: string | null;
          rank?: string | null;
          reason_for_discharge?: string | null;
          resume_id: number;
          resume_preferential_treatment_id?: number;
          specialty?: string | null;
          veteran_number?: string | null;
          veteran_relationship?: string | null;
          veteran_type?: string | null;
        };
        Update: {
          created_at?: string;
          disability_grade?: string | null;
          discharge_date?: string | null;
          enlistment_date?: string | null;
          extra_percentage?: number | null;
          is_disability?: boolean;
          is_military?: boolean;
          is_veteran?: boolean;
          military_branch?: string | null;
          military_type?: string | null;
          rank?: string | null;
          reason_for_discharge?: string | null;
          resume_id?: number;
          resume_preferential_treatment_id?: number;
          specialty?: string | null;
          veteran_number?: string | null;
          veteran_relationship?: string | null;
          veteran_type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'resume-preferential-treatment_resume_id_fkey';
            columns: ['resume_id'];
            isOneToOne: false;
            referencedRelation: 'resume';
            referencedColumns: ['resume_id'];
          },
        ];
      };
      'resume-private-education': {
        Row: {
          created_at: string;
          details: string | null;
          end_date: string | null;
          is_current: boolean;
          organization: string | null;
          resume_id: number;
          resume_private_education_id: number;
          start_date: string | null;
          title: string;
        };
        Insert: {
          created_at?: string;
          details?: string | null;
          end_date?: string | null;
          is_current?: boolean;
          organization?: string | null;
          resume_id: number;
          resume_private_education_id?: number;
          start_date?: string | null;
          title?: string;
        };
        Update: {
          created_at?: string;
          details?: string | null;
          end_date?: string | null;
          is_current?: boolean;
          organization?: string | null;
          resume_id?: number;
          resume_private_education_id?: number;
          start_date?: string | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'resume-private-education_resume_id_fkey';
            columns: ['resume_id'];
            isOneToOne: false;
            referencedRelation: 'resume';
            referencedColumns: ['resume_id'];
          },
        ];
      };
      'resume-prize': {
        Row: {
          created_at: string;
          details: string | null;
          organization: string | null;
          prize_date: string | null;
          resume_id: number;
          resume_prize_id: number;
          title: string;
        };
        Insert: {
          created_at?: string;
          details?: string | null;
          organization?: string | null;
          prize_date?: string | null;
          resume_id: number;
          resume_prize_id?: number;
          title?: string;
        };
        Update: {
          created_at?: string;
          details?: string | null;
          organization?: string | null;
          prize_date?: string | null;
          resume_id?: number;
          resume_prize_id?: number;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'resume-prize_resume_id_fkey';
            columns: ['resume_id'];
            isOneToOne: false;
            referencedRelation: 'resume';
            referencedColumns: ['resume_id'];
          },
        ];
      };
      'resume-project': {
        Row: {
          contribution: number | null;
          created_at: string;
          details: string | null;
          end_date: string | null;
          is_current: boolean;
          job: string | null;
          position: string | null;
          resume_id: number;
          resume_project_id: number;
          start_date: string | null;
          team: string | null;
          title: string;
        };
        Insert: {
          contribution?: number | null;
          created_at?: string;
          details?: string | null;
          end_date?: string | null;
          is_current?: boolean;
          job?: string | null;
          position?: string | null;
          resume_id: number;
          resume_project_id?: number;
          start_date?: string | null;
          team?: string | null;
          title?: string;
        };
        Update: {
          contribution?: number | null;
          created_at?: string;
          details?: string | null;
          end_date?: string | null;
          is_current?: boolean;
          job?: string | null;
          position?: string | null;
          resume_id?: number;
          resume_project_id?: number;
          start_date?: string | null;
          team?: string | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'resume-project_resume_id_fkey';
            columns: ['resume_id'];
            isOneToOne: false;
            referencedRelation: 'resume';
            referencedColumns: ['resume_id'];
          },
        ];
      };
      'resume-public-education': {
        Row: {
          created_at: string;
          details: string | null;
          end_date: string | null;
          grade_point_average: number | null;
          is_dropped_out: boolean;
          is_enrolled: boolean;
          major: string | null;
          max_grade_point: number | null;
          resume_id: number;
          resume_public_education_id: number;
          start_date: string | null;
          title: string;
        };
        Insert: {
          created_at?: string;
          details?: string | null;
          end_date?: string | null;
          grade_point_average?: number | null;
          is_dropped_out?: boolean;
          is_enrolled?: boolean;
          major?: string | null;
          max_grade_point?: number | null;
          resume_id: number;
          resume_public_education_id?: number;
          start_date?: string | null;
          title?: string;
        };
        Update: {
          created_at?: string;
          details?: string | null;
          end_date?: string | null;
          grade_point_average?: number | null;
          is_dropped_out?: boolean;
          is_enrolled?: boolean;
          major?: string | null;
          max_grade_point?: number | null;
          resume_id?: number;
          resume_public_education_id?: number;
          start_date?: string | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'resume-public-education_resume_id_fkey';
            columns: ['resume_id'];
            isOneToOne: false;
            referencedRelation: 'resume';
            referencedColumns: ['resume_id'];
          },
        ];
      };
      skill: {
        Row: {
          field: string;
          logo_url: string;
          name: string;
          skill_id: number;
        };
        Insert: {
          field?: string;
          logo_url?: string;
          name?: string;
          skill_id?: number;
        };
        Update: {
          field?: string;
          logo_url?: string;
          name?: string;
          skill_id?: number;
        };
        Relationships: [];
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
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;
