import { useState, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, FileText } from "lucide-react";

interface MessageInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSend: () => void;
  isPending?: boolean;
  showAgreementButton?: boolean;
  onSendAgreement?: () => void;
}

export const MessageInput = ({
  message,
  setMessage,
  onSend,
  isPending,
  showAgreementButton,
  onSendAgreement,
}: MessageInputProps) => {
  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        onSend();
      }
    }
  };

  return (
    <div className="p-4 border-t border-border/10 bg-white">
      <div className="flex items-end gap-2">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          className="min-h-[2.5rem] max-h-32 resize-none bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-secondary"
          disabled={isPending}
        />
        <div className="flex gap-2">
          {showAgreementButton && onSendAgreement && (
            <Button 
              variant="outline" 
              size="icon"
              onClick={onSendAgreement}
              className="shrink-0"
            >
              <FileText className="h-4 w-4" />
            </Button>
          )}
          <Button 
            onClick={() => message.trim() && onSend()} 
            disabled={!message.trim() || isPending}
            size="icon"
            className="shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};