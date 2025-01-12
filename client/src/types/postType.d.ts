export interface GoyongType {
  [key: string]: string;
}

export interface JobkoreaType {
  [key: string]: string;
}

export interface SaraminType {
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
    jobType: {
      code: string;
      name: string;
    };
    jobMidCode: {
      code: string;
      name: string;
    };
    jobCode: {
      code: string;
      name: string;
    };
    experienceLevel: {
      code: number;
      min: number;
      max: number;
      name: string;
    };
    requiredEducationLevel: {
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
  postingTimestamp: string;
  postingDate: string;
  modificationTimestamp: string;
  openingTimestamp: string;
  expirationTimestamp: string;
  expirationDate: string;
  closeType: {
    code: string;
    name: string;
  };
  readCnt: string;
  applyCnt: string;
}

export interface SaraminJsonType {
  jobs: {
    count: number;
    start: number;
    total: string;
    job: SaraminType[];
  };
}
