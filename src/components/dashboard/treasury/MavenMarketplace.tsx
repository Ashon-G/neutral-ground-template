import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Profile, MavenSkillset } from "@/integrations/supabase/types/profile";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { MavenCarousel } from "./MavenCarousel";

export const MavenMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: mavens } = useQuery({
    queryKey: ["mavens"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_type", "maven");

      if (error) throw error;
      return data as Profile[];
    },
  });

  const filteredMavens =
    mavens?.filter((maven) =>
      maven.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      maven.maven_skillset?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      maven.bio?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const groupedMavens = filteredMavens.reduce((acc, maven) => {
    if (maven.maven_skillset) {
      if (!acc[maven.maven_skillset]) {
        acc[maven.maven_skillset] = [];
      }
      acc[maven.maven_skillset].push(maven);
    }
    return acc;
  }, {} as Record<MavenSkillset, Profile[]>);

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 md:space-y-12 md:pb-20">
      <div className="bg-gradient-to-r from-blue-600 to-orange-500 -mx-2 sm:-mx-4 md:-mx-8 px-4 md:px-8 py-8 sm:py-16 md:py-32">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 md:space-y-12">
          <div className="text-center space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white px-2">
              Build & market your company with{" "}
              <span className="italic font-serif">student mavens</span>
            </h1>
          </div>
          <div className="relative max-w-[280px] sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto px-2">
            <Search className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-gray-400" />
            <Input
              placeholder="Search for any service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 sm:pl-16 md:pl-20 py-4 sm:py-6 md:py-8 text-base sm:text-lg md:text-xl rounded-lg sm:rounded-xl md:rounded-2xl border-0 shadow-lg w-full"
            />
          </div>
        </div>
      </div>

      <div className="space-y-12 sm:space-y-16 md:space-y-24 max-w-[1800px] mx-auto px-2 sm:px-6 md:px-8">
        {Object.entries(groupedMavens).map(([skillset, mavens]) => (
          <MavenCarousel 
            key={skillset}
            title={`${skillset} Mavens`}
            mavens={mavens}
          />
        ))}
      </div>
    </div>
  );
};