import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

function Faq() {
    return (
        <section className="py-16 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-[#f4efe4] [text-shadow:1px_1px_2px_rgba(93,64,55,0.7)]">ToonlyAI FAQ - Free AI Photo to Cartoon Converter</h2>
            <div className="max-w-3xl mx-auto text-left">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-b border-[#f4efe4]/20">
                        <AccordionTrigger className="py-4 text-lg font-medium text-[#f4efe4] hover:text-white [text-shadow:1px_1px_1px_rgba(93,64,55,0.6)] [&[data-state=open]>svg]:text-yellow-400">How many images can I transform with ToonlyAI's free AI converter?</AccordionTrigger>
                        <AccordionContent className="pt-1 pb-4 text-[#f4efe4]/80 [text-shadow:1px_1px_1px_rgba(93,64,55,0.5)]">
                            Each AI image transformation costs 10 stars. You get free stars to start with our free AI photo to cartoon converter, then can buy star packages or subscribe for unlimited transforms. New users get free credits to try our AI image converter with no signup required!
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border-b border-[#f4efe4]/20">
                        <AccordionTrigger className="py-4 text-lg font-medium text-[#f4efe4] hover:text-white [text-shadow:1px_1px_1px_rgba(93,64,55,0.6)] [&[data-state=open]>svg]:text-yellow-400">What photos work best for AI cartoon conversion?</AccordionTrigger>
                        <AccordionContent className="pt-1 pb-4 text-[#f4efe4]/80 [text-shadow:1px_1px_1px_rgba(93,64,55,0.5)]">
                            Clear, well-lit photos work best with our free AI cartoon converter - portraits, selfies, pets, or objects. Our AI handles JPG, PNG, WEBP formats up to 10MB. Higher resolution photos (1024x1024 or larger) give the best cartoon and anime AI transformation results.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="border-b border-[#f4efe4]/20">
                        <AccordionTrigger className="py-4 text-lg font-medium text-[#f4efe4] hover:text-white [text-shadow:1px_1px_1px_rgba(93,64,55,0.6)] [&[data-state=open]>svg]:text-yellow-400">Is ToonlyAI's AI photo converter really free to use?</AccordionTrigger>
                        <AccordionContent className="pt-1 pb-4 text-[#f4efe4]/80 [text-shadow:1px_1px_1px_rgba(93,64,55,0.5)]">
                            Yes! ToonlyAI's AI photo to cartoon converter is completely free to start - no signup required for basic transformations. You get free stars for your first AI image conversions. For unlimited use, we offer affordable star packages and subscriptions with premium AI features.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4" className="border-b border-[#f4efe4]/20">
                        <AccordionTrigger className="py-4 text-lg font-medium text-[#f4efe4] hover:text-white [text-shadow:1px_1px_1px_rgba(93,64,55,0.6)] [&[data-state=open]>svg]:text-yellow-400">What art styles can I create with ToonlyAI's free AI?</AccordionTrigger>
                        <AccordionContent className="pt-1 pb-4 text-[#f4efe4]/80 [text-shadow:1px_1px_1px_rgba(93,64,55,0.5)]">
                            Choose from 100+ free AI art styles including: cartoon converter, anime generator, pixel art creator, watercolor, sketch, oil painting, comic book, manga, Disney-style, Studio Ghibli, and many more artistic AI transformations. New AI styles added regularly!
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5" className="border-b-0">
                        <AccordionTrigger className="py-4 text-lg font-medium text-[#f4efe4] hover:text-white [text-shadow:1px_1px_1px_rgba(93,64,55,0.6)] [&[data-state=open]>svg]:text-yellow-400">How fast is ToonlyAI's free AI image transformation?</AccordionTrigger>
                        <AccordionContent className="pt-1 pb-4 text-[#f4efe4]/80 [text-shadow:1px_1px_1px_rgba(93,64,55,0.5)]">
                            Our free AI photo to cartoon converter processes images in under 60 seconds! Most AI transformations complete in 20-40 seconds. Premium subscribers get even faster AI processing with priority queue access for instant results.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    )
}

export default Faq