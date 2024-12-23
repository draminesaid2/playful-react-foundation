import { Boxes, Rocket, Shield } from "lucide-react";

const features = [
  {
    title: "Easy to Use",
    description: "Get started quickly with our intuitive interface and comprehensive documentation.",
    icon: Boxes,
  },
  {
    title: "Fast & Reliable",
    description: "Built with performance in mind, ensuring your application runs smoothly.",
    icon: Rocket,
  },
  {
    title: "Secure",
    description: "Enterprise-grade security features to keep your data safe and protected.",
    icon: Shield,
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Amazing Features
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to build your next great project
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="fade-in relative p-6 bg-white rounded-lg border hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};