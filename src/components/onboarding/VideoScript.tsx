import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export const VideoScript = () => {
  const scenes = [
    {
      page: "Landing Page",
      timing: "0:00 - 0:30",
      script: "Welcome to Maven, the platform that connects ambitious founders with talented student developers and marketers. Our platform makes it easy to build and launch your products faster than ever before. Let me show you around.",
      visualNotes: "Show the landing page hero section with the animated elements and scrolling logos of universities."
    },
    {
      page: "Signup Process",
      timing: "0:30 - 1:00",
      script: "Getting started is simple. Choose whether you're a founder looking to build your next big thing, or a student maven ready to contribute your skills. Our streamlined signup process lets you create your profile in minutes.",
      visualNotes: "Demonstrate the signup flow, showing both founder and maven options."
    },
    {
      page: "Marketplace",
      timing: "1:00 - 1:45",
      script: "For founders, our marketplace is where you'll find talented student mavens. Browse through profiles, see their skills, university background, and previous work. Each maven brings fresh perspectives and cutting-edge knowledge from top universities.",
      visualNotes: "Show the marketplace interface, filtering options, and maven profiles."
    },
    {
      page: "Task Management",
      timing: "1:45 - 2:30",
      script: "Once you're connected with mavens, our task management system makes collaboration seamless. Create tasks, set deadlines, and track progress all in one place. For mavens, you'll see your assigned tasks and can easily update their status as you progress.",
      visualNotes: "Demonstrate the kanban board, task creation, and status updates."
    },
    {
      page: "Chat System",
      timing: "2:30 - 3:00",
      script: "Communication is key to successful collaboration. Our built-in chat system lets founders and mavens discuss projects, share ideas, and stay aligned on goals. It's all integrated right into the platform.",
      visualNotes: "Show the chat interface, message threading, and file sharing capabilities."
    },
    {
      page: "Integrations",
      timing: "3:00 - 3:30",
      script: "Maven integrates with the tools you already use. Connect with Slack for notifications, or sync with Jira for project management. This ensures smooth workflow integration with your existing processes.",
      visualNotes: "Display the integrations page, showing Slack and Jira connection options."
    },
    {
      page: "Profile Management",
      timing: "3:30 - 4:00",
      script: "Both founders and mavens can manage their profiles easily. Founders can track their projects and maven collaborations, while students can showcase their skills, education, and availability.",
      visualNotes: "Show profile editing, skill management, and availability settings."
    },
    {
      page: "Pricing & Upgrade",
      timing: "4:00 - 4:30",
      script: "We offer flexible pricing options to suit your needs. Start with our basic plan and upgrade as your team grows. Plus, eligible startups can apply for special student-friendly rates.",
      visualNotes: "Display pricing plans and upgrade options."
    },
    {
      page: "Closing",
      timing: "4:30 - 5:00",
      script: "Ready to accelerate your startup's growth with fresh talent? Join Maven today and connect with ambitious student mavens who can help bring your vision to life. Sign up now to get started!",
      visualNotes: "Show call-to-action buttons and final landing page elements."
    }
  ];

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-8">Maven Video Introduction Script</h1>
      <p className="text-muted-foreground mb-8">
        Total Duration: 5 minutes<br />
        Target Audience: Potential founders and student mavens
      </p>
      
      <ScrollArea className="h-[600px] rounded-md border p-4">
        {scenes.map((scene, index) => (
          <Card key={index} className="p-6 mb-4">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-primary">{scene.page}</h2>
              <span className="text-sm text-muted-foreground">{scene.timing}</span>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Script:</h3>
                <p className="text-muted-foreground">{scene.script}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Visual Notes:</h3>
                <p className="text-muted-foreground">{scene.visualNotes}</p>
              </div>
            </div>
          </Card>
        ))}
      </ScrollArea>
    </div>
  );
};