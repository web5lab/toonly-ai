import { Zap, Palette, Download, Shield } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-yellow-400" />,
      title: "Lightning Fast",
      description: "Transform your images in under 60 seconds with our advanced AI technology"
    },
    {
      icon: <Palette className="h-8 w-8 text-blue-400" />,
      title: "100+ Art Styles",
      description: "From anime to pixel art, watercolor to comic book - endless creative possibilities"
    },
    {
      icon: <Download className="h-8 w-8 text-green-400" />,
      title: "High Quality Output",
      description: "Get crisp, high-resolution images perfect for printing or sharing"
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-400" />,
      title: "Privacy First",
      description: "Your images are processed securely and never stored on our servers"
    }
  ];

  return (
    <section className="py-20 bg-[#e9e2d6]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#5D4037] mb-4">
            Why Choose ToonlyAI?
          </h2>
          <p className="text-xl text-[#8b5e3c] max-w-2xl mx-auto">
            Experience the magic of AI-powered image transformation with features designed for creators
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-xl playful-shadow playful-border text-center hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#5D4037] mb-3">
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