import { Outlet } from "react-router-dom";
import { UserCircle, LogOut, Settings, CreditCard, UserCircle2 } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { ImpersonateUser } from "@/components/admin/ImpersonateUser";
import { InstallPrompt } from "@/components/pwa/InstallPrompt";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/dashboard/NewSidebar";
import { ListTodo, MessageSquare, Wallet, User, Settings as SettingsIcon, Link as LinkIcon } from "lucide-react";

const Dashboard = () => {
  const { session } = useAuth();
  const userMetadataType = session?.user?.user_metadata?.user_type;
  const appMetadataType = session?.user?.app_metadata?.user_type;
  const isAdmin = userMetadataType === 'admin' || appMetadataType === 'admin';
  const isFounder = userMetadataType === 'founder' || appMetadataType === 'founder';

  const navItems = [
    { label: "Tasks", href: "/dashboard/tasks", icon: <ListTodo className="h-5 w-5" /> },
    { label: "Chat", href: "/dashboard/chat", icon: <MessageSquare className="h-5 w-5" /> },
    { label: "Marketplace", href: "/dashboard/marketplace", icon: <Wallet className="h-5 w-5" /> },
    { label: "Integrations", href: "/dashboard/integrations", icon: <LinkIcon className="h-5 w-5" /> },
    { label: "Profile", href: "/dashboard/profile", icon: <User className="h-5 w-5" /> },
    ...(isAdmin ? [{ label: "Admin", href: "/dashboard/admin", icon: <SettingsIcon className="h-5 w-5" /> }] : []),
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 no-scrollbar">
      <nav className="fixed top-0 left-0 right-0 z-50 mb-8 bg-white p-4 border-b border-black/5 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between gap-2">
            {isAdmin && (
              <div className="hidden md:block">
                <ImpersonateUser />
              </div>
            )}
          </div>
        </div>
      </nav>

      <Sidebar>
        <SidebarBody className="pt-24 fixed left-0">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <SidebarLink
                key={item.href}
                link={{
                  label: item.label,
                  href: item.href,
                  icon: item.icon
                }}
                className="text-neutral-700 hover:text-neutral-900"
              />
            ))}
          </div>
        </SidebarBody>
      </Sidebar>

      <InstallPrompt />

      <div className="pt-24 pb-24 md:pb-20 md:pl-[60px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;