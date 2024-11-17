export type BusinessInfo = {
  name: string;
  website?: string;
  industry: string;
  stage: string;
  yearStarted: string;
  taxId?: string;
  address: string;
  description: string;
};

export type ProfileFormData = {
  full_name: string;
  bio: string;
  settings: Record<string, any>;
  business?: BusinessInfo;
};