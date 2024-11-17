export type UserType = 'founder' | 'maven' | 'admin';
export type MavenSkillset = 'Developer' | 'Marketer' | 'Copywriter' | 'Designer' | 'Accounting' | 'Sales' | 'Other';

export interface BusinessInfo {
  name: string;
  website?: string;
  industry: string;
  stage: string;
  yearStarted: string;
  taxId?: string;
  address: string;
  description: string;
}

export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  bio: string | null;
  settings: Record<string, any> | null;
  user_type: UserType | null;
  maven_skillset: MavenSkillset | null;
  phone_number: string | null;
  location: string | null;
  linkedin_profile: string | null;
  business?: BusinessInfo | null;
}