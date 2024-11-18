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
      
      return (data as any[]).map(maven => ({
        ...maven,
        business: maven.business as Profile['business']
      })) as Profile[];
    },
  });

  const filteredMavens = mavens?.filter((maven) =>
    maven.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    maven.maven_skillset?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    maven.bio?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Group mavens by skillset
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
    <div className="space-y-8 pb-20">
      <div className="bg-gradient-to-r from-blue-600 to-orange-500 animate-gradient-x -mx-4 md:-mx-8 px-4 md:px-8 py-12 mb-8 rounded-2xl">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Build & market your company with{" "}
              <span className="italic font-serif">student mavens</span>
            </h1>
          </div>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search for any service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg rounded-lg border-0 shadow-lg bg-white"
            />
          </div>
        </div>
      </div>

      <div className="space-y-16 px-4 md:px-8">
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