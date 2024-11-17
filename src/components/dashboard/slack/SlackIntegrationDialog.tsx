import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";

interface SlackIntegrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SlackIntegrationDialog = ({
  open,
  onOpenChange,
}: SlackIntegrationDialogProps) => {
  const { session } = useAuth();
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);

  const { data: integration, isLoading } = useQuery({
    queryKey: ["slackIntegration", session?.user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("slack_integrations")
        .select("*")
        .eq("user_id", session?.user.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user.id,
  });

  if (isLoading) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-br from-purple-600 to-blue-500 text-white border-none relative overflow-hidden">
        <button 
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4 text-white" />
        </button>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">Connect to Slack</DialogTitle>
          <DialogDescription className="text-gray-100">
            Get notifications and updates directly in your Slack workspace.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {integration ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">Account Connected</span>
                <span className="text-xs text-green-300">✓</span>
              </div>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                Close
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => {}}
              disabled={isConnecting}
              className="w-full bg-white text-purple-600 hover:bg-white/90"
            >
              {isConnecting && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              {isConnecting ? "Connecting..." : "Connect to Slack"}
            </Button>
          )}
        </div>

        <img 
          src="/logos/slack-logo.svg" 
          alt="Slack Logo" 
          className="absolute bottom-4 right-4 w-12 h-12 opacity-50"
        />
      </DialogContent>
    </Dialog>
  );
};
