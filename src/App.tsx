import { useEffect } from "react";
import { AppRoutes } from "./AppRoutes";
import { useAuth } from "@/components/auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const { session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/dashboard");
    }
  }, [session, navigate]);

  return <AppRoutes />;
}

export default App;