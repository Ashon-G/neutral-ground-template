import { Zap, Shield, Rocket } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Lightning Fast",
      description: "Experience blazing fast performance with our optimized platform."
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Secure by Default",
      description: "Built with security in mind to keep your data safe and protected."
    },
    {
      icon: <Rocket className="w-8 h-8 text-primary" />,
      title: "Scale with Ease",
      description: "Grow your project without worrying about infrastructure limitations."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;