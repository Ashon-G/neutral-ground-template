import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useSendMessage = (sessionUserId: string | undefined, selectedUser: string, userProfile: any) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (message: string) => {
      if (!sessionUserId || !selectedUser) throw new Error("No user selected");

      const { error: messageError } = await supabase.from("messages").insert({
        content: message,
        sender_id: sessionUserId,
        receiver_id: selectedUser,
      });

      if (messageError) throw messageError;

      // Send notification
      const { error: notificationError } = await supabase.functions.invoke("send-message-notification", {
        body: {
          to: selectedUser,
          senderName: userProfile?.full_name || "Someone",
          messageContent: message,
        },
      });

      if (notificationError) {
        console.error("Error sending notification:", notificationError);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};