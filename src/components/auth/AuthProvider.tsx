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
    try {
      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (fetchError || !profile) {
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([{ 
            id: userId,
            username: email
          }]);

        if (insertError) {
          console.error('Error creating profile:', insertError);
        }
      }
    } catch (error) {
      console.error('Error in ensureProfile:', error);
    }
  };

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        if (!mounted) return;

        if (initialSession?.user) {
          await ensureProfile(initialSession.user.id, initialSession.user.email || '');
          setSession(initialSession);
        }
        
        setLoading(false);

        if (!initialSession && location.pathname.startsWith('/dashboard')) {
          navigate("/login", { replace: true });
        } else if (initialSession?.user) {
          const userType = initialSession.user.user_metadata.user_type;
          if (location.pathname === '/login' || location.pathname === '/') {
            const defaultPath = userType === 'founder' ? '/dashboard/marketplace' : '/dashboard/tasks';
            navigate(defaultPath, { replace: true });
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;

      if (session?.user) {
        await ensureProfile(session.user.id, session.user.email || '');
        setSession(session);
      } else {
        setSession(null);
      }

      if (!session && location.pathname.startsWith('/dashboard')) {
        navigate("/login", { replace: true });
      } else if (session?.user) {
        const userType = session.user.user_metadata.user_type;
        if (location.pathname === '/login' || location.pathname === '/') {
          const defaultPath = userType === 'founder' ? '/dashboard/marketplace' : '/dashboard/tasks';
          navigate(defaultPath, { replace: true });
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-white">
          <LoadingAnimation />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}