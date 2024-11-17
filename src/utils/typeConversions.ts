import { BusinessInfo } from "@/integrations/supabase/types/business";
import { Json } from "@/integrations/supabase/types";

export const parseBusinessInfo = (data: Json | null): BusinessInfo | null => {
  if (!data) return null;
  return data as unknown as BusinessInfo;
};

export const businessInfoToJson = (data: BusinessInfo | null): Json => {
  if (!data) return null;
  return data as unknown as Json;
};