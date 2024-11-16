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
    <nav className="flex justify-around items-center fixed bottom-0 left-0 right-0 p-2 bg-white border-t border-gray-200 z-50 md:hidden">
      <NavLink
        to="tasks"
        className={({ isActive }) =>
          `flex flex-col items-center p-2 rounded-lg ${
            isActive ? "text-secondary" : "text-gray-600"
          }`
        }
      >
        <ListTodo className="h-5 w-5" />
        <span className="text-xs mt-1">Tasks</span>
      </NavLink>

      <NavLink
        to="chat"
        className={({ isActive }) =>
          `flex flex-col items-center p-2 rounded-lg ${
            isActive ? "text-secondary" : "text-gray-600"
          }`
        }
      >
        <MessageSquare className="h-5 w-5" />
        <span className="text-xs mt-1">Chat</span>
      </NavLink>

      <NavLink
        to="marketplace"
        className={({ isActive }) =>
          `flex flex-col items-center p-2 rounded-lg ${
            isActive ? "text-secondary" : "text-gray-600"
          }`
        }
      >
        <Wallet className="h-5 w-5" />
        <span className="text-xs mt-1">Market</span>
      </NavLink>

      <NavLink
        to="integrations"
        className={({ isActive }) =>
          `flex flex-col items-center p-2 rounded-lg ${
            isActive ? "text-secondary" : "text-gray-600"
          }`
        }
      >
        <LinkIcon className="h-5 w-5" />
        <span className="text-xs mt-1">Connect</span>
      </NavLink>

      <NavLink
        to="profile"
        className={({ isActive }) =>
          `flex flex-col items-center p-2 rounded-lg ${
            isActive ? "text-secondary" : "text-gray-600"
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
            `flex flex-col items-center p-2 rounded-lg ${
              isActive ? "text-secondary" : "text-gray-600"
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