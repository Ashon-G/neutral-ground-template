import { FileText } from "lucide-react";

interface Document {
  id: string;
  maven_id: string;
  document_type: string;
  document_url: string;
}

interface MavenDocumentsProps {
  documents: Document[] | null;
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
          <div key={doc.id} className="bg-secondary/10 rounded-lg p-4">
            <div className="space-y-2">
              <div>
                <p className="font-medium text-gray-800">{doc.document_type}</p>
                <a 
                  href={doc.document_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline"
                >
                  View Document
                </a>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500">Document ID: {doc.id}</p>
                <p className="text-xs text-gray-500">Maven ID: {doc.maven_id}</p>
                <p className="text-xs text-gray-500">Type: {doc.document_type}</p>
                <p className="text-xs text-gray-500 break-all">URL: {doc.document_url}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};