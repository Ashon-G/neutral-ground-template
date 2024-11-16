import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/integrations/supabase/types/profile";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { MavenGrid } from "./sections/MavenGrid";

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

  const filteredMavens = mavens?.filter((maven) =>
    maven.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    maven.maven_skillset?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    maven.bio?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="space-y-8 pb-20">
      <div className="bg-[#004D2A] -mx-4 md:-mx-8 px-4 md:px-8 py-12 mb-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Scale your professional workforce with{" "}
              <span className="italic font-serif">freelancers</span>
            </h1>
          </div>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search for any service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg rounded-lg border-0 shadow-lg"
            />
          </div>
          <div className="flex items-center justify-center gap-8 mt-8">
            <p className="text-gray-300 text-sm">Trusted by:</p>
            <div className="flex items-center gap-8">
              {["Meta", "Google", "NETFLIX", "P&G", "PayPal", "Payoneer"].map((brand) => (
                <span key={brand} className="text-gray-300 text-sm font-semibold">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <MavenGrid 
        title="Available Mavens" 
        mavens={filteredMavens} 
      />
    </div>
  );
};