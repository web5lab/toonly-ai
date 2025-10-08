import React from 'react'

function HowTo() {
    return (
        <section className="py-16 bg-[#f4efe4]/70 backdrop-blur-sm rounded-xl playful-shadow playful-border mb-16 text-[#3a2e23]">
            <div className="container max-w-5xl mx-auto text-center">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[#5D4037]">How to Edit Photos with AI Prompts - 3 Simple Steps</h2>
                <div className="grid md:grid-cols-3 gap-8 mt-8 text-left">
                    <div className="p-4">
                        <div className="text-4xl font-bold text-[#8b5e3c] mb-2">1.</div>
                        <h3 className="text-xl font-semibold mb-2">Upload Your Photo</h3>
                        <p className="text-sm text-[#5D4037]/90">Upload any photo - portraits, pets, selfies, or landscapes. Our AI photo editor works with all image types including JPG, PNG, and WEBP!</p>
                    </div>
                    <div className="p-4">
                        <div className="text-4xl font-bold text-[#8b5e3c] mb-2">2.</div>
                        <h3 className="text-xl font-semibold mb-2">Choose Style or Write Prompt</h3>
                        <p className="text-sm text-[#5D4037]/90">Select from 100+ styles or write a simple prompt like "make it anime" or "add sunset background". Our AI understands natural language!</p>
                    </div>
                    <div className="p-4">
                        <div className="text-4xl font-bold text-[#8b5e3c] mb-2">3.</div>
                        <h3 className="text-xl font-semibold mb-2">Get AI-Edited Results</h3>
                        <p className="text-sm text-[#5D4037]/90">Click transform and watch our AI edit your photo in under 60 seconds. Download and share your AI-enhanced images!</p>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default HowTo