import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Profile } from "@/integrations/supabase/types/profile";

export const CompanyHeader = () => {
  const { session } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [companyName, setCompanyName] = useState("");

  const { data: profile, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session?.user.id)
        .single();

      if (error) throw error;
      
      setCompanyName(data.business?.company_name || "");
      return data as Profile;
    },
  });

  const uploadFile = async (file: File, bucket: string) => {
    const fileExt = file.name.split('.').pop();
    const filePath = `${session?.user.id}/${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError, data } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'banner' | 'icon') => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const publicUrl = await uploadFile(file, 'project-files');
      const business = {
        ...(profile?.business || {}),
        [type === 'banner' ? 'banner_image' : 'company_icon']: publicUrl
      };

      const { error } = await supabase
        .from('profiles')
        .update({ business })
        .eq('id', session?.user.id);

      if (error) throw error;

      await refetch();
      toast({
        title: "Success",
        description: `${type === 'banner' ? 'Banner' : 'Icon'} updated successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to update ${type}`,
        variant: "destructive",
      });
    }
  };

  const handleNameUpdate = async () => {
    try {
      const business = {
        ...(profile?.business || {}),
        company_name: companyName
      };

      const { error } = await supabase
        .from('profiles')
        .update({ business })
        .eq('id', session?.user.id);

      if (error) throw error;

      await refetch();
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Company name updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update company name",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative mb-8">
      <div className="relative h-48 bg-gradient-to-r from-blue-400 via-purple-500 to-orange-500">
        {profile?.business?.banner_image && (
          <img
            src={profile.business.banner_image}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        )}
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-4 right-4 bg-white"
          onClick={() => document.getElementById('banner-upload')?.click()}
        >
          Change header
        </Button>
        <input
          id="banner-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleImageUpload(e, 'banner')}
        />
      </div>
      
      <div className="absolute -bottom-6 left-8 flex items-end gap-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-lg bg-white shadow-lg flex items-center justify-center overflow-hidden">
            {profile?.business?.company_icon ? (
              <img
                src={profile.business.company_icon}
                alt="Company Icon"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                Logo
              </div>
            )}
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-white"
            onClick={() => document.getElementById('icon-upload')?.click()}
          >
            +
          </Button>
          <input
            id="icon-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageUpload(e, 'icon')}
          />
        </div>
        
        <div className="mb-2">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="text-2xl font-bold bg-white border rounded px-2 py-1"
                placeholder="Enter company name"
              />
              <Button
                variant="secondary"
                size="sm"
                onClick={handleNameUpdate}
              >
                Save
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <h1 
              className="text-2xl font-bold text-white cursor-pointer hover:underline"
              onClick={() => setIsEditing(true)}
            >
              {companyName || "Add Company Name"}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};