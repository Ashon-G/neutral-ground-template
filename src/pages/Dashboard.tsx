import { Outlet } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import { ImpersonateUser } from "@/components/admin/ImpersonateUser";
import { InstallPrompt } from "@/components/pwa/InstallPrompt";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/dashboard/NewSidebar";
import { ListTodo, MessageSquare, Wallet, Settings as SettingsIcon, Link as LinkIcon, BookOpen, FolderKanban, Archive } from "lucide-react";
import { useSidebar } from "@/components/dashboard/sidebar/SidebarContext";
import { motion } from "framer-motion";
import { SidebarProvider } from "@/components/dashboard/sidebar/SidebarContext";
import { UserAvatar } from "@/components/dashboard/sidebar/UserAvatar";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Navigation } from "@/components/dashboard/Navigation";
import { GettingStartedGuide } from "@/components/dashboard/GettingStartedGuide";

const DashboardContent = () => {
  const { session } = useAuth();
  const { open, animate } = useSidebar();
  const userMetadataType = session?.user?.user_metadata?.user_type;
  const appMetadataType = session?.user?.app_metadata?.user_type;
  const isAdmin = userMetadataType === 'admin' || appMetadataType === 'admin';
  const isFounder = userMetadataType === 'founder' || appMetadataType === 'founder';
  const isMobile = useMediaQuery("(max-width: 768px)");

  const navItems = [
    ...(isFounder ? [{ label: "Getting Started", href: "/dashboard/getting-started", icon: <BookOpen className="h-5 w-5" /> }] : []),
    { 
      label: "Projects", 
      icon: <FolderKanban className="h-5 w-5" />,
      submenu: [
        { label: "Tasks", href: "/dashboard/tasks", icon: <ListTodo className="h-5 w-5" /> },
        ...(isFounder ? [
          { label: "Create Project", href: "/dashboard/create-project", icon: <FolderKanban className="h-5 w-5" /> },
          { label: "My Projects", href: "/dashboard/my-projects", icon: <Archive className="h-5 w-5" /> }
        ] : [])
      ]
    },
    { label: "Chat", href: "/dashboard/chat", icon: <MessageSquare className="h-5 w-5" /> },
    { label: "Marketplace", href: "/dashboard/marketplace", icon: <Wallet className="h-5 w-5" /> },
    { label: "Integrations", href: "/dashboard/integrations", icon: <LinkIcon className="h-5 w-5" />, badge: "Early Alpha" },
    ...(isAdmin ? [{ label: "Admin", href: "/dashboard/admin", icon: <SettingsIcon className="h-5 w-5" /> }] : []),
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 no-scrollbar">
      {!isMobile && (
        <Sidebar>
          <SidebarBody className="pt-4 fixed left-0">
            <div className="flex flex-col h-full">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <SidebarLink
                    key={item.href || item.label}
                    link={item}
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
      )}

      <InstallPrompt />

      {isFounder && <GettingStartedGuide />}

      <motion.main 
        className={`pb-24 transition-all duration-300 ${
          isMobile ? "" : "md:pb-20 md:ml-[300px]"
        }`}
        animate={{
          marginLeft: !isMobile && animate ? (open ? "300px" : "60px") : "0px",
          width: !isMobile && animate ? (open ? "calc(100% - 300px)" : "calc(100% - 60px)") : "100%",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="container mx-auto px-4 md:px-8">
          <Outlet />
        </div>
      </motion.main>

      {isMobile && <Navigation />}
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