import { ChatUser } from "@/types/chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type UserListProps = {
  users: ChatUser[];
  selectedUser: string;
  onUserSelect: (userId: string) => void;
  onSendAgreement?: (userId: string) => void;
};

export const UserList = ({ users, selectedUser, onUserSelect, onSendAgreement }: UserListProps) => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const userType = session?.user?.user_metadata?.user_type;

  const handleMarketplaceClick = () => {
    navigate("/dashboard/marketplace");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border/10">
        <h2 className="font-semibold text-foreground">Conversations</h2>
      </div>
      <ScrollArea className="flex-1">
        {users?.length > 0 ? (
          <div className="p-2">
            {users.map((user) => (
              <div
                key={user.id}
                className={cn(
                  "w-full flex flex-col gap-2 p-3 rounded-lg transition-colors hover:bg-muted/50",
                  selectedUser === user.id && "bg-muted/50"
                )}
              >
                <button
                  onClick={() => onUserSelect(user.id)}
                  className="flex items-center gap-3 w-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar_url} />
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      {user.full_name?.charAt(0) || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="font-medium text-sm text-foreground">{user.full_name}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {user.user_type}
                    </p>
                  </div>
                </button>
                {userType === 'founder' && user.user_type === 'maven' && onSendAgreement && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs"
                    onClick={() => onSendAgreement(user.id)}
                  >
                    <FileText className="h-3 w-3 mr-2" />
                    Send Agreement
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              {userType === "founder" ? (
                <>
                  You haven't started any conversations yet. Visit the marketplace to
                  find and chat with mavens.
                  <Button
                    onClick={handleMarketplaceClick}
                    variant="secondary"
                    className="mt-4 w-full"
                    size="sm"
                  >
                    Browse Marketplace
                  </Button>
                </>
              ) : (
                "You haven't started any conversations yet. Founders will be able to contact you through the marketplace."
              )}
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};