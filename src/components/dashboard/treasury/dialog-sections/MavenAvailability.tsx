import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";

interface MavenAvailabilityProps {
  availability: {
    id: string;
    maven_id: string;
    start_date: string;
    end_date: string;
    role_type: string;
    location_preference: string;
  } | null;
}

export const MavenAvailability = ({ availability }: MavenAvailabilityProps) => {
  if (!availability) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
        <Calendar className="h-5 w-5" />
        Availability
      </h3>
      <div className="bg-secondary/10 rounded-lg p-4 space-y-3">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-600" />
              <span className="text-gray-700">{availability.location_preference}</span>
            </div>
            <p className="font-medium text-gray-800">{availability.role_type}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-600">Start Date</p>
            <p className="text-gray-800">{format(new Date(availability.start_date), 'MMMM dd, yyyy')}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">End Date</p>
            <p className="text-gray-800">{format(new Date(availability.end_date), 'MMMM dd, yyyy')}</p>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-200 space-y-2">
          <p className="text-xs text-gray-500">Availability ID: {availability.id}</p>
          <p className="text-xs text-gray-500">Maven ID: {availability.maven_id}</p>
          <p className="text-xs text-gray-500">Role Type: {availability.role_type}</p>
          <p className="text-xs text-gray-500">Location: {availability.location_preference}</p>
        </div>
      </div>
    </div>
  );
};