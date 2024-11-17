import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoCard {
  title: string;
  duration: string;
  thumbnail: string;
  date: string;
  isNew?: boolean;
  isHighlight?: boolean;
}

const GettingStarted = () => {
  const videos: VideoCard[] = [
    {
      title: "Collaborating with your team",
      duration: "2:50",
      thumbnail: "/images/board column.svg",
      date: "Mar 25, 2024",
      isNew: true,
      isHighlight: true,
    },
    {
      title: "Managing your videos",
      duration: "3:18",
      thumbnail: "/images/board column.svg",
      date: "Mar 25, 2024",
    },
    {
      title: "Syncing your meetings",
      duration: "1:53",
      thumbnail: "/images/board column.svg",
      date: "Mar 25, 2024",
    },
    {
      title: "👋 Welcome to Maven",
      duration: "5:51",
      thumbnail: "/images/chat.svg",
      date: "Mar 25, 2024",
      isNew: true,
      isHighlight: true,
    },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold">Series</h2>
        <Button variant="link" className="text-blue-500 hover:text-blue-400">
          View all →
        </Button>
      </div>

      {/* Stories-like Series Section */}
      <div className="flex gap-4 overflow-x-auto pb-4 mb-12">
        <div className="flex-shrink-0">
          <div className="relative w-32 h-48 rounded-lg overflow-hidden bg-gray-100 cursor-pointer group">
            <img 
              src="/images/board column.svg"
              alt="Recent highlights"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
              <h3 className="text-sm font-medium text-white">Recent highlights</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-blue-500 text-white">
                  New
                </span>
                <span className="text-[10px] text-white/80">Mar 25th</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0">
          <div className="relative w-32 h-48 rounded-lg overflow-hidden bg-gray-100 cursor-pointer group">
            <img 
              src="/images/chat.svg"
              alt="Welcome to Series"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Play className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
              <h3 className="text-sm font-medium text-white">Introducing series</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-blue-500 text-white">
                  New
                </span>
                <span className="text-[10px] text-white/80">Mar 25th</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-medium">Getting Started With Maven</h3>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {videos.map((video, index) => (
            <Card key={index} className="flex-shrink-0 w-64 overflow-hidden group cursor-pointer border-gray-200">
              <div className="relative aspect-video">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Play className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                  {video.duration}
                </div>
                {video.isHighlight && (
                  <div className="absolute top-2 left-2 bg-emerald-500/90 text-white text-xs px-2 py-0.5 rounded-full">
                    Highlights
                  </div>
                )}
              </div>
              <div className="p-3 space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm line-clamp-1">{video.title}</h4>
                  {video.isNew && (
                    <span className="bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                      New
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{video.date}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;