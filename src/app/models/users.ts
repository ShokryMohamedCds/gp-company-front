export interface Users {
  _id: string;
  image?: string;
  industry?: string;
  address?: string;
  minSalary?: {
    value: number;
    currency: string;
  };
  name: string;
  number: string;
  city: string;
  country: string;
  email: string;
  password?: string | null;
  birthdate: string;
  isBlocked: boolean;
  title?: string;
  jobTitles: {
    name: string;
  }[];
  yearsOfExperience?: number;
  skills: {
    SkillName: string;
    yearsOfExperience: number;
    _id: string;
  }[];
  fieldOfStudy?: string;
  University?: string;
  GraduationYear?: string;
  Grade?: string;
  languages: string[];
  tokens: any[];
  __v: number;
  OTP?: string | null;
  cv?: string;
  currentCareerlevel?: string;
  jopType?: string;
  currentEducationalLevel?: string;
}
