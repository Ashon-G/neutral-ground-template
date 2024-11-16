import { useAuth } from "@/components/auth/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { NavLink } from "react-router-dom";
import { UserCircle, LogOut, CreditCard, UserCircle2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export const UserAvatar = () => {
  const { session } = useAuth();
  const isFounder = session?.user?.user_metadata?.user_type === 'founder';
  
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session?.user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profile?.avatar_url || ""} />
            <AvatarFallback>
              {profile?.full_name?.charAt(0) || session?.user.email?.charAt(0) || "?"}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-neutral-700 dark:text-neutral-200">
            {profile?.full_name || session?.user.email}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56 bg-white border border-gray-200 shadow-lg">
        <NavLink to="profile">
          <DropdownMenuItem className="cursor-pointer">
            <UserCircle className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
        </NavLink>
        {isFounder && (
          <a 
            href="https://billing.stripe.com/p/login/fZeaHygAY2ID9I4cMM" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <DropdownMenuItem className="cursor-pointer">
              <CreditCard className="mr-2 h-4 w-4" />
              Billing Portal
            </DropdownMenuItem>
          </a>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-default text-gray-500">
          <UserCircle2 className="mr-2 h-4 w-4" />
          {profile?.user_type?.charAt(0).toUpperCase() + profile?.user_type?.slice(1) || 'User'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};