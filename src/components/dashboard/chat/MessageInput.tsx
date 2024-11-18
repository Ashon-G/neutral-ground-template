import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send, FileText } from "lucide-react";

type MessageInputProps = {
  message: string;
  setMessage: (message: string) => void;
  onSend: () => void;
  isPending: boolean;
  showAgreementButton?: boolean;
  onSendAgreement?: () => void;
};

export const MessageInput = ({
  message,
  setMessage,
  onSend,
  isPending,
  showAgreementButton,
  onSendAgreement,
}: MessageInputProps) => {
  return (
    <div className="flex gap-2 p-4 border-t bg-white">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1"
        onKeyDown={(e) => {
          if (e.key === "Enter" && message) {
            onSend();
          }
        }}
      />
      {showAgreementButton && (
        <Button 
          variant="outline" 
          size="icon"
          onClick={onSendAgreement}
          title="Send Agreement"
          className="bg-white hover:bg-gray-100"
        >
          <FileText className="h-4 w-4 text-gray-600" />
        </Button>
      )}
      <Button 
        onClick={onSend} 
        disabled={!message || isPending} 
        size="icon"
        className="bg-primary hover:bg-primary/90"
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};