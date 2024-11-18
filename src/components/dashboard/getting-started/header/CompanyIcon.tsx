import { Button } from "@/components/ui/button";
import { BusinessInfo } from "@/integrations/supabase/types/business";

interface CompanyIconProps {
  business: BusinessInfo | null;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CompanyIcon = ({ business, onImageUpload }: CompanyIconProps) => {
  return (
    <div className="relative">
      <div className="w-24 h-24 rounded-lg bg-white shadow-lg flex items-center justify-center overflow-hidden">
        {business?.company_icon ? (
          <img
            src={business.company_icon}
            alt="Company Icon"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
            Logo
          </div>
        )}
      </div>
      <Button
        variant="secondary"
        size="sm"
        className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-white"
        onClick={() => document.getElementById('icon-upload')?.click()}
      >
        +
      </Button>
      <input
        id="icon-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onImageUpload}
      />
    </div>
  );
};