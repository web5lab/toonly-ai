import React from 'react'

function HowTo() {
    return (
        <section className="py-16 bg-[#f4efe4]/70 backdrop-blur-sm rounded-xl playful-shadow playful-border mb-16 text-[#3a2e23]">
            <div className="container max-w-5xl mx-auto text-center">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[#5D4037]">Create Stunning Art in 3 Simple Steps</h2>
                <div className="grid md:grid-cols-3 gap-8 mt-8 text-left">
                    <div className="p-4">
                        <div className="text-4xl font-bold text-[#8b5e3c] mb-2">1.</div>
                        <h3 className="text-xl font-semibold mb-2">Upload Your Image</h3>
                        <p className="text-sm text-[#5D4037]/90">Choose any photo from your device – portraits, pets, landscapes, you name it!</p>
                    </div>
                    <div className="p-4">
                        <div className="text-4xl font-bold text-[#8b5e3c] mb-2">2.</div>
                        <h3 className="text-xl font-semibold mb-2">Select a Style</h3>
                        <p className="text-sm text-[#5D4037]/90">Pick from over 100 unique styles, from classic cartoons to modern fine art.</p>
                    </div>
                    <div className="p-4">
                        <div className="text-4xl font-bold text-[#8b5e3c] mb-2">3.</div>
                        <h3 className="text-xl font-semibold mb-2">Transform!</h3>
                        <p className="text-sm text-[#5D4037]/90">Click the button and watch Toonly AI work its magic in under a minute.</p>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default HowTo