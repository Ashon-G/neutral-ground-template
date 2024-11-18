import { Button } from "@/components/ui/button";
import { BusinessInfo } from "@/integrations/supabase/types/business";

interface BannerImageProps {
  business: BusinessInfo | null;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BannerImage = ({ business, onImageUpload }: BannerImageProps) => {
  return (
    <div className="relative h-48 bg-gradient-to-r from-blue-400 via-purple-500 to-orange-500">
      {business?.banner_image && (
        <img
          src={business.banner_image}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      )}
      <Button
        variant="secondary"
        size="sm"
        className="absolute top-4 right-4 bg-white"
        onClick={() => document.getElementById('banner-upload')?.click()}
      >
        Change header
      </Button>
      <input
        id="banner-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onImageUpload}
      />
    </div>
  );
};