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
    <div className="space-y-8 bg-zinc-900 min-h-screen -mt-8 -mx-8 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Series</h2>
        <Button variant="link" className="text-blue-500 hover:text-blue-400">
          View all →
        </Button>
      </div>

      {/* Recent Highlights Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative w-48 aspect-video rounded-lg overflow-hidden bg-zinc-800">
            <img 
              src="/images/board column.svg"
              alt="Recent highlights"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">Recent highlights</h3>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500 text-white mt-2">
              New
            </span>
            <p className="text-sm text-zinc-400 mt-1">Mar 25th</p>
          </div>
        </div>
      </div>

      {/* Introducing Series Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative w-48 aspect-video rounded-lg overflow-hidden bg-zinc-800 group">
            <img 
              src="/images/chat.svg"
              alt="Welcome to Series"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Play className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">Introducing series</h3>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500 text-white mt-2">
              New
            </span>
            <p className="text-sm text-zinc-400 mt-1">Mar 25th</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-medium text-white">Getting Started With Maven</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {videos.map((video, index) => (
            <Card key={index} className="bg-zinc-800 border-zinc-700 overflow-hidden group cursor-pointer">
              <div className="relative aspect-video">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" />
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
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-white line-clamp-2">{video.title}</h4>
                  {video.isNew && (
                    <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      New
                    </span>
                  )}
                </div>
                <p className="text-sm text-zinc-400">{video.date}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;