import React from 'react'

function Testimonials() {
    return (
        <section className="py-16 bg-[#a87b5d]/80 backdrop-blur-md rounded-xl playful-shadow playful-border mb-16 text-white">
            <div className="container max-w-5xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-[#3a2e23]/50 p-6 rounded-lg shadow-md">
                        <p className="italic mb-4">"ToonlyAI is incredibly fun and easy to use! Transformed my dog into a cartoon hero in seconds."</p>
                        <p className="font-semibold">- Sarah K.</p>
                    </div>
                    <div className="bg-[#3a2e23]/50 p-6 rounded-lg shadow-md">
                        <p className="italic mb-4">"The variety of styles is amazing. I keep finding new ways to reimagine my photos."</p>
                        <p className="font-semibold">- Mike P.</p>
                    </div>
                    <div className="bg-[#3a2e23]/50 p-6 rounded-lg shadow-md">
                        <p className="italic mb-4">"Perfect for creating unique profile pictures and gifts! Highly recommended."</p>
                        <p className="font-semibold">- Chloe T.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonials