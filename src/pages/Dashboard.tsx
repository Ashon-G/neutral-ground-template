import { Outlet } from "react-router-dom";
import { UserCircle, LogOut, Settings, CreditCard, UserCircle2 } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { ImpersonateUser } from "@/components/admin/ImpersonateUser";
import { InstallPrompt } from "@/components/pwa/InstallPrompt";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import AnimatedNavigation from "@/components/dashboard/AnimatedNavigation";

const Dashboard = () => {
  const { session } = useAuth();
  const userMetadataType = session?.user?.user_metadata?.user_type;
  const appMetadataType = session?.user?.app_metadata?.user_type;
  const isAdmin = userMetadataType === 'admin' || appMetadataType === 'admin';
  const isFounder = userMetadataType === 'founder' || appMetadataType === 'founder';

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
    <div className="min-h-screen bg-gray-50/50 no-scrollbar">
      <nav className="fixed top-0 left-0 right-0 z-50 mb-8 bg-white p-4 border-b border-black/5 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={profile?.avatar_url || ""} />
                    <AvatarFallback>
                      {profile?.full_name?.charAt(0) || session?.user.email?.charAt(0) || "?"}
                    </AvatarFallback>
                  </Avatar>
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
                  {isAdmin && (
                    <div className="md:hidden p-2">
                      <ImpersonateUser />
                    </div>
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

              {isAdmin && (
                <div className="hidden md:block">
                  <ImpersonateUser />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AnimatedNavigation />
      <InstallPrompt />

      <div className="pt-24 pb-24 md:pb-20">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;