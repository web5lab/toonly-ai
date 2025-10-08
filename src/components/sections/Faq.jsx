import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

function Faq() {
    return (
        <section className="py-16 text-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-xl border border-slate-200">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-slate-800">ToonlyAI FAQ - AI Photo Editor with Prompts</h2>
            <div className="max-w-3xl mx-auto text-left">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-b border-slate-200">
                        <AccordionTrigger className="py-4 text-lg font-medium text-slate-700 hover:text-indigo-600 transition-colors">How many images can I edit with ToonlyAI?</AccordionTrigger>
                        <AccordionContent className="pt-1 pb-4 text-slate-600">
                            Each AI photo edit costs 10 stars. Plans start at $5/month for 100 stars (10 edits), $10/month for 250 stars (25 edits), or $20/month for 600 stars (60 edits).
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border-b border-slate-200">
                        <AccordionTrigger className="py-4 text-lg font-medium text-slate-700 hover:text-indigo-600 transition-colors">What photos work best with ToonlyAI's prompt-based editor?</AccordionTrigger>
                        <AccordionContent className="pt-1 pb-4 text-slate-600">
                            Clear, well-lit photos work best - portraits, selfies, pets, or objects. Our AI editor handles JPG, PNG, WEBP formats up to 10MB. Higher resolution photos (1024x1024 or larger) give the best results with prompt-based editing.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="border-b border-slate-200">
                        <AccordionTrigger className="py-4 text-lg font-medium text-slate-700 hover:text-indigo-600 transition-colors">How much does ToonlyAI's AI photo editor cost?</AccordionTrigger>
                        <AccordionContent className="pt-1 pb-4 text-slate-600">
                            ToonlyAI offers three flexible plans: Basic at $5/month (100 stars), Starter at $10/month (250 stars), and Pro at $20/month (600 stars). Each edit costs 10 stars.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4" className="border-b border-slate-200">
                        <AccordionTrigger className="py-4 text-lg font-medium text-slate-700 hover:text-indigo-600 transition-colors">What can I do with ToonlyAI's prompt-based editor?</AccordionTrigger>
                        <AccordionContent className="pt-1 pb-4 text-slate-600">
                            Choose from 100+ preset styles or use simple prompts like "make it anime", "add sunset background", "pixel art style", "watercolor effect". Our AI understands natural language and can transform photos into cartoons, anime, sketches, paintings, and more. New styles added regularly!
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5" className="border-b-0">
                        <AccordionTrigger className="py-4 text-lg font-medium text-slate-700 hover:text-indigo-600 transition-colors">How fast is ToonlyAI's AI photo editing?</AccordionTrigger>
                        <AccordionContent className="pt-1 pb-4 text-slate-600">
                            Our AI photo editor processes images in under 60 seconds! Most edits complete in 20-40 seconds. Premium subscribers get priority queue access for even faster processing.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    )
}

export default Faq
