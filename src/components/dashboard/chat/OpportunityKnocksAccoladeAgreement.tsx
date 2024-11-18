import React from "react";
import { format } from "date-fns";

interface AgreementProps {
  mavenName: string;
  maestroName: string;
}

export const OpportunityKnocksAccoladeAgreement = ({ mavenName, maestroName }: AgreementProps) => {
  const currentDate = format(new Date(), 'MMMM do, yyyy');
  const startDate = format(new Date(), 'MMMM do, yyyy');
  const endDate = format(new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), 'MMMM do, yyyy');

  return (
    <div className="max-w-screen-xl mx-auto p-10 bg-background dark:bg-background print:p-0">
      <div className="mb-6 p-6 bg-card dark:bg-card shadow-lg rounded-lg border dark:border-border">
        <div className="warning-section mb-4">
          <p className="text-red-500 font-bold">
            Warning: This is a legal agreement. Please read carefully before signing.
          </p>
        </div>
        <div className="content text-foreground dark:text-foreground">
          <h3 className="text-gray-700 text-2xl font-serif mb-4">
            Opportunity Knocks Accolade Agreement
          </h3>
          <p className="mb-4">
            This is an agreement between {mavenName} (the "Maven") and {maestroName} (the "Maestro").
          </p>
          <p className="mb-4">
            This agreement is effective as of {currentDate}.
          </p>
          <h4 className="text-gray-600 font-semibold">Terms:</h4>
          <ul className="list-disc list-inside mb-4">
            <li>The start date of this agreement is {startDate}.</li>
            <li>The end date of this agreement is {endDate}.</li>
            <li>The Maestro agrees to provide guidance and support to the Maven during this period.</li>
          </ul>
          <p className="mb-4">
            By signing this agreement, both parties agree to the terms outlined above.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OpportunityKnocksAccoladeAgreement;
