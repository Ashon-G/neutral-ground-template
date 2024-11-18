import { Message } from "@/types/chat";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { FileIcon } from "lucide-react";

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

export const MessageList = ({ messages, currentUserId }: MessageListProps) => {
  const renderMessageContent = (content: string) => {
    // Check if the message contains a file attachment
    const fileMatch = content.match(/\[File: (.*?)\]\((.*?)\)/);
    if (fileMatch) {
      const [_, fileName, fileUrl] = fileMatch;
      const fileExt = fileName.split('.').pop()?.toLowerCase();
      
      // Check if it's an image
      if (['png', 'jpg', 'jpeg', 'gif'].includes(fileExt || '')) {
        return (
          <div className="mt-2">
            <img 
              src={fileUrl} 
              alt={fileName} 
              className="max-w-[300px] rounded-lg"
            />
            <a 
              href={fileUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:underline"
            >
              {fileName}
            </a>
          </div>
        );
      }
      
      // Other file types
      return (
        <div className="mt-2">
          <a 
            href={fileUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <FileIcon className="h-4 w-4" />
            {fileName}
          </a>
        </div>
      );
    }
    
    // Regular message
    return <p className="leading-relaxed">{content}</p>;
  };

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message) => {
          const isCurrentUser = message.sender_id === currentUserId;

          return (
            <div
              key={message.id}
              className={cn("flex items-start gap-3", {
                "flex-row-reverse": isCurrentUser,
              })}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={message.sender?.avatar_url} />
                <AvatarFallback>
                  {message.sender?.full_name?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "rounded-lg px-3 py-2 max-w-[70%] break-words",
                  {
                    "bg-primary text-primary-foreground": isCurrentUser,
                    "bg-muted": !isCurrentUser,
                  }
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">
                    {message.sender?.full_name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(message.created_at), "p")}
                  </span>
                </div>
                {renderMessageContent(message.content)}
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};
