import React from 'react'
import { Sparkles, Wand2, Palette } from 'lucide-react'

function HeroTittle() {
    return (
        <div className="text-center mb-16 relative">
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 right-1/4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full border border-indigo-200 mb-6">
                <Sparkles className="h-4 w-4 text-indigo-600" />
                <span className="text-sm font-medium text-indigo-700">AI-Powered Photo Editing</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                Transform Photos with
                <br />
                Simple AI Prompts
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                Edit and enhance your photos using natural language. Just describe what you want - change backgrounds, add effects, apply artistic styles, and more.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                        <Wand2 className="h-4 w-4 text-indigo-600" />
                    </div>
                    <span>100+ Styles</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <Palette className="h-4 w-4 text-purple-600" />
                    </div>
                    <span>Professional Results</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-pink-100 rounded-lg">
                        <Sparkles className="h-4 w-4 text-pink-600" />
                    </div>
                    <span>Plans from $5</span>
                </div>
            </div>
        </div>
    )
}

export default HeroTittle