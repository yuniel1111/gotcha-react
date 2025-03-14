export interface PlatformPostType {
  post_id: string;
  platform: string | null;
  posting_date: string | null;
  expiration_date: string;
  content: Json | null;
  isBookmarked: boolean;
}

export interface GoyongType {
  [key: string]: any;
}

export interface JobkoreaType {
  [key: string]: any;
}

export interface SaraminType {
  id: number;
  url: string;
  active: number;
  company: {
    detail: {
      href: string;
      name: string;
    };
  };
  position: {
    title: string;
    industry: {
      code: string;
      name: string;
    };
    location: {
      code: string;
      name: string;
    };
    'job-type': {
      code: string;
      name: string;
    };
    'job-mid-code': {
      code: string;
      name: string;
    };
    'job-code': {
      code: string;
      name: string;
    };
    'experience-level': {
      code: number;
      min: number;
      max: number;
      name: string;
    };
    'required-education-level': {
      code: string;
      name: string;
    };
  };
  keyword: string;
  salary: {
    code: string;
    name: string;
  };
  id: string;
  'posting-timestamp': string;
  'posting-date': string;
  'modification-timestamp': string;
  'opening-timestamp': string;
  'expiration-timestamp': string;
  'expiration-date': string;
  'close-type': {
    code: string;
    name: string;
  };
  'read-cnt': string;
  'apply-cnt': string;
}
