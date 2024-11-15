import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Profile } from "@/integrations/supabase/types/profile";
import { MessageSquare, StarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";

interface MavenCardProps {
  maven: Profile;
}

export const MavenCard = ({ maven }: MavenCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session } = useAuth();
  const userType = session?.user?.user_metadata?.user_type;

  const handleChatClick = () => {
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
    <Card className="group w-[280px] shrink-0 cursor-pointer overflow-hidden transition-all hover:-translate-y-1">
      <div className="relative">
        <img
          src={maven.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg"}
          alt={maven.full_name || "Maven"}
          className="h-48 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-lg text-foreground">
              {maven.full_name?.split(" ")[0]}
            </h3>
            <div className="flex items-center gap-1 text-sm text-foreground">
              <StarIcon className="h-4 w-4 fill-yellow-500" />
              <span>5.0</span>
              <span className="text-muted">(24)</span>
            </div>
          </div>
          <Badge
            variant="secondary"
            className="bg-secondary/10 text-secondary hover:bg-secondary/20"
          >
            {maven.maven_skillset}
          </Badge>
        </div>
        <p className="mt-3 text-sm text-foreground">
          {maven.bio || "Maven on the platform"}
        </p>
        <div className="mt-4 flex items-center justify-between border-t pt-4">
          <span className="text-sm text-foreground">Starting at</span>
          <span className="font-medium text-foreground">$50/hr</span>
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
  );
};