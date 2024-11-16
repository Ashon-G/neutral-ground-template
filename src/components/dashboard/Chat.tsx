import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { MessageList } from "./chat/MessageList";
import { MessageInput } from "./chat/MessageInput";
import { UserList } from "./chat/UserList";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAvailableUsers } from "./chat/hooks/useAvailableUsers";
import { useMessages } from "./chat/hooks/useMessages";
import { useSendMessage } from "./chat/hooks/useSendMessage";
import { FirstChatModal } from "./chat/FirstChatModal";

export const Chat = () => {
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [showUserList, setShowUserList] = useState(true);
  const [showFirstChatModal, setShowFirstChatModal] = useState(false);
  const { session } = useAuth();

  const { data: userProfile, isLoading: isProfileLoading } = useQuery({
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

  const { data: availableUsers } = useAvailableUsers(userProfile, session?.user.id);
  const { data: messages, isLoading } = useMessages(selectedUser, session?.user.id);
  const sendMessage = useSendMessage(session?.user.id, selectedUser, userProfile);

  // Show modal when profile is loaded and user is a founder
  useEffect(() => {
    if (!isProfileLoading && userProfile?.user_type === 'founder') {
      setShowFirstChatModal(true);
    }
  }, [userProfile, isProfileLoading]);

  if (isLoading || isProfileLoading) {
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
              onSend={() => {
                sendMessage.mutate(message);
                setMessage("");
              }}
              isPending={sendMessage.isPending}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </div>
      <FirstChatModal 
        open={showFirstChatModal} 
        onClose={() => setShowFirstChatModal(false)} 
      />
    </div>
  );
};