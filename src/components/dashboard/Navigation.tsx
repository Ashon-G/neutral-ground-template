import { NavLink } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  MessageSquare,
  ListTodo,
  User,
  Settings,
  Wallet,
  Link as LinkIcon,
  BookOpen
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Navigation = () => {
  const { session } = useAuth();
  const userType = session?.user?.user_metadata?.user_type;
  const isAdmin = userType === 'admin';
  const isFounder = userType === 'founder';

  const navItems = [
    ...(isFounder ? [{
      icon: <BookOpen className="h-5 w-5" />,
      label: "Start",
      to: "getting-started"
    }] : []),
    {
      icon: <ListTodo className="h-5 w-5" />,
      label: "Tasks",
      to: "tasks"
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: "Chat",
      to: "chat"
    },
    {
      icon: <Wallet className="h-5 w-5" />,
      label: "Market",
      to: "marketplace"
    },
    {
      icon: <LinkIcon className="h-5 w-5" />,
      label: "Connect",
      to: "integrations",
      badge: "Alpha"
    },
    {
      icon: <User className="h-5 w-5" />,
      label: "Profile",
      to: "profile"
    },
    ...(isAdmin ? [{
      icon: <Settings className="h-5 w-5" />,
      label: "Admin",
      to: "admin"
    }] : [])
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
      <div className="grid grid-cols-5 gap-1 px-2 py-2">
        {navItems.slice(0, 5).map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center p-2 rounded-lg ${
                isActive ? "text-secondary" : "text-gray-600"
              }`
            }
          >
            <div className="relative">
              {item.icon}
              {item.badge && (
                <Badge variant="secondary" className="absolute -top-2 -right-2 text-[8px] px-1">
                  {item.badge}
                </Badge>
              )}
            </div>
            <span className="text-[10px] mt-1">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};