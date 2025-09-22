import BeforeAfterSlider from "@/components/BeforeAfterSlider";

export function ExamplesSection() {
  const examples = [
    {
      before: "/images/examples01.png",
      after: "/images/examples02.png",
      title: "Portrait to Anime"
    },
    {
      before: "/images/examples03.png", 
      after: "/images/examples04.png",
      title: "Photo to Cartoon"
    },
    {
      before: "/images/examples05.png",
      after: "/images/examples06.png", 
      title: "Person to Pixel Art"
    }
  ];

  return (
    <section className="py-16 bg-[#f4efe4]/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#5D4037]">
            See the Magic in Action
          </h2>
          <p className="text-lg text-[#8b5e3c] max-w-2xl mx-auto">
            Drag the slider to see incredible before and after transformations
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
          {examples.map((example, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-xl playful-shadow playful-border">
              <h3 className="text-xl font-semibold mb-4 text-center text-[#5D4037]">
                {example.title}
              </h3>
              <BeforeAfterSlider
                beforeImage={example.before}
                afterImage={example.after}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}