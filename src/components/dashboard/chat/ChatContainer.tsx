import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";
import { Message, ChatUser } from "@/types/chat";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { UserList } from "./UserList";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

export const ChatContainer = () => {
  const location = useLocation();
  const initialSelectedUser = location.state?.selectedMaven || "";
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(initialSelectedUser);
  const [showUserList, setShowUserList] = useState(!initialSelectedUser);
  const { session } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: userProfile } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session?.user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: availableUsers } = useQuery<ChatUser[]>({
    queryKey: ["availableUsers", session?.user.id],
    queryFn: async () => {
      if (!userProfile?.user_type) return [];

      if (userProfile.user_type === 'admin') {
        const { data: users } = await supabase
          .from("profiles")
          .select("id, full_name, user_type, avatar_url")
          .in("user_type", ['founder', 'maven'])
          .neq("id", session?.user.id);
        return users || [];
      } else if (userProfile.user_type === 'founder') {
        const { data: users } = await supabase
          .from("profiles")
          .select("id, full_name, user_type, avatar_url")
          .eq("user_type", "maven");
        return users || [];
      } else if (userProfile.user_type === 'maven') {
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

  const { data: messages, isLoading } = useQuery<Message[]>({
    queryKey: ["messages", selectedUser],
    queryFn: async () => {
      if (!selectedUser) return [];

      const { data, error } = await supabase
        .from("messages")
        .select(`
          id,
          content,
          created_at,
          sender_id,
          receiver_id,
          sender:profiles!sender_id(
            full_name,
            avatar_url
          ),
          receiver:profiles!receiver_id(
            full_name
          )
        `)
        .or(`and(sender_id.eq.${session?.user.id},receiver_id.eq.${selectedUser}),and(sender_id.eq.${selectedUser},receiver_id.eq.${session?.user.id})`)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data.map(msg => ({
        ...msg,
        sender: Array.isArray(msg.sender) ? msg.sender[0] : msg.sender,
        receiver: Array.isArray(msg.receiver) ? msg.receiver[0] : msg.receiver,
      }));
    },
    enabled: !!selectedUser,
  });

  const sendMessage = useMutation({
    mutationFn: async () => {
      if (!session?.user.id || !selectedUser) throw new Error("No user selected");

      const { error: messageError } = await supabase.from("messages").insert({
        content: message,
        sender_id: session.user.id,
        receiver_id: selectedUser,
      });

      if (messageError) throw messageError;

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
      setMessage("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const selectedChatUser = availableUsers?.find(user => user.id === selectedUser);

  return (
    <div className="flex h-[calc(100vh-12rem)] border rounded-lg overflow-hidden">
      <div className={`md:block ${showUserList ? 'block w-full md:w-[280px]' : 'hidden'} border-r`}>
        <UserList
          users={availableUsers || []}
          selectedUser={selectedUser}
          onUserSelect={(userId) => {
            setSelectedUser(userId);
            setShowUserList(false);
          }}
        />
      </div>
      <div className={`flex-1 flex flex-col ${!showUserList ? 'block' : 'hidden md:block'}`}>
        {selectedUser ? (
          <>
            <div className="p-4 border-b flex items-center gap-2 md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setShowUserList(true)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <span className="font-medium">{selectedChatUser?.full_name}</span>
            </div>
            <MessageList
              messages={messages || []}
              currentUserId={session?.user.id || ""}
            />
            <MessageInput
              message={message}
              setMessage={setMessage}
              onSend={() => sendMessage.mutate()}
              isPending={sendMessage.isPending}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};