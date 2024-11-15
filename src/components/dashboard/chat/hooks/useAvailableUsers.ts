import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ChatUser } from "@/types/chat";

export const useAvailableUsers = (userProfile: any, sessionUserId: string | undefined) => {
  return useQuery<ChatUser[]>({
    queryKey: ["availableUsers", sessionUserId],
    queryFn: async () => {
      if (!userProfile?.user_type) return [];

      if (userProfile.user_type === 'admin') {
        // Admins can see all founders and mavens
        const { data: users } = await supabase
          .from("profiles")
          .select("id, full_name, user_type, avatar_url")
          .in("user_type", ['founder', 'maven'])
          .neq("id", sessionUserId);
        return users || [];
      } else if (userProfile.user_type === "founder") {
        // Founders can see all mavens
        const { data: users } = await supabase
          .from("profiles")
          .select("id, full_name, user_type, avatar_url")
          .eq("user_type", "maven");
        return users || [];
      } else if (userProfile.user_type === "maven") {
        // Mavens can see all founders
        const { data: users } = await supabase
          .from("profiles")
          .select("id, full_name, user_type, avatar_url")
          .eq("user_type", "founder");
        return users || [];
      }
      return [];
    },
    enabled: !!userProfile,
  });
};