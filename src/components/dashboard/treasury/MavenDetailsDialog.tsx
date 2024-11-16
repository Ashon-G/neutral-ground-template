import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Profile } from "@/integrations/supabase/types/profile";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, GraduationCap, Briefcase, Calendar, MapPin, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

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
        <DialogHeader>
          <div className="flex items-center gap-4">
            <img
              src={maven.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg"}
              alt={maven.full_name || "Maven"}
              className="h-16 w-16 rounded-full object-cover"
            />
            <div>
              <DialogTitle className="text-2xl">{maven.full_name}</DialogTitle>
              <Badge variant="secondary" className="mt-1">
                {maven.maven_skillset}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="space-y-6 py-4">
              <div>
                <p className="text-muted-foreground whitespace-pre-wrap">{maven.bio}</p>
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
              </div>

              {education && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Education
                  </h3>
                  <div className="bg-secondary/10 rounded-lg p-4">
                    <p className="font-medium">{education.universities?.name}</p>
                    <p>{education.degree_program} in {education.major}</p>
                    {education.minor && <p>Minor in {education.minor}</p>}
                    <p>Year of Study: {education.year_of_study}</p>
                    {education.gpa && <p>GPA: {education.gpa}</p>}
                    <p className="text-sm text-muted-foreground mt-1">
                      Graduating {format(new Date(education.graduation_date), 'MMMM yyyy')}
                    </p>
                  </div>
                </div>
              )}

              {experience && experience.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Experience
                  </h3>
                  <div className="space-y-4">
                    {experience.map((exp) => (
                      <div key={exp.id} className="bg-secondary/10 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{exp.job_title}</p>
                            <p>{exp.company_name}</p>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(exp.start_date), 'MMM yyyy')} - 
                              {exp.end_date ? format(new Date(exp.end_date), ' MMM yyyy') : ' Present'}
                            </p>
                          </div>
                          <Badge>{exp.experience_type}</Badge>
                        </div>
                        {exp.responsibilities && (
                          <div className="mt-2">
                            <p className="font-medium text-sm">Responsibilities:</p>
                            <p className="text-sm">{exp.responsibilities}</p>
                          </div>
                        )}
                        {exp.achievements && (
                          <div className="mt-2">
                            <p className="font-medium text-sm">Key Achievements:</p>
                            <p className="text-sm">{exp.achievements}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {skills && skills.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Skills</h3>
                  <div className="space-y-4">
                    {Object.entries(
                      skills.reduce((acc, skill) => {
                        if (!acc[skill.skill_type]) {
                          acc[skill.skill_type] = [];
                        }
                        acc[skill.skill_type].push(skill.skill_name);
                        return acc;
                      }, {} as Record<string, string[]>)
                    ).map(([type, skillNames]) => (
                      <div key={type}>
                        <p className="text-sm font-medium mb-2">{type}</p>
                        <div className="flex flex-wrap gap-2">
                          {skillNames.map((name) => (
                            <Badge key={name} variant="secondary">
                              {name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {availability && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Availability
                  </h3>
                  <div className="bg-secondary/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{availability.location_preference}</span>
                    </div>
                    <p className="font-medium">{availability.role_type}</p>
                    <p className="text-sm text-muted-foreground">
                      Available from {format(new Date(availability.start_date), 'MMM dd, yyyy')} to{' '}
                      {format(new Date(availability.end_date), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>
              )}

              {documents && documents.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Documents
                  </h3>
                  <div className="space-y-2">
                    {documents.map((doc) => (
                      <a
                        key={doc.id}
                        href={doc.document_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-secondary/10 rounded-lg p-4 hover:bg-secondary/20 transition-colors"
                      >
                        <p className="font-medium">{doc.document_type}</p>
                        <p className="text-sm text-blue-500">View Document</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {maven.phone_number && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Contact: {maven.phone_number}
                  </p>
                  {maven.location && (
                    <p className="text-sm text-muted-foreground">
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