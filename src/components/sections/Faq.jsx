import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

function Faq() {
    return (
        <section className="py-16 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-[#f4efe4] [text-shadow:1px_1px_2px_rgba(93,64,55,0.7)]">ToonlyAI FAQ - Free AI Photo to Cartoon Converter</h2>
            <div className="max-w-3xl mx-auto text-left">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-b border-[#f4efe4]/20">
                        <AccordionTrigger className="py-4 text-lg font-medium text-[#f4efe4] hover:text-white [text-shadow:1px_1px_1px_rgba(93,64,55,0.6)] [&[data-state=open]>svg]:text-yellow-400">How many images can I transform with ToonlyAI's AI converter?</AccordionTrigger>
                        <AccordionContent className="pt-1 pb-4 text-[#f4efe4]/80 [text-shadow:1px_1px_1px_rgba(93,64,55,0.5)]">
                            Each AI image transformation costs 10 stars. You can buy star packages starting at $5 for 100 stars or subscribe for monthly allowances with unlimited transforms.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border-b border-[#f4efe4]/20">
                        <AccordionTrigger className="py-4 text-lg font-medium text-[#f4efe4] hover:text-white [text-shadow:1px_1px_1px_rgba(93,64,55,0.6)] [&[data-state=open]>svg]:text-yellow-400">What photos work best for AI cartoon conversion?</AccordionTrigger>
                        <AccordionContent className="pt-1 pb-4 text-[#f4efe4]/80 [text-shadow:1px_1px_1px_rgba(93,64,55,0.5)]">
                            Clear, well-lit photos work best with our free AI cartoon converter - portraits, selfies, pets, or objects. Our AI handles JPG, PNG, WEBP formats up to 10MB. Higher resolution photos (1024x1024 or larger) give the best cartoon and anime AI transformation results.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="border-b border-[#f4efe4]/20">
                        <AccordionTrigger className="py-4 text-lg font-medium text-[#f4efe4] hover:text-white [text-shadow:1px_1px_1px_rgba(93,64,55,0.6)] [&[data-state=open]>svg]:text-yellow-400">How much does ToonlyAI's AI photo converter cost?</AccordionTrigger>
                        <AccordionContent className="pt-1 pb-4 text-[#f4efe4]/80 [text-shadow:1px_1px_1px_rgba(93,64,55,0.5)]">
                            ToonlyAI offers affordable pricing starting at $5 for 100 stars. For unlimited use, we offer subscription plans starting at $5/month with premium AI features and priority processing.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4" className="border-b border-[#f4efe4]/20">
                        <AccordionTrigger className="py-4 text-lg font-medium text-[#f4efe4] hover:text-white [text-shadow:1px_1px_1px_rgba(93,64,55,0.6)] [&[data-state=open]>svg]:text-yellow-400">What art styles can I create with ToonlyAI's free AI?</AccordionTrigger>
                        <AccordionContent className="pt-1 pb-4 text-[#f4efe4]/80 [text-shadow:1px_1px_1px_rgba(93,64,55,0.5)]">
                            Choose from 100+ free AI art styles including: cartoon converter, anime generator, pixel art creator, watercolor, sketch, oil painting, comic book, manga, Disney-style, Studio Ghibli, and many more artistic AI transformations. New AI styles added regularly!
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5" className="border-b-0">
                        <AccordionTrigger className="py-4 text-lg font-medium text-[#f4efe4] hover:text-white [text-shadow:1px_1px_1px_rgba(93,64,55,0.6)] [&[data-state=open]>svg]:text-yellow-400">How fast is ToonlyAI's AI image transformation?</AccordionTrigger>
                        <AccordionContent className="pt-1 pb-4 text-[#f4efe4]/80 [text-shadow:1px_1px_1px_rgba(93,64,55,0.5)]">
                            Our AI photo to cartoon converter processes images in under 60 seconds! Most AI transformations complete in 20-40 seconds. Premium subscribers get even faster AI processing with priority queue access for instant results.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    )
}

export default Faq