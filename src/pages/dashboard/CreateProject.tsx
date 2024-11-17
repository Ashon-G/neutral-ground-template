import { ProjectForm } from "@/components/projects/ProjectForm";
import { motion } from "framer-motion";
import { Lightbulb, Rocket, Target } from "lucide-react";

const CreateProject = () => {
  const tips = [
    {
      icon: <Lightbulb className="h-5 w-5 text-yellow-500" />,
      title: "Be Specific",
      description: "Clearly define your project's scope and objectives to help Mavens understand your vision."
    },
    {
      icon: <Target className="h-5 w-5 text-blue-500" />,
      title: "Set Clear Goals",
      description: "Break down your project into measurable goals to track progress effectively."
    },
    {
      icon: <Rocket className="h-5 w-5 text-purple-500" />,
      title: "Timeline Matters",
      description: "Provide realistic timelines to help with resource allocation and planning."
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Create New Project</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Let's bring your vision to life! Fill out the details below to create a new project 
            and get matched with the perfect Maven for your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-background rounded-full">
                  {tip.icon}
                </div>
                <h3 className="font-semibold">{tip.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{tip.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm"
        >
          <ProjectForm />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CreateProject;