import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
import { Loader2 } from "lucide-react";

interface FigmaIntegrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FigmaIntegrationDialog = ({
  open,
  onOpenChange,
}: FigmaIntegrationDialogProps) => {
  const { session } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isConnecting, setIsConnecting] = useState(false);

  const { data: integration, isLoading } = useQuery({
    queryKey: ["figmaIntegration", session?.user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("figma_integrations")
        .select("*")
        .eq("user_id", session?.user.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user.id,
  });

  const connectFigma = async () => {
    const clientId = import.meta.env.VITE_FIGMA_CLIENT_ID;
    if (!clientId) {
      toast({
        title: "Configuration Error",
        description: "Figma client ID is not configured.",
        variant: "destructive",
      });
      return;
    }

    const origin = window.location.origin.replace(/^http:/, 'https:');
    const redirectUri = `${origin}/dashboard/integrations?figma=true`;
    const scope = "files:read";
    
    window.location.href = `https://www.figma.com/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=figma`;
  };

  if (isLoading) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect to Figma</DialogTitle>
          <DialogDescription>
            Connect your Figma account to embed private files in your projects.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {integration ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Account Connected</span>
                <span className="text-xs text-green-500">✓</span>
              </div>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
            </div>
          ) : (
            <Button
              onClick={connectFigma}
              disabled={isConnecting}
              className="w-full"
            >
              {isConnecting && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              {isConnecting ? "Connecting..." : "Connect to Figma"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};