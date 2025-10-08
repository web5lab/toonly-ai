import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

function Faq() {
    return (
        <section className="py-16 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-[#f4efe4] [text-shadow:1px_1px_2px_rgba(93,64,55,0.7)]">ToonlyAI FAQ - AI Photo Editor with Prompts</h2>
            <div className="max-w-3xl mx-auto text-left">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-b border-[#f4efe4]/20">
                        <AccordionTrigger className="py-4 text-lg font-medium text-[#f4efe4] hover:text-white [text-shadow:1px_1px_1px_rgba(93,64,55,0.6)] [&[data-state=open]>svg]:text-yellow-400">How many images can I edit with ToonlyAI?</AccordionTrigger>
                        <AccordionContent className="pt-1 pb-4 text-[#f4efe4]/80 [text-shadow:1px_1px_1px_rgba(93,64,55,0.5)]">
                            Each AI photo edit costs 10 stars. Plans start at $5/month for 100 stars (10 edits), $10/month for 250 stars (25 edits), or $20/month for 600 stars (60 edits).
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border-b border-[#f4efe4]/20">
                        <AccordionTrigger className="py-4 text-lg font-medium text-[#f4efe4] hover:text-white [text-shadow:1px_1px_1px_rgba(93,64,55,0.6)] [&[data-state=open]>svg]:text-yellow-400">What photos work best with ToonlyAI's prompt-based editor?</AccordionTrigger>
                        <AccordionContent className="pt-1 pb-4 text-[#f4efe4]/80 [text-shadow:1px_1px_1px_rgba(93,64,55,0.5)]">
                            Clear, well-lit photos work best - portraits, selfies, pets, or objects. Our AI editor handles JPG, PNG, WEBP formats up to 10MB. Higher resolution photos (1024x1024 or larger) give the best results with prompt-based editing.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="border-b border-[#f4efe4]/20">
                        <AccordionTrigger className="py-4 text-lg font-medium text-[#f4efe4] hover:text-white [text-shadow:1px_1px_1px_rgba(93,64,55,0.6)] [&[data-state=open]>svg]:text-yellow-400">How much does ToonlyAI's AI photo editor cost?</AccordionTrigger>
                        <AccordionContent className="pt-1 pb-4 text-[#f4efe4]/80 [text-shadow:1px_1px_1px_rgba(93,64,55,0.5)]">
                            ToonlyAI offers three flexible plans: Basic at $5/month (100 stars), Starter at $10/month (250 stars), and Pro at $20/month (600 stars). Each edit costs 10 stars.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4" className="border-b border-[#f4efe4]/20">
                        <AccordionTrigger className="py-4 text-lg font-medium text-[#f4efe4] hover:text-white [text-shadow:1px_1px_1px_rgba(93,64,55,0.6)] [&[data-state=open]>svg]:text-yellow-400">What can I do with ToonlyAI's prompt-based editor?</AccordionTrigger>
                        <AccordionContent className="pt-1 pb-4 text-[#f4efe4]/80 [text-shadow:1px_1px_1px_rgba(93,64,55,0.5)]">
                            Choose from 100+ preset styles or use simple prompts like "make it anime", "add sunset background", "pixel art style", "watercolor effect". Our AI understands natural language and can transform photos into cartoons, anime, sketches, paintings, and more. New styles added regularly!
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5" className="border-b-0">
                        <AccordionTrigger className="py-4 text-lg font-medium text-[#f4efe4] hover:text-white [text-shadow:1px_1px_1px_rgba(93,64,55,0.6)] [&[data-state=open]>svg]:text-yellow-400">How fast is ToonlyAI's AI photo editing?</AccordionTrigger>
                        <AccordionContent className="pt-1 pb-4 text-[#f4efe4]/80 [text-shadow:1px_1px_1px_rgba(93,64,55,0.5)]">
                            Our AI photo editor processes images in under 60 seconds! Most edits complete in 20-40 seconds. Premium subscribers get priority queue access for even faster processing.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    )
}

export default Faq