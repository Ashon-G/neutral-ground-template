import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAuth } from "@/components/auth/AuthProvider";
import { TaskDialogHeader } from "./TaskDialogHeader";
import { TaskDialogContent } from "./TaskDialogContent";
import { RatingDialog } from "./RatingDialog";
import { MobileFullscreenDialog } from "./MobileFullscreenDialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTaskDialog } from "./hooks/useTaskDialog";
import { Task } from "@/integrations/supabase/types/task";
import { Button } from "@/components/ui/button";

interface TaskDialogProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TaskDialog = ({ task, open, onOpenChange }: TaskDialogProps) => {
  const { session } = useAuth();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const {
    isEditing,
    setIsEditing,
    editedTitle,
    setEditedTitle,
    editedDescription,
    setEditedDescription,
    editedStartDate,
    setEditedStartDate,
    editedEndDate,
    setEditedEndDate,
    showRating,
    setShowRating,
    deleteTask,
    handleStatusChange,
    handleSave,
  } = useTaskDialog(task, onOpenChange);

  const canEdit = session?.user.id === task.created_by;

  const dialogContent = (
    <div className="flex flex-col h-full">
      <TaskDialogHeader
        title={task.title}
        isEditing={isEditing}
        editedTitle={editedTitle}
        setEditedTitle={setEditedTitle}
      />
      <div className="flex-1 overflow-y-auto">
        <TaskDialogContent
          description={task.description}
          isEditing={isEditing}
          editedDescription={editedDescription}
          setEditedDescription={setEditedDescription}
          assignee={task.assignee}
          dueDate={task.due_date}
          status={task.status}
          onStatusChange={handleStatusChange}
          startDate={task.start_date}
          endDate={task.end_date}
          onStartDateChange={setEditedStartDate}
          onEndDateChange={setEditedEndDate}
        />
      </div>
      <div className="flex justify-end gap-2 pt-4 border-t">
        {canEdit && (
          <>
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedTitle(task.title);
                    setEditedDescription(task.description || "");
                    setEditedStartDate(task.start_date);
                    setEditedEndDate(task.end_date);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save</Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditedTitle(task.title);
                    setEditedDescription(task.description || "");
                    setEditedStartDate(task.start_date);
                    setEditedEndDate(task.end_date);
                    setIsEditing(true);
                  }}
                >
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => deleteTask.mutate()}>
                  Delete
                </Button>
              </>
            )}
          </>
        )}
      </div>
      {task.assignee?.id && (
        <RatingDialog
          open={showRating}
          onOpenChange={setShowRating}
          taskId={task.id}
          mavenId={task.assignee.id}
          founderId={task.created_by}
        />
      )}
    </div>
  );

  if (isMobile) {
    return (
      <MobileFullscreenDialog open={open} onClose={() => onOpenChange(false)}>
        {dialogContent}
      </MobileFullscreenDialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        {dialogContent}
      </DialogContent>
    </Dialog>
  );
};