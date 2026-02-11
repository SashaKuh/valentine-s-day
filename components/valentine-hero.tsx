"use client"

import { useState } from "react"

interface ValentineHeroProps {
  onStart: () => void
}

function HeartSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

export function ValentineHero({ onStart }: ValentineHeroProps) {
  const [isExiting, setIsExiting] = useState(false)

  const handleStart = () => {
    setIsExiting(true)
    setTimeout(onStart, 800)
  }

  return (
    <div
      className={`fixed inset-0 z-20 flex items-center justify-center px-4 transition-all duration-700 ${
        isExiting ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}
    >
      <div className="text-center max-w-lg mx-auto relative">
        {/* Pulsing heart */}
        <div className="mb-6 animate-float">
          <HeartSvg className="w-16 h-16 mx-auto text-primary drop-shadow-[0_0_25px_hsl(345_80%_55%_/_0.4)]" />
        </div>

        {/* Title */}
        <h1 className="font-serif text-5xl md:text-7xl text-primary mb-3 animate-fade-up text-balance">
          {"Киця"}
        </h1>

        {/* Subtitle */}
        <p className="font-serif text-2xl md:text-3xl text-foreground/80 mb-2 opacity-0 animate-fade-up-1">
          {"Моя маленька Валентинка"}
        </p>

        {/* Small romantic text */}
        <p className="text-muted-foreground text-base md:text-lg mb-10 opacity-0 animate-fade-up-2 leading-relaxed max-w-sm mx-auto">
          {"Я дещо для тебе маю..."}
        </p>

        {/* Start button */}
        <div className="opacity-0 animate-fade-up-3">
          <button
            onClick={handleStart}
            type="button"
            className="group relative px-10 py-4 bg-primary text-primary-foreground rounded-full font-serif text-xl
              shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40
              transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              <HeartSvg className="w-5 h-5" />
              {"Відкрити"}
              <HeartSvg className="w-5 h-5" />
            </span>
          </button>
        </div>

        {/* Decorative hearts around */}
        <div className="absolute top-1/4 -left-16 md:-left-24 animate-float-slow opacity-20" aria-hidden="true">
          <HeartSvg className="w-8 h-8 text-primary" />
        </div>
        <div className="absolute top-1/3 -right-12 md:-right-20 animate-float-delayed opacity-15" aria-hidden="true">
          <HeartSvg className="w-6 h-6 text-primary" />
        </div>
        <div className="absolute -bottom-8 -left-8 md:-left-16 animate-float opacity-10" aria-hidden="true">
          <HeartSvg className="w-10 h-10 text-primary" />
        </div>
        <div className="absolute -bottom-16 -right-4 md:-right-12 animate-float-slow opacity-15" aria-hidden="true">
          <HeartSvg className="w-7 h-7 text-primary" />
        </div>
      </div>
    </div>
  )
}
