export interface GotchaPostType {
  post_id: string;
  platform_type: string;
  title: string;
  company: string;
  company_url: string;
  location: string;
  job: string;
  industry: string;
  experience: string;
  deadline: Date;
  company_type: string;
  employment_type: string;
  salary: string;
  education: string;
  post_url: string;
  isBookmarked: boolean;
  created_at?: Date;
}
