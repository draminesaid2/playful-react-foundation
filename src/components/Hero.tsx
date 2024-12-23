import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <div className="hero-gradient min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="fade-in text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-primary">YourApp</span>
        </h1>
        <p className="fade-in text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Build something amazing with our modern React application template.
          Get started quickly and efficiently.
        </p>
        <div className="fade-in flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="group">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};