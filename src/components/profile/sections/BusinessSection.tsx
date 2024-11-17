import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2 } from "lucide-react";
import { UseFormRegister } from "react-hook-form";
import { ProfileFormData } from "../types";

type Props = {
  register: UseFormRegister<ProfileFormData>;
};

export const BusinessSection = ({ register }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Building2 className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Business Information</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Business Name</Label>
          <Input {...register("business.name")} />
        </div>

        <div className="space-y-2">
          <Label>Website</Label>
          <Input {...register("business.website")} type="url" />
        </div>

        <div className="space-y-2">
          <Label>Industry</Label>
          <Select onValueChange={(value) => register("business.industry").onChange({ target: { value } })}>
            <SelectTrigger>
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Stage</Label>
          <Select onValueChange={(value) => register("business.stage").onChange({ target: { value } })}>
            <SelectTrigger>
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="idea">Idea Stage</SelectItem>
              <SelectItem value="mvp">MVP</SelectItem>
              <SelectItem value="early">Early Stage</SelectItem>
              <SelectItem value="growth">Growth</SelectItem>
              <SelectItem value="scale">Scale</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Year Started</Label>
          <Input {...register("business.yearStarted")} type="number" />
        </div>

        <div className="space-y-2">
          <Label>EIN/Tax ID (Optional)</Label>
          <Input {...register("business.taxId")} />
        </div>

        <div className="space-y-2">
          <Label>Address</Label>
          <Input {...register("business.address")} />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Business Description</Label>
          <Textarea {...register("business.description")} />
        </div>
      </div>
    </div>
  );
};