import React from "react";
import { Maven } from "@/types/maven";
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
        <div className="flex flex-row items-center bg-yellow-100 dark:bg-yellow-900 p-4 mb-6 rounded-lg">
          <span className="flex items-center justify-center w-6 h-6 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              type="chevrons-down"
              className="text-foreground dark:text-foreground"
            >
              <polyline points="7 13 12 18 17 13" />
              <polyline points="7 6 12 11 17 6" />
            </svg>
          </span>
          <span className="font-bold text-foreground dark:text-foreground">
            Sign the contract by scrolling to the bottom of this page.
          </span>
        </div>
        <div className="content text-foreground dark:text-foreground">
          <h3 className="text-gray-700 text-2xl font-serif mb-4">
            Opportunity Knocks Accolade Agreement
          </h3>
          <p className="mb-4">
            This is an agreement between {mavenName} (the "Maven") and {maestroName} (the "Maestro").
          </p>
          <p className="mb-4">
            The purpose of this educational Accolade relationship (the “Relationship”) is for the Maven to learn about the Maestro’s business, non-profit, venture or other organization (the “Company”) for the purpose of gaining significant and valuable insight and experience for her personal growth through the skill development of the Maven. The Relationship shall be on the following terms and conditions:
          </p>
          <p className="mb-4">
            1. <strong>Term.</strong> The Relationship is for a fixed, 3 month term commencing on {startDate} and ending on {endDate} (the “Term”), unless the Relationship ends earlier in accordance with the provisions set out in this agreement.
          </p>
          <p className="mb-4">
            2. <strong>Duties and Responsibilities of the Maestro.</strong> During the Term, the Maestro or the Maestro’s designate, who shall be a close and trusted colleague of the Maestro (the “Designee”), will provide the Maven with skill development and learning opportunities. The Maestro may re-assign, re-allocate, or re-organize the Maven's duties or responsibilities as circumstances change and this agreement will continue to apply to the Maven. The Maestro shall arrange for the Maven to receive direct supervision by an appropriate supervisor (the “Supervisor”).
          </p>
          <p className="mb-4">
            3. <strong>Duties and Responsibilities of the Maven.</strong> During the Term, the Maven’s duties and responsibilities include, but are not limited to:
          </p>
          <ol className="list-decimal list-inside mb-4">
            <li className="mb-2">
              engaging in such learning opportunities as the Maestro, Designee or the Supervisor provides, to the best of their abilities;
            </li>
            <li className="mb-2">
              consistently demonstrating honesty, punctuality, courtesy, a cooperative attitude, and a willingness to learn; and
            </li>
            <li>
              providing the Maestro, Designee and the Supervisor with such information, assignments and reports as may be required from time to time.
            </li>
          </ol>
          <p className="mb-4">
            4. <strong>Hours.</strong> The Maven and the Maestro will jointly establish a schedule to govern the Relationship (the “Schedule”). Both the Maestro and the Maven shall comply with the Schedule, as amended from time to time with the Maestro and the Maven’s mutual agreement. The Maven shall commit a maximum of ten (10) hours each week in respect of the Relationship. The Maestro shall commit a maximum of two (2) hours each week to provide the Mavens with consistent feedback and skill development, as agreed upon prior to the Relationship.
          </p>
          <p className="mb-4">
            5. <strong>Accolade</strong> position. The Maven acknowledges and agrees that he or she is not engaging in the Relationship as an employee and is not entitled to receive any wages for work performed or services supplied to the Maestro or the Company. At no time will the Maven be retroactively entitled to compensation in respect of the Relationship.
          </p>
          <p className="mb-4">
            6. <strong>Acknowledgements and Representations.</strong>
          </p>
          <ol className="list-decimal list-inside mb-4">
            <li className="mb-2">
              The Maven and the employer clearly understand that there is no expectation of compensation. Any promise of compensation, expressed or implied to suggest that the Maven is an employee during the Relationship.
            </li>
            <li className="mb-2">
              There is no guarantee or expectation that the Relationship will result in the Maestro or the Company employing the Maven.
            </li>
            <li className="mb-2">
              The Maestro agrees that the Accolade will not replace or displace any employee of the Maestro or the Company.
            </li>
            <li className="mb-2">
              With the Maestro’s discretion and upon successful completion of the Relationship, the Maven is entitled to the receipt of a certificate demonstrating the completion of the Accolade.
            </li>
            <li className="mb-2">
              The Relationship shall accommodate the Mavens academic commitments by corresponding to their academic or non academic calendar.
            </li>
            <li>
              The Accolade duration is limited to the lesser of 3 months or the period in which the internship provides the intern with beneficial learning.
            </li>
          </ol>
          <p className="mb-4">
            7. <strong>Termination.</strong> The Maestro may at any time in her sole discretion, contact our membership success team to terminate the Relationship. The Maven may terminate the Relationship for any reason after discussing such reasons with the Maestro or the Supervisor.
          </p>
          <p className="mb-4">
            8. <strong>Confidential Information.</strong> As a Maven of the Maestro and the Company, the Maven acknowledges that the Maven will gain knowledge and exposure to the Maestro’s and the Company’s confidential and proprietary information (“Confidential Information”), which includes anything developed by the Maven during the course of the Relationship. The Maven agrees to waive any rights the Maven has to such works, including moral and proprietary rights, and to execute whatever documentation is required to affect the same. Confidential Information includes records, documents, information and work in progress, and copies thereof, known or used by the Maestro or the Company in connection with its business and affairs, including but not limited to:
          </p>
          <ol className="list-decimal list-inside mb-4">
            <li className="mb-2">
              information relating to any product, device, equipment, service or machine;
            </li>
            <li className="mb-2">
              compilation of information (including lists of present and prospective customers and buying habits), data programs, codes, methods, techniques or processes;
            </li>
            <li className="mb-2">
              information about or relating to the Company’s customers, employees, contractors or suppliers;
            </li>
            <li className="mb-2">
              The Company’s business and marketing plans, present and future, including pricing and sales policies and concepts;
            </li>
            <li className="mb-2">
              information about or relating to the Company’s potential business ventures;
            </li>
            <li className="mb-2">
              financial information relating to the Company and its activities;
            </li>
            <li>
              trade secrets, inventions, research and development, and related material.
            </li>
          </ol>
          <p className="mb-4">
            The Maven acknowledges that Confidential Information obtained by the Maven in the course of the Relationship shall remain the exclusive property of the Company and the Maven agrees not to remove Confidential Information from the premises of the Company without written authorization of the Company.
          </p>
          <p className="mb-4">
            During the Relationship or at any time thereafter, the Maven agrees to treat and hold Confidential Information in an extremely confidential manner. The Maven agrees not to retain, reproduce or disclose Confidential Information to any person except as may be authorized by the Maestro for purposes relating to the Relationship. The Maven agrees not to disclose Confidential Information to any third party or to utilize such information in a manner that would be against the interest of the Company either during or after the Term. The Maven agrees to comply with all security measures and to follow all instructions formed by the Company in order to safeguard and protect Confidential Information. The Maven will advise the Company of any unauthorized disclosure or use of Confidential Information of which the Maven becomes aware at any time.
          </p>
          <p className="mb-4">
            9. <strong>General.</strong> This Agreement may be amended only by a written instrument signed by both parties. This Agreement shall be governed by and construed in accordance with the laws of the province of Ontario and the federal laws of Canada applicable therein. The parties irrevocably attorn to the jurisdiction of the courts of Ontario.
          </p>
          <p className="mb-4">
            This Agreement constitutes the entire understanding between the parties with respect to the subject matter hereof and supersedes all prior negotiations, discussions, agreements or understandings between them with respect to the subject matter hereof.
          </p>
          <p className="mb-4">
            IN WITNESS WHEREOF, the parties have executed this Accolade Agreement on the date and year set out below.
          </p>
          <p className="mb-4">
            <span className="block border-b border-gray-500 pb-1">
              __________________________
            </span>
            <br />
            Maven
            <br />
            Date: {currentDate}
          </p>
          <p className="mb-4">
            <span className="block border-b border-gray-500 pb-1">
              __________________________
            </span>
            <br />
            Maestro
            <br />
            Date: {currentDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OpportunityKnocksAccoladeAgreement;
