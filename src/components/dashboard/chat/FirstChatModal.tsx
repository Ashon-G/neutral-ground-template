import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface FirstChatModalProps {
  open: boolean;
  onClose: () => void;
}

export const FirstChatModal = ({ open, onClose }: FirstChatModalProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Welcome to Your First Conversation!</AlertDialogTitle>
          <AlertDialogDescription className="space-y-4 text-base">
            <p>
              Start by first introducing yourself and your company, what your
              company does, and what you&apos;re looking for help with.
            </p>
            <p>
              Make sure to always be professional when communicating with Mavens on
              the platform.
            </p>
            <p className="font-medium text-destructive">
              OK Maven does not tolerate any hate speech, insults, threats or
              communication about guns, violence, drugs, racism, porn, or any
              subject that violates our terms and conditions. Violators will be
              permanently removed and banned.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={onClose}>I understand</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};