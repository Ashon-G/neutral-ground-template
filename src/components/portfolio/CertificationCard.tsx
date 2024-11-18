import { Card, Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";

export const CertificationCard = () => {
  return (
    <Card className="max-w-[340px] mb-6">
      <div className="p-6 pb-0">
        <Trophy className="w-12 h-12 text-primary mb-4" />
        <h3 className="text-xl font-semibold">
          Maven Excellence Certificate
        </h3>
      </div>
      <div className="p-6">
        <p className="text-muted-foreground mt-2">
          Each completed project earns you a Maven Excellence Certificate. Add it to your LinkedIn 
          profile or resume to showcase your verified expertise and successful project deliveries.
        </p>
        <div className="mt-4">
          <Button
            variant="outline"
            className="h-12 px-6 rounded-xl hover:bg-primary/5"
          >
            View Sample Certificate
          </Button>
        </div>
      </div>
    </Card>
  );
};