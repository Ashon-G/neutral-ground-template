import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Profile } from "@/integrations/supabase/types/profile";
import { BannerImage } from "./header/BannerImage";
import { CompanyIcon } from "./header/CompanyIcon";
import { CompanyName } from "./header/CompanyName";
import { parseBusinessInfo } from "@/utils/typeConversions";

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
      
      const parsedProfile = {
        ...data,
        business: parseBusinessInfo(data.business)
      } as Profile;
      
      setCompanyName(parsedProfile.business?.company_name || "");
      return parsedProfile;
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
      <BannerImage 
        business={profile?.business} 
        onImageUpload={(e) => handleImageUpload(e, 'banner')} 
      />
      
      <div className="absolute -bottom-6 left-8 flex items-end gap-4">
        <CompanyIcon 
          business={profile?.business} 
          onImageUpload={(e) => handleImageUpload(e, 'icon')} 
        />
        
        <CompanyName 
          companyName={companyName}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          setCompanyName={setCompanyName}
          onSave={handleNameUpdate}
        />
      </div>
    </div>
  );
};