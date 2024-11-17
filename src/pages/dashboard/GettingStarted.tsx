import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";

interface VideoCard {
  title: string;
  duration: string;
  thumbnail: string;
  date: string;
  isNew?: boolean;
}

const GettingStarted = () => {
  const videos: VideoCard[] = [
    {
      title: "Collaborating with your Mavens",
      duration: "2:50",
      thumbnail: "/images/board column.svg",
      date: "Mar 25, 2024",
      isNew: true,
    },
    {
      title: "Managing your projects",
      duration: "3:18",
      thumbnail: "/images/board column.svg",
      date: "Mar 25, 2024",
    },
    {
      title: "Setting up integrations",
      duration: "1:53",
      thumbnail: "/images/board column.svg",
      date: "Mar 25, 2024",
    },
    {
      title: "Welcome to Maven",
      duration: "5:51",
      thumbnail: "/images/chat.svg",
      date: "Mar 25, 2024",
      isNew: true,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Series</h2>
        <button className="text-blue-500 hover:text-blue-600">View all</button>
      </div>

      <div className="grid gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Getting Started With Maven</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {videos.map((video, index) => (
              <Card key={index} className="overflow-hidden group cursor-pointer">
                <div className="relative aspect-video bg-neutral-100">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium line-clamp-2">{video.title}</h4>
                    {video.isNew && (
                      <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{video.date}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;