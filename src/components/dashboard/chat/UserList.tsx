import { ChatUser } from "@/types/chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";

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
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold">Conversations</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {users?.length > 0 ? (
          users.map((user) => (
            <div
              key={user.id}
              className={cn(
                "w-full flex flex-col gap-2 p-4 hover:bg-muted transition-colors",
                selectedUser === user.id && "bg-muted"
              )}
            >
              <button
                onClick={() => onUserSelect(user.id)}
                className="flex items-center gap-3 w-full"
              >
                <Avatar>
                  <AvatarImage src={user.avatar_url} />
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    {user.full_name?.charAt(0) || "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="font-medium">{user.full_name}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {user.user_type}
                  </p>
                </div>
              </button>
              {userType === 'founder' && user.user_type === 'maven' && onSendAgreement && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => onSendAgreement(user.id)}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Send Agreement
                </Button>
              )}
            </div>
          ))
        ) : (
          <div className="p-4 text-center space-y-4">
            <p className="text-muted-foreground">
              {userType === "founder" ? (
                <>
                  You haven't started any conversations yet. Visit the marketplace to
                  find and chat with mavens.
                  <Button
                    onClick={handleMarketplaceClick}
                    variant="secondary"
                    className="mt-2"
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
      </div>
    </div>
  );
};