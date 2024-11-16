import { FileText } from "lucide-react";

interface MavenDocumentsProps {
  documents: any[];
}

export const MavenDocuments = ({ documents }: MavenDocumentsProps) => {
  if (!documents?.length) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
        <FileText className="h-5 w-5" />
        Documents
      </h3>
      <div className="space-y-2">
        {documents.map((doc) => (
          <a
            key={doc.id}
            href={doc.document_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-secondary/10 rounded-lg p-4 hover:bg-secondary/20 transition-colors"
          >
            <p className="font-medium text-gray-800">{doc.document_type}</p>
            <p className="text-sm text-blue-500">View Document</p>
          </a>
        ))}
      </div>
    </div>
  );
};