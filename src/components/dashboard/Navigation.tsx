import { NavLink } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  MessageSquare,
  ListTodo,
  User,
  Settings,
  Wallet,
  Link as LinkIcon
} from "lucide-react";

export const Navigation = () => {
  const { session } = useAuth();
  const userType = session?.user?.user_metadata?.user_type;
  const isAdmin = userType === 'admin';

  return (
    <nav className="flex justify-center gap-1 fixed bottom-0 left-0 right-0 p-2 bg-white border-t border-gray-200 z-50 md:relative md:border-none">
      <NavLink
        to="tasks"
        className={({ isActive }) =>
          `flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
            isActive 
              ? "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white shadow-lg" 
              : "text-gray-600 hover:bg-gray-100"
          }`
        }
      >
        <ListTodo className="h-5 w-5" />
        <span className="text-xs mt-1">Tasks</span>
      </NavLink>

      <NavLink
        to="chat"
        className={({ isActive }) =>
          `flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
            isActive 
              ? "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white shadow-lg" 
              : "text-gray-600 hover:bg-gray-100"
          }`
        }
      >
        <MessageSquare className="h-5 w-5" />
        <span className="text-xs mt-1">Chat</span>
      </NavLink>

      <NavLink
        to="marketplace"
        className={({ isActive }) =>
          `flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
            isActive 
              ? "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white shadow-lg" 
              : "text-gray-600 hover:bg-gray-100"
          }`
        }
      >
        <Wallet className="h-5 w-5" />
        <span className="text-xs mt-1">Marketplace</span>
      </NavLink>

      <NavLink
        to="integrations"
        className={({ isActive }) =>
          `flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
            isActive 
              ? "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white shadow-lg" 
              : "text-gray-600 hover:bg-gray-100"
          }`
        }
      >
        <LinkIcon className="h-5 w-5" />
        <span className="text-xs mt-1">Integrations</span>
      </NavLink>

      <NavLink
        to="profile"
        className={({ isActive }) =>
          `flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
            isActive 
              ? "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white shadow-lg" 
              : "text-gray-600 hover:bg-gray-100"
          }`
        }
      >
        <User className="h-5 w-5" />
        <span className="text-xs mt-1">Profile</span>
      </NavLink>

      {isAdmin && (
        <NavLink
          to="admin"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
              isActive 
                ? "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white shadow-lg" 
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <Settings className="h-5 w-5" />
          <span className="text-xs mt-1">Admin</span>
        </NavLink>
      )}
    </nav>
  );
};