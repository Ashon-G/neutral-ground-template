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
      const { data: notificationData, error: notificationError } = await supabase.functions.invoke("send-message-notification", {
        body: {
          to: selectedUser,
          senderName: userProfile?.full_name || "Someone",
          messageContent: message,
        },
      });

      if (notificationError) {
        console.error("Error sending notification:", notificationError);
        throw notificationError;
      }

      console.log("Notification response:", notificationData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
    onError: (error) => {
      console.error("Error in useSendMessage:", error);
      toast({
        title: "Error sending message",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};