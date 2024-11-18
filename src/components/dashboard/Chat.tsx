import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { MessageList } from "./chat/MessageList";
import { MessageInput } from "./chat/MessageInput";
import { UserList } from "./chat/UserList";
import { Loader2, ArrowLeft } from "lucide-react";
import { useAvailableUsers } from "./chat/hooks/useAvailableUsers";
import { useMessages } from "./chat/hooks/useMessages";
import { useSendMessage } from "./chat/hooks/useSendMessage";
import { FirstChatModal } from "./chat/FirstChatModal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { OpportunityKnocksAccoladeAgreement } from "./chat/OpportunityKnocksAccoladeAgreement";
import { Button } from "@/components/ui/button";

interface UserSettings {
  has_browsed_mavens?: boolean;
  [key: string]: any;
}

export const Chat = () => {
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [showUserList, setShowUserList] = useState(true);
  const [showFirstChatModal, setShowFirstChatModal] = useState(false);
  const [showAgreementDialog, setShowAgreementDialog] = useState(false);
  const { session } = useAuth();
  const queryClient = useQueryClient();

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
    enabled: !!session?.user.id,
  });

  const { data: availableUsers } = useAvailableUsers(userProfile, session?.user.id);
  const { data: messages, isLoading } = useMessages(selectedUser, session?.user.id);
  const sendMessage = useSendMessage(session?.user.id, selectedUser, userProfile);

  const updateUserSettings = useMutation({
    mutationFn: async () => {
      const currentSettings = (userProfile?.settings || {}) as UserSettings;
      const { error } = await supabase
        .from("profiles")
        .update({
          settings: {
            ...currentSettings,
            has_browsed_mavens: true
          }
        })
        .eq("id", session?.user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    }
  });

  useEffect(() => {
    if (!isProfileLoading && userProfile?.user_type === 'founder') {
      setShowFirstChatModal(true);
    }
  }, [userProfile?.user_type, isProfileLoading]);

  const handleSendMessage = async (messageContent: string) => {
    await sendMessage.mutate(messageContent);
    setMessage("");

    const settings = (userProfile?.settings || {}) as UserSettings;
    if (
      userProfile?.user_type === 'founder' &&
      availableUsers?.find(user => user.id === selectedUser)?.user_type === 'maven' &&
      !settings.has_browsed_mavens
    ) {
      updateUserSettings.mutate();
    }
  };

  const handleSendAgreement = () => {
    setShowAgreementDialog(true);
  };

  if (isLoading || isProfileLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-secondary" />
      </div>
    );
  }

  const selectedChatUser = availableUsers?.find(user => user.id === selectedUser);
  const isFounderChattingWithMaven = 
    userProfile?.user_type === 'founder' && 
    selectedChatUser?.user_type === 'maven';

  return (
    <div className="flex h-[calc(100vh-12rem)] rounded-xl overflow-hidden bg-white shadow-lg border border-border/5">
      <div className={`md:block ${showUserList ? 'block w-full md:w-[320px]' : 'hidden'} border-r border-border/10 bg-white`}>
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
            <div className="p-4 border-b border-border/10 flex items-center justify-between bg-white/50 backdrop-blur supports-[backdrop-filter]:bg-white/50">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={() => setShowUserList(true)} className="md:hidden">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <span className="font-medium text-foreground">{selectedChatUser?.full_name}</span>
              </div>
            </div>
            <MessageList
              messages={messages || []}
              currentUserId={session?.user.id || ""}
            />
            <MessageInput
              message={message}
              setMessage={setMessage}
              onSend={() => handleSendMessage(message)}
              isPending={sendMessage.isPending}
              showAgreementButton={isFounderChattingWithMaven}
              onSendAgreement={handleSendAgreement}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground bg-white">
            Select a user to start chatting
          </div>
        )}
      </div>
      <FirstChatModal 
        open={showFirstChatModal} 
        onClose={() => setShowFirstChatModal(false)} 
      />
      <Dialog open={showAgreementDialog} onOpenChange={setShowAgreementDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
          <OpportunityKnocksAccoladeAgreement 
            mavenName={selectedChatUser?.full_name || ""}
            maestroName={userProfile?.full_name || ""}
            onClose={() => setShowAgreementDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
