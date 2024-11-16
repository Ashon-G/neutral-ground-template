import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";

interface MavenAvailabilityProps {
  availability: any;
}

export const MavenAvailability = ({ availability }: MavenAvailabilityProps) => {
  if (!availability) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
        <Calendar className="h-5 w-5" />
        Availability
      </h3>
      <div className="bg-secondary/10 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-4 w-4" />
          <span className="text-gray-700">{availability.location_preference}</span>
        </div>
        <p className="font-medium text-gray-800">{availability.role_type}</p>
        <p className="text-sm text-gray-600">
          Available from {format(new Date(availability.start_date), 'MMM dd, yyyy')} to{' '}
          {format(new Date(availability.end_date), 'MMM dd, yyyy')}
        </p>
      </div>
    </div>
  );
};