import { Button } from "@/components/ui/button";

interface CompanyNameProps {
  companyName: string;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  setCompanyName: (value: string) => void;
  onSave: () => void;
}

export const CompanyName = ({ 
  companyName, 
  isEditing, 
  setIsEditing, 
  setCompanyName, 
  onSave 
}: CompanyNameProps) => {
  return (
    <div className="mb-2">
      {isEditing ? (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="text-2xl font-bold bg-white border rounded px-2 py-1"
            placeholder="Enter company name"
          />
          <Button variant="secondary" size="sm" onClick={onSave}>
            Save
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </div>
      ) : (
        <h1 
          className="text-2xl font-bold text-white cursor-pointer hover:underline"
          onClick={() => setIsEditing(true)}
        >
          {companyName || "Add Company Name"}
        </h1>
      )}
    </div>
  );
};