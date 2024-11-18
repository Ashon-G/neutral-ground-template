import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AgreementProps {
  mavenName: string;
  maestroName: string;
  onClose?: () => void;
}

export const OpportunityKnocksAccoladeAgreement = ({
  mavenName,
  maestroName,
  onClose,
}: AgreementProps) => {
  const [isSigning, setIsSigning] = useState(false);
  const { toast } = useToast();

  const handleSignAndSend = async () => {
    try {
      setIsSigning(true);

      // Get maven's email
      const { data: mavenProfile } = await supabase
        .from("profiles")
        .select("username") // username is the email
        .eq("full_name", mavenName)
        .single();

      if (!mavenProfile?.username) {
        throw new Error("Maven email not found");
      }

      const signedDate = new Date().toLocaleDateString();

      const { error } = await supabase.functions.invoke("send-agreement", {
        body: {
          to: mavenProfile.username,
          mavenName,
          maestroName,
          signedDate,
        },
      });

      if (error) throw error;

      toast({
        title: "Agreement Sent",
        description: "The agreement has been signed and sent to the maven for their signature.",
      });

      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Error sending agreement:", error);
      toast({
        title: "Error",
        description: "Failed to send the agreement. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSigning(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold mb-4">Opportunity Knocks Accolade Agreement</h2>
        
        <p className="mb-4">
          This Agreement is entered into between {maestroName} ("Maestro") and {mavenName} ("Maven").
        </p>

        <h3 className="text-xl font-semibold mb-2">1. Scope of Services</h3>
        <p>
          The Maven agrees to provide consulting services to the Maestro as outlined in their project discussions.
        </p>

        <h3 className="text-xl font-semibold mb-2">2. Compensation</h3>
        <p>
          Compensation terms will be agreed upon separately for each project engagement.
        </p>

        <h3 className="text-xl font-semibold mb-2">3. Confidentiality</h3>
        <p>
          Both parties agree to maintain the confidentiality of any proprietary information shared during the engagement.
        </p>

        <h3 className="text-xl font-semibold mb-2">4. Term and Termination</h3>
        <p>
          This agreement will remain in effect until terminated by either party with written notice.
        </p>

        <div className="mt-8">
          <Button 
            onClick={handleSignAndSend}
            disabled={isSigning}
            className="w-full"
          >
            {isSigning ? "Signing and Sending..." : "Sign & Send Agreement"}
          </Button>
        </div>
      </div>
    </div>
  );
};