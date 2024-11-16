import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ChatUser } from "@/types/chat";

type MessageUser = {
  sender: {
    id: string;
    full_name: string | null;
    user_type: string | null;
    avatar_url: string | null;
  } | null;
  receiver: {
    id: string;
    full_name: string | null;
    user_type: string | null;
    avatar_url: string | null;
  } | null;
};

export const useAvailableUsers = (userProfile: any, currentUserId: string | undefined) => {
  return useQuery<ChatUser[]>({
    queryKey: ["availableUsers", currentUserId],
    queryFn: async () => {
      if (!userProfile?.user_type || !currentUserId) return [];

      // Get users from actual message history with non-empty messages
      const { data: messageUsers } = await supabase
        .from("messages")
        .select(`
          sender:profiles!messages_sender_id_fkey(id, full_name, user_type, avatar_url),
          receiver:profiles!messages_receiver_id_fkey(id, full_name, user_type, avatar_url)
        `)
        .or(`sender_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`)
        .neq('content', '') // Exclude empty messages
        .not('content', 'is', null); // Exclude null messages

      if (!messageUsers) return [];

      // Create a Set to store unique user IDs that the current user has chatted with
      const uniqueUserIds = new Set<string>();
      const users: ChatUser[] = [];

      (messageUsers as unknown as MessageUser[]).forEach((msg) => {
        // Determine which user is the other party in the conversation
        const otherUser = msg.sender?.id === currentUserId ? msg.receiver : msg.sender;
        
        // Only add users that exist and haven't been added yet
        if (otherUser && !uniqueUserIds.has(otherUser.id)) {
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