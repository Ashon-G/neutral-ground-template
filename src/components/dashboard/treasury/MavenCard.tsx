import { useState } from "react";
import { Profile } from "@/integrations/supabase/types/profile";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarIcon, MessageSquare, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";
import { useRating } from "@/hooks/useRating";
import { MavenDetailsDialog } from "./MavenDetailsDialog";

interface MavenCardProps {
  maven: Profile;
}

export const MavenCard = ({ maven }: MavenCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session } = useAuth();
  const userType = session?.user?.user_metadata?.user_type;
  const { data: rating, isLoading: isLoadingRating } = useRating(maven.id);
  const [showDetails, setShowDetails] = useState(false);

  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!session) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to chat with mavens",
        variant: "destructive",
      });
      return;
    }

    if (userType !== 'founder') {
      toast({
        title: "Founders only",
        description: "Only founders can initiate chats with mavens",
        variant: "destructive",
      });
      return;
    }

    navigate(`/dashboard/chat`, { state: { selectedMaven: maven.id } });
  };

  return (
    <>
      <Card 
        className="w-full overflow-hidden cursor-pointer transition-all hover:shadow-lg"
        onClick={() => setShowDetails(true)}
      >
        <div className="relative">
          <img
            src={maven.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg"}
            alt={maven.full_name || "Maven"}
            className="h-48 w-full object-cover"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {maven.full_name?.split(" ")[0]}
              </h3>
              <div className="flex items-center gap-1 text-sm">
                {isLoadingRating ? (
                  <Loader2 className="h-4 w-4 animate-spin text-yellow-500" />
                ) : rating > 0 ? (
                  <>
                    <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-gray-900">{rating}</span>
                    <span className="text-gray-500">rating</span>
                  </>
                ) : (
                  <span className="text-gray-500">No ratings yet</span>
                )}
              </div>
            </div>
            <Badge
              variant="secondary"
              className="bg-secondary/10 text-secondary hover:bg-secondary/20"
            >
              {maven.maven_skillset}
            </Badge>
          </div>
          <p className="mt-3 text-sm text-gray-600 line-clamp-3">
            {maven.bio || "Maven on the platform"}
          </p>
          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <span className="text-sm text-gray-600">Starting at</span>
            <span className="font-medium text-gray-900">$50/hr</span>
          </div>
          <Button 
            onClick={handleChatClick}
            variant="secondary" 
            size="sm" 
            className="w-full mt-4"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Chat with {maven.full_name?.split(" ")[0]}
          </Button>
        </CardContent>
      </Card>

      <MavenDetailsDialog 
        maven={maven}
        open={showDetails}
        onOpenChange={setShowDetails}
      />
    </>
  );
};