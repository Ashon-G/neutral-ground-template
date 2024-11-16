import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Profile } from "@/integrations/supabase/types/profile";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MavenHeader } from "./dialog-sections/MavenHeader";
import { MavenEducation } from "./dialog-sections/MavenEducation";
import { MavenExperience } from "./dialog-sections/MavenExperience";
import { MavenSkills } from "./dialog-sections/MavenSkills";
import { MavenAvailability } from "./dialog-sections/MavenAvailability";
import { MavenDocuments } from "./dialog-sections/MavenDocuments";

interface MavenDetailsDialogProps {
  maven: Profile;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MavenDetailsDialog = ({ maven, open, onOpenChange }: MavenDetailsDialogProps) => {
  const { data: education, isLoading: loadingEducation } = useQuery({
    queryKey: ["maven-education", maven.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("maven_education")
        .select("*, universities(name)")
        .eq("maven_id", maven.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: open,
  });

  const { data: experience, isLoading: loadingExperience } = useQuery({
    queryKey: ["maven-experience", maven.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("maven_experience")
        .select("*")
        .eq("maven_id", maven.id)
        .order("start_date", { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: open,
  });

  const { data: skills, isLoading: loadingSkills } = useQuery({
    queryKey: ["maven-skills", maven.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("maven_skills")
        .select("*")
        .eq("maven_id", maven.id);
      
      if (error) throw error;
      return data;
    },
    enabled: open,
  });

  const { data: availability, isLoading: loadingAvailability } = useQuery({
    queryKey: ["maven-availability", maven.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("maven_availability")
        .select("*")
        .eq("maven_id", maven.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: open,
  });

  const { data: documents, isLoading: loadingDocuments } = useQuery({
    queryKey: ["maven-documents", maven.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("maven_documents")
        .select("*")
        .eq("maven_id", maven.id);
      
      if (error) throw error;
      return data;
    },
    enabled: open,
  });

  const isLoading = loadingEducation || loadingExperience || loadingSkills || loadingAvailability || loadingDocuments;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <MavenHeader maven={maven} />

        <ScrollArea className="max-h-[70vh] pr-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="space-y-6 py-4">
              <p className="text-gray-700 whitespace-pre-wrap">{maven.bio}</p>
              {maven.linkedin_profile && (
                <a 
                  href={maven.linkedin_profile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline mt-2 inline-block"
                >
                  LinkedIn Profile
                </a>
              )}

              <MavenEducation education={education} />
              <MavenExperience experience={experience} />
              <MavenSkills skills={skills} />
              <MavenAvailability availability={availability} />
              <MavenDocuments documents={documents} />

              {maven.phone_number && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-600">
                    Contact: {maven.phone_number}
                  </p>
                  {maven.location && (
                    <p className="text-sm text-gray-600">
                      Location: {maven.location}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};