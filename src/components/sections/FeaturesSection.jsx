import { Palette, Zap, Download, Shield } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Palette className="h-8 w-8" />,
      title: "100+ Art Styles",
      description: "From anime to pixel art, cartoons to classical paintings - endless creative possibilities await."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Get your transformed images in under 60 seconds. No waiting, just instant magic."
    },
    {
      icon: <Download className="h-8 w-8" />,
      title: "High Quality Downloads",
      description: "Download your creations in high resolution, perfect for sharing or printing."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Privacy First",
      description: "Your images are processed securely and never stored on our servers."
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#5D4037]">
            Why Choose ToonlyAI?
          </h2>
          <p className="text-lg text-[#8b5e3c] max-w-2xl mx-auto">
            The most advanced AI image transformation platform with unmatched quality and speed
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-[#f4efe4]/80 backdrop-blur-sm p-6 rounded-xl playful-shadow playful-border text-center hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-[#8b5e3c] mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#5D4037]">
                {feature.title}
              </h3>
              <p className="text-[#8b5e3c]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}