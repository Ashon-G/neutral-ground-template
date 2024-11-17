import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Plus } from "lucide-react";

interface ProjectFigmaFilesProps {
  figmaFiles: { url: string; title: string }[];
  onChange: (files: { url: string; title: string }[]) => void;
}

export const ProjectFigmaFiles = ({ figmaFiles, onChange }: ProjectFigmaFilesProps) => {
  const [newUrl, setNewUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const addFigmaFile = () => {
    if (!newUrl || !newTitle) return;
    
    // Validate Figma URL
    const figmaUrlPattern = /^https:\/\/([\w.-]+\.)?figma.com\/(file|proto)\/([0-9a-zA-Z]{22,128})/;
    if (!figmaUrlPattern.test(newUrl)) {
      alert("Please enter a valid Figma file URL");
      return;
    }

    onChange([...figmaFiles, { url: newUrl, title: newTitle }]);
    setNewUrl("");
    setNewTitle("");
  };

  const removeFigmaFile = (index: number) => {
    const newFiles = figmaFiles.filter((_, i) => i !== index);
    onChange(newFiles);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Figma Files</Label>
      </div>

      <div className="space-y-4">
        {figmaFiles.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg"
          >
            <div className="flex-1 mr-4">
              <p className="font-medium">{file.title}</p>
              <p className="text-sm text-muted-foreground truncate">{file.url}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeFigmaFile(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="space-y-4 pt-4 border-t">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter a title for the Figma file"
          />
        </div>
        <div className="space-y-2">
          <Label>Figma URL</Label>
          <div className="flex gap-2">
            <Input
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="Paste Figma file URL"
            />
            <Button onClick={addFigmaFile}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};