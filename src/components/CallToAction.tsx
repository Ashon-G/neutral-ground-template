import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied users and start building today.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
            Start Your Journey
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;