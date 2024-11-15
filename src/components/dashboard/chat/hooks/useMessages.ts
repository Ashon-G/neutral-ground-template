import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Message } from "@/types/chat";

export const useMessages = (selectedUser: string, currentUserId: string | undefined) => {
  return useQuery<Message[]>({
    queryKey: ["messages", selectedUser],
    queryFn: async () => {
      if (!selectedUser) return [];

      const { data, error } = await supabase
        .from("messages")
        .select(
          `
          id,
          content,
          created_at,
          sender_id,
          receiver_id,
          sender:profiles!sender_id(
            full_name
          ),
          receiver:profiles!receiver_id(
            full_name
          )
        `
        )
        .or(
          `and(sender_id.eq.${currentUserId},receiver_id.eq.${selectedUser}),and(sender_id.eq.${selectedUser},receiver_id.eq.${currentUserId})`
        )
        .order("created_at", { ascending: true });

      if (error) throw error;

      return (data || []).map(msg => ({
        ...msg,
        sender: Array.isArray(msg.sender) ? msg.sender[0] : msg.sender,
        receiver: Array.isArray(msg.receiver) ? msg.receiver[0] : msg.receiver,
      })) as Message[];
    },
    enabled: !!selectedUser,
  });
};