import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { GitPullRequest, Slack, Plus, Figma } from "lucide-react";
import { JiraIntegrationDialog } from "@/components/dashboard/jira/JiraIntegrationDialog";
import { SlackIntegrationDialog } from "@/components/dashboard/slack/SlackIntegrationDialog";
import { FigmaIntegrationDialog } from "@/components/dashboard/figma/FigmaIntegrationDialog";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

const Integrations = () => {
  const { session } = useAuth();
  const [isJiraOpen, setIsJiraOpen] = useState(false);
  const [isSlackOpen, setIsSlackOpen] = useState(false);
  const [isFigmaOpen, setIsFigmaOpen] = useState(false);

  const { data: integrations } = useQuery({
    queryKey: ["integrations", session?.user.id],
    queryFn: async () => {
      const [jiraResponse, slackResponse, figmaResponse] = await Promise.all([
        supabase
          .from("jira_integrations")
          .select("*")
          .eq("user_id", session?.user.id)
          .maybeSingle(),
        supabase
          .from("slack_integrations")
          .select("*")
          .eq("user_id", session?.user.id)
          .maybeSingle(),
        supabase
          .from("figma_integrations")
          .select("*")
          .eq("user_id", session?.user.id)
          .maybeSingle(),
      ]);

      return {
        jira: jiraResponse.data,
        slack: slackResponse.data,
        figma: figmaResponse.data,
      };
    },
    enabled: !!session?.user.id,
  });

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Integrations and connected apps</h1>
          <p className="text-muted-foreground mt-1">
            Supercharge your workflow and connect the tools you use every day.
          </p>
        </div>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Request integration
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="border rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-lg p-2 bg-primary/10">
                <GitPullRequest className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Jira</h3>
                <p className="text-sm text-muted-foreground">
                  Sync and manage tasks between OK Maven and Jira.
                </p>
              </div>
            </div>
            <Switch
              checked={!!integrations?.jira}
              onCheckedChange={() => setIsJiraOpen(true)}
            />
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-lg p-2 bg-primary/10">
                <Slack className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Slack</h3>
                <p className="text-sm text-muted-foreground">
                  Get notifications and updates directly in your Slack workspace.
                </p>
              </div>
            </div>
            <Switch
              checked={!!integrations?.slack}
              onCheckedChange={() => setIsSlackOpen(true)}
            />
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-lg p-2 bg-primary/10">
                <Figma className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Figma</h3>
                <p className="text-sm text-muted-foreground">
                  Connect your Figma account to embed private files in your projects.
                </p>
              </div>
            </div>
            <Switch
              checked={!!integrations?.figma}
              onCheckedChange={() => setIsFigmaOpen(true)}
            />
          </div>
        </div>
      </div>

      <JiraIntegrationDialog
        open={isJiraOpen}
        onOpenChange={setIsJiraOpen}
      />
      <SlackIntegrationDialog
        open={isSlackOpen}
        onOpenChange={setIsSlackOpen}
      />
      <FigmaIntegrationDialog
        open={isFigmaOpen}
        onOpenChange={setIsFigmaOpen}
      />
    </div>
  );
};

export default Integrations;