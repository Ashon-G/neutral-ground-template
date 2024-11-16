import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ChatUser } from "@/types/chat";

export const useAvailableUsers = (userProfile: any, currentUserId: string | undefined) => {
  return useQuery<ChatUser[]>({
    queryKey: ["availableUsers", currentUserId],
    queryFn: async () => {
      if (!userProfile?.user_type || !currentUserId) return [];

      // Get unique users from message history
      const { data: messageUsers } = await supabase
        .from("messages")
        .select(`
          sender:sender_id(id, full_name, user_type, avatar_url),
          receiver:receiver_id(id, full_name, user_type, avatar_url)
        `)
        .or(`sender_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`);

      if (!messageUsers) return [];

      // Create a Set to store unique user IDs that the current user has chatted with
      const uniqueUserIds = new Set<string>();
      const users: ChatUser[] = [];

      messageUsers.forEach((msg) => {
        const otherUser = msg.sender.id === currentUserId ? msg.receiver : msg.sender;
        if (!uniqueUserIds.has(otherUser.id)) {
          uniqueUserIds.add(otherUser.id);
          users.push({
            id: otherUser.id,
            full_name: otherUser.full_name,
            user_type: otherUser.user_type,
            avatar_url: otherUser.avatar_url,
          });
        }
      });

      return users;
    },
    enabled: !!userProfile && !!currentUserId,
  });
};