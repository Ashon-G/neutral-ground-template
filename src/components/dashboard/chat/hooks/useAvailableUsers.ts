import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ChatUser } from "@/types/chat";

export const useAvailableUsers = (userProfile: any, sessionUserId: string | undefined) => {
  return useQuery<ChatUser[]>({
    queryKey: ["availableUsers", sessionUserId],
    queryFn: async () => {
      if (!userProfile?.user_type || !sessionUserId) return [];

      if (userProfile.user_type === 'admin') {
        // Admins can see all founders and mavens
        const { data: users } = await supabase
          .from("profiles")
          .select("id, full_name, user_type, avatar_url")
          .in("user_type", ['founder', 'maven'])
          .neq("id", sessionUserId);
        return users || [];
      } else if (userProfile.user_type === "founder") {
        // Founders can only see mavens they've chatted with
        const { data: conversations } = await supabase
          .from("messages")
          .select(`
            profiles!messages_receiver_id_fkey(
              id,
              full_name,
              user_type,
              avatar_url
            )
          `)
          .eq("sender_id", sessionUserId)
          .eq("profiles.user_type", "maven")
          .not("profiles.id", "is", null);

        // Also get messages where the founder is the receiver
        const { data: reverseConversations } = await supabase
          .from("messages")
          .select(`
            profiles!messages_sender_id_fkey(
              id,
              full_name,
              user_type,
              avatar_url
            )
          `)
          .eq("receiver_id", sessionUserId)
          .eq("profiles.user_type", "maven")
          .not("profiles.id", "is", null);

        // Combine and deduplicate users
        const allUsers = [
          ...(conversations?.map(c => c.profiles) || []),
          ...(reverseConversations?.map(c => c.profiles) || [])
        ];

        const uniqueUsers = Array.from(
          new Map(allUsers.map(user => [user.id, user])).values()
        );

        return uniqueUsers;
      } else if (userProfile.user_type === "maven") {
        // Mavens can only see founders they've chatted with
        const { data: conversations } = await supabase
          .from("messages")
          .select(`
            profiles!messages_receiver_id_fkey(
              id,
              full_name,
              user_type,
              avatar_url
            )
          `)
          .eq("sender_id", sessionUserId)
          .eq("profiles.user_type", "founder")
          .not("profiles.id", "is", null);

        // Also get messages where the maven is the receiver
        const { data: reverseConversations } = await supabase
          .from("messages")
          .select(`
            profiles!messages_sender_id_fkey(
              id,
              full_name,
              user_type,
              avatar_url
            )
          `)
          .eq("receiver_id", sessionUserId)
          .eq("profiles.user_type", "founder")
          .not("profiles.id", "is", null);

        // Combine and deduplicate users
        const allUsers = [
          ...(conversations?.map(c => c.profiles) || []),
          ...(reverseConversations?.map(c => c.profiles) || [])
        ];

        const uniqueUsers = Array.from(
          new Map(allUsers.map(user => [user.id, user])).values()
        );

        return uniqueUsers;
      }
      return [];
    },
    enabled: !!userProfile && !!sessionUserId,
  });
};