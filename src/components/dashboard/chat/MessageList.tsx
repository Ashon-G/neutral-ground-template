import { Message } from "@/types/chat";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

type MessageListProps = {
  messages: Message[];
  currentUserId: string;
};

export const MessageList = ({ messages, currentUserId }: MessageListProps) => {
  return (
    <ScrollArea className="flex-1 p-6">
      <div className="space-y-6">
        {messages?.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender_id === currentUserId ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                msg.sender_id === currentUserId
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted/50"
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <p className="text-sm font-medium">{msg.sender?.full_name}</p>
                <p className="text-xs text-muted-foreground/75">
                  {format(new Date(msg.created_at), "MMM d, h:mm a")}
                </p>
              </div>
              <p className="break-words text-sm leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};