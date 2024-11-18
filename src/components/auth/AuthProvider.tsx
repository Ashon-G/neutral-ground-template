import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import { toast } from "@/components/ui/use-toast";

interface AuthContextType {
  session: Session | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const ensureProfile = async (userId: string, email: string) => {
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (fetchError || !profile) {
      // Profile doesn't exist, create it
      const { error: insertError } = await supabase
        .from('profiles')
        .insert([{ 
          id: userId,
          username: email
        }]);

      if (insertError) {
        toast({
          title: "Error",
          description: "Failed to create user profile",
          variant: "destructive",
        });
      }
    } else if (profile.username !== email) {
      // Update username if it doesn't match email
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ username: email })
        .eq('id', userId);

      if (updateError) {
        toast({
          title: "Error",
          description: "Failed to update profile email",
          variant: "destructive",
        });
      }
    }
  };

  useEffect(() => {
    async function initAuth() {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        if (initialSession?.user) {
          await ensureProfile(initialSession.user.id, initialSession.user.email || '');
        }
        
        setSession(initialSession);

        if (!initialSession && location.pathname.startsWith('/dashboard')) {
          navigate("/login", { replace: true });
        } else if (initialSession) {
          const userType = initialSession.user.user_metadata.user_type;
          if (location.pathname === '/login' || location.pathname === '/') {
            const defaultPath = userType === 'founder' ? '/dashboard/marketplace' : '/dashboard/tasks';
            navigate(defaultPath, { replace: true });
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    }

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await ensureProfile(session.user.id, session.user.email || '');
      }
      
      setSession(session);
      
      if (!session && location.pathname.startsWith('/dashboard')) {
        navigate("/login", { replace: true });
      } else if (session) {
        const userType = session.user.user_metadata.user_type;
        if (location.pathname === '/login' || location.pathname === '/') {
          const defaultPath = userType === 'founder' ? '/dashboard/marketplace' : '/dashboard/tasks';
          navigate(defaultPath, { replace: true });
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location.pathname]);

  const value = {
    session,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <LoadingAnimation />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}