import { ProjectForm } from "@/components/projects/ProjectForm";

const CreateProject = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Project</h1>
      <ProjectForm />
    </div>
  );
};

export default CreateProject;