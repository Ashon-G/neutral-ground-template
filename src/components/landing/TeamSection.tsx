import { Card, CardContent } from "@/components/ui/card";

const teamMembers = [
  {
    name: "Cassie",
    role: "Customer Support",
    image: "https://cdn.prod.website-files.com/661d4f6d81ac1042b721396c/662a8b8387791351ca1d5099_employee-8.webp",
    gradient: "bg-gradient-to-r from-[#863CD1] to-[#28BFEF]",
  },
  {
    name: "Dexter",
    role: "Data Analyst",
    image: "https://cdn.prod.website-files.com/661d4f6d81ac1042b721396c/662a8b8393dde5da26d805a5_employee-1.webp",
    gradient: "bg-gradient-to-r from-[#B88D63] to-[#FF6767]",
  },
  {
    name: "Buddy",
    role: "Business Development",
    image: "https://cdn.prod.website-files.com/661d4f6d81ac1042b721396c/662a8b83169c5a884ae3e697_employee-3.webp",
    gradient: "bg-gradient-to-r from-[#9CFFD6] to-[#49ADE6]",
  },
  {
    name: "Soshie",
    role: "Social Media Manager",
    image: "https://cdn.prod.website-files.com/661d4f6d81ac1042b721396c/662a8b83bced61701891d97b_employee-4.webp",
    gradient: "bg-gradient-to-r from-[#E1E0FF] to-[#6849E6]",
  },
  {
    name: "Emmie",
    role: "Email Marketer",
    image: "https://cdn.prod.website-files.com/661d4f6d81ac1042b721396c/662a8b85b4812f5b928b5c41_employee-2.webp",
    gradient: "bg-gradient-to-r from-[#F0E2BF] to-[#ECAF3A]",
  },
  {
    name: "Gigi",
    role: "Personal Coach",
    image: "https://cdn.prod.website-files.com/661d4f6d81ac1042b721396c/662a8b83ad2f546624ca5acb_employee-5.webp",
    gradient: "bg-gradient-to-r from-[#9DC823] to-[#1DC37D]",
  },
  {
    name: "Scouty",
    role: "Recruiter",
    image: "https://cdn.prod.website-files.com/661d4f6d81ac1042b721396c/662a8b84a7e1416674940720_employee-6.webp",
    gradient: "bg-gradient-to-r from-[#3CD7B2] to-[#1BDCE9]",
  },
  {
    name: "Penn",
    role: "Copywriter",
    image: "https://cdn.prod.website-files.com/661d4f6d81ac1042b721396c/662a8b84dd4476d231d14640_employee-7.webp",
    gradient: "bg-gradient-to-r from-[#67B66E] to-[#3AE1EC]",
  },
  {
    name: "Commet",
    role: "eCommerce",
    image: "https://cdn.prod.website-files.com/661d4f6d81ac1042b721396c/663e0beb9fa2334e36f66e7b_commet.webp",
    gradient: "bg-gradient-to-r from-[#FFE2D1] to-[#FB822E]",
  },
  {
    name: "Milli",
    role: "Sales Manager",
    image: "https://cdn.prod.website-files.com/661d4f6d81ac1042b721396c/663e0b79ab22c1ad768d2bb3_business-2.webp",
    gradient: "bg-gradient-to-r from-[#FBC0FF] to-[#B62CCA]",
  },
  {
    name: "Seomy",
    role: "SEO Specialist",
    image: "https://cdn.prod.website-files.com/661d4f6d81ac1042b721396c/663e0b7a0c608a30f0bf4cbd_business-3.webp",
    gradient: "bg-gradient-to-r from-[#D2FF94] to-[#97DA39]",
  },
  {
    name: "Vizzy",
    role: "Virtual Assistant",
    image: "https://cdn.prod.website-files.com/661d4f6d81ac1042b721396c/663e0b791b30efd3598519c5_business-1.webp",
    gradient: "bg-gradient-to-r from-[#FFE39D] to-[#E8B124]",
  },
];

export const TeamSection = () => {
  return (
    <div className="w-full bg-black text-white px-10 py-32">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-48">
          <div className="max-w-[768px]">
            <h2 className="text-5xl font-medium tracking-tight mb-4">
              Meet your team.
              <br />
              <span className="text-gray-400">For all core areas.</span>
            </h2>
          </div>
        </div>

        <div className="flex flex-nowrap overflow-x-auto gap-2.5 pb-4">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="min-w-[176px] max-w-[176px] bg-transparent border-none text-center"
            >
              <CardContent className="p-0">
                <h2
                  className={`font-wonder-kids text-5xl leading-[56px] ${member.gradient} bg-clip-text text-transparent`}
                >
                  {member.name}
                </h2>
                <div className="relative h-72 w-[175px]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-72 object-contain object-bottom"
                  />
                </div>
                <div className="pt-8">
                  <div className="text-gray-400">{member.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};