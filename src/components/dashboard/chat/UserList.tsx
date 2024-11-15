import { ChatUser } from "@/types/chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type UserListProps = {
  users: ChatUser[];
  selectedUser: string;
  onUserSelect: (userId: string) => void;
};

export const UserList = ({ users, selectedUser, onUserSelect }: UserListProps) => {
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
            <button
              key={user.id}
              onClick={() => onUserSelect(user.id)}
              className={cn(
                "w-full flex items-center gap-3 p-4 hover:bg-muted transition-colors",
                selectedUser === user.id && "bg-muted"
              )}
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