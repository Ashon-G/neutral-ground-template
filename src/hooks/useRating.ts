import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { calculateRating } from "@/utils/calculateRating";

export const useRating = (mavenId: string) => {
  return useQuery({
    queryKey: ["maven-rating", mavenId],
    queryFn: async () => {
      const { data: ratings, error } = await supabase
        .from("task_ratings")
        .select("rating")
        .eq("maven_id", mavenId);

      if (error) throw error;

      return calculateRating(ratings || []);
    },
  });
};