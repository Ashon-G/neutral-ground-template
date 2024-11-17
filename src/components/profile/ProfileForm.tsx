import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { BusinessSection } from "./sections/BusinessSection";
import { ProfileFormData } from "./types";

export const ProfileForm = () => {
  const { session } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session?.user.id)
        .single();

      if (error) throw error;
      
      const settings = (data?.settings || {}) as Record<string, any>;
      return { ...data, settings };
    },
  });

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    defaultValues: {
      full_name: profile?.full_name || "",
      bio: profile?.bio || "",
      settings: profile?.settings || {},
      business: profile?.business || {},
    },
  });

  const updateProfile = useMutation({
    mutationFn: async (data: ProfileFormData) => {
      let avatarUrl = profile?.avatar_url;

      if (avatarFile) {
        setIsUploading(true);
        const fileExt = avatarFile.name.split('.').pop();
        const filePath = `${session?.user.id}/avatar.${fileExt}`;

        try {
          await supabase.storage
            .from('avatars')
            .remove([filePath]);
        } catch (error) {
          // Ignore error if file doesn't exist
        }

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, avatarFile, { 
            upsert: true,
            cacheControl: '3600'
          });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);

        avatarUrl = publicUrl;
        setIsUploading(false);
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          ...data,
          avatar_url: avatarUrl,
        })
        .eq("id", session?.user.id);

      if (error) throw error;

      // Invalidate the getting started progress
      queryClient.invalidateQueries({ queryKey: ["gettingStartedProgress"] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setAvatarFile(event.target.files[0]);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const getUserTypeColor = (userType?: string) => {
    switch (userType) {
      case 'founder':
        return 'bg-blue-500';
      case 'maven':
        return 'bg-green-500';
      case 'admin':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <form onSubmit={handleSubmit((data) => updateProfile.mutate(data))} className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={profile?.avatar_url || ""} />
          <AvatarFallback>{profile?.full_name?.charAt(0) || "?"}</AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <Input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="mb-2"
          />
          <p className="text-sm text-muted-foreground">
            Recommended: Square image, max 1MB
          </p>
          {profile?.user_type && (
            <Badge className={getUserTypeColor(profile.user_type)}>
              {profile.user_type.charAt(0).toUpperCase() + profile.user_type.slice(1)}
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Full Name</Label>
        <Input {...register("full_name")} />
      </div>

      <div className="space-y-2">
        <Label>Bio</Label>
        <Textarea
          {...register("bio")}
          placeholder="Tell us about yourself..."
          className="h-32"
        />
      </div>

      {profile?.user_type === 'founder' && (
        <BusinessSection register={register} />
      )}

      <Button
        type="submit"
        disabled={updateProfile.isPending || isUploading}
        className="w-full"
      >
        {(updateProfile.isPending || isUploading) ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Save Profile"
        )}
      </Button>
    </form>
  );
};