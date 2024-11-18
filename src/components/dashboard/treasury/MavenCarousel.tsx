import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Profile } from "@/integrations/supabase/types/profile";
import { MavenCard } from "./MavenCard";

interface MavenCarouselProps {
  title: string;
  mavens: Profile[];
}

export const MavenCarousel = ({ title, mavens }: MavenCarouselProps) => {
  if (mavens.length === 0) return null;

  return (
    <div className="py-6">
      <h2 className="mb-6 text-2xl font-semibold text-foreground">{title}</h2>
      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {mavens.map((maven) => (
              <CarouselItem key={maven.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <MavenCard maven={maven} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-12 bg-white" />
          <CarouselNext className="-right-12 bg-white" />
        </Carousel>
      </div>
    </div>
  );
};