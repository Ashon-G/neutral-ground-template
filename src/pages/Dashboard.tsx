import { Outlet } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import { ImpersonateUser } from "@/components/admin/ImpersonateUser";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/dashboard/NewSidebar";
import { ListTodo, MessageSquare, Wallet, User, Settings as SettingsIcon, Link as LinkIcon } from "lucide-react";
import { useSidebar } from "@/components/dashboard/sidebar/SidebarContext";
import { motion } from "framer-motion";
import { SidebarProvider } from "@/components/dashboard/sidebar/SidebarContext";
import { UserAvatar } from "@/components/dashboard/sidebar/UserAvatar";

const DashboardContent = () => {
  const { session } = useAuth();
  const { open, animate } = useSidebar();
  const userMetadataType = session?.user?.user_metadata?.user_type;
  const appMetadataType = session?.user?.app_metadata?.user_type;
  const isAdmin = userMetadataType === 'admin' || appMetadataType === 'admin';

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
          <div className="flex flex-col h-full">
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
            <div className="mt-auto pt-4">
              <UserAvatar />
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      <motion.main 
        className="pt-24 pb-24 md:pb-20 md:ml-[300px] transition-all duration-300"
        animate={{
          marginLeft: animate ? (open ? "300px" : "60px") : "300px",
          width: animate ? (open ? "calc(100% - 300px)" : "calc(100% - 60px)") : "calc(100% - 300px)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="container mx-auto px-4 md:px-8">
          <Outlet />
        </div>
      </motion.main>
    </div>
  );
};

const Dashboard = () => {
  return (
    <SidebarProvider>
      <DashboardContent />
    </SidebarProvider>
  );
};

export default Dashboard;