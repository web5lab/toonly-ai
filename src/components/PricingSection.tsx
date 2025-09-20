import { Button } from "@/components/ui/button";
import { Star, Check } from "lucide-react";

interface PricingSectionProps {
  onGetStarted: () => void;
}

export function PricingSection({ onGetStarted }: PricingSectionProps) {
  const plans = [
    {
      name: "Free",
      price: "FREE",
      stars: 10,
      description: "Perfect to get started",
      features: [
        "1 Image Transform",
        "One-time only",
        "Access to 100+ Styles",
        "< 1 Min Turnaround"
      ],
      buttonText: "Get Started Free",
      buttonClass: "bg-green-600 hover:bg-green-700 text-white",
      popular: false
    },
    {
      name: "Starter",
      price: "$10",
      stars: 50,
      description: "Great for casual users",
      features: [
        "5 Image Transforms",
        "$0.20 per Star",
        "Access to 100+ Styles", 
        "< 1 Min Turnaround"
      ],
      buttonText: "Choose Starter",
      buttonClass: "bg-[#8b5e3c] hover:bg-[#6d4c30] text-white",
      popular: false
    },
    {
      name: "Popular",
      price: "$20",
      stars: 120,
      description: "Most popular choice",
      features: [
        "12 Image Transforms",
        "$0.17 per Star",
        "Access to 100+ Styles",
        "< 1 Min Turnaround"
      ],
      buttonText: "Choose Popular",
      buttonClass: "bg-yellow-500 hover:bg-yellow-600 text-[#3a2e23]",
      popular: true
    },
    {
      name: "Pro",
      price: "$45",
      stars: 300,
      description: "For power users",
      features: [
        "30 Image Transforms",
        "$0.15 per Star",
        "Access to 100+ Styles",
        "< 1 Min Turnaround"
      ],
      buttonText: "Choose Pro",
      buttonClass: "bg-[#8b5e3c] hover:bg-[#6d4c30] text-white",
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-[#3a2e23]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-[#f4efe4]/80 max-w-2xl mx-auto">
            Choose the perfect plan for your creative needs. Start free, upgrade anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-[#e9e2d6]/10 backdrop-blur-sm border rounded-xl p-6 text-center hover:bg-[#e9e2d6]/15 transition-all duration-300 ${
                plan.popular 
                  ? 'border-yellow-400 ring-2 ring-yellow-400/50 transform scale-105' 
                  : 'border-[#5D4037]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-[#3a2e23] px-3 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}
              
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-white font-medium">{plan.stars}</span>
                </div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">{plan.price}</div>
                <p className="text-[#f4efe4]/70 text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-2 mb-6 text-left">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-[#f4efe4]/80 text-sm">
                    <Check className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                onClick={onGetStarted}
                className={`w-full ${plan.buttonClass} playful-shadow font-semibold`}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-[#e9e2d6]/10 backdrop-blur-sm border border-yellow-400 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-2">Monthly Subscription</h3>
            <div className="text-2xl font-bold text-yellow-400 mb-2">$30/month</div>
            <p className="text-[#f4efe4]/80 text-sm mb-4">
              Unlock premium features like Edit & Multi-Images + faster processing
            </p>
            <Button 
              onClick={onGetStarted}
              className="bg-yellow-500 hover:bg-yellow-600 text-[#3a2e23] playful-shadow font-semibold"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}