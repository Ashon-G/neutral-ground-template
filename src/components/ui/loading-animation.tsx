import { Loader2 } from "lucide-react";

export const LoadingAnimation = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
};