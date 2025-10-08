import React from 'react'

function Testimonials() {
    return (
        <section className="py-16 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 rounded-3xl shadow-2xl mb-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE4YzMuMzE0IDAgNi0yLjY4NiA2LTZzLTIuNjg2LTYtNi02LTYgMi42ODYtNiA2IDIuNjg2IDYgNiA2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
            <div className="container max-w-5xl mx-auto text-center relative z-10">
                <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                        <p className="italic mb-4">"ToonlyAI is incredibly fun and easy to use! Transformed my dog into a cartoon hero in seconds."</p>
                        <p className="font-semibold">- Sarah K.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                        <p className="italic mb-4">"The variety of styles is amazing. I keep finding new ways to reimagine my photos."</p>
                        <p className="font-semibold">- Mike P.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                        <p className="italic mb-4">"Perfect for creating unique profile pictures and gifts! Highly recommended."</p>
                        <p className="font-semibold">- Chloe T.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonials
