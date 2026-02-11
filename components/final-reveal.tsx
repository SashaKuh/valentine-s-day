"use client"

import { useEffect, useState } from "react"

export function FinalReveal() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 1200),
      setTimeout(() => setStep(3), 2200),
      setTimeout(() => setStep(4), 3500),
    ]
    return () => {
      for (const t of timers) clearTimeout(t)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center px-4">
      <div className="text-center max-w-lg mx-auto flex flex-col gap-6">
        {/* Big heart */}
        <div
          className={`transition-all duration-1000 ${
            step >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        >
          <div className="inline-block animate-heartbeat">
            <svg
              viewBox="0 0 24 24"
              fill="hsl(345 80% 55%)"
              className="w-20 h-20 mx-auto drop-shadow-[0_0_30px_hsl(345_80%_55%_/_0.5)]"
              aria-hidden="true"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>

        {/* Main text */}
        <div
          className={`transition-all duration-1000 ${
            step >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-serif text-3xl md:text-5xl text-primary mb-3 text-balance">
            {"Кицяяяя"}
          </h2>
          <p className="text-foreground/70 font-serif text-xl md:text-2xl leading-relaxed">
            {"Ти любиш мене, а я тебе теж"}
          </p>
          <p className="text-foreground/70 font-serif text-xl md:text-2xl leading-relaxed">
            {"дуже сильно любкаю"}
          </p>
        </div>

        {/* Date card */}
        <div
          className={`transition-all duration-1000 ${
            step >= 3 ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          <div className="bg-card/90 backdrop-blur-sm border border-primary/20 rounded-3xl p-8 shadow-2xl shadow-primary/15 mx-auto max-w-sm">
            <div className="flex flex-col gap-4 items-center">
              <div className="flex items-center justify-center gap-2 text-primary">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
                </svg>
                <span className="font-serif text-lg">{"Наше побачення"}</span>
              </div>
              <div className="text-3xl md:text-4xl font-serif text-foreground">
                {"Субота, +- 13:00"}
              </div>
              <div className="w-16 h-px bg-primary/30" />
              <p className="text-muted-foreground text-base leading-relaxed">
                {"Я тебе заберу з дому"}
              </p>
            </div>
          </div>
        </div>

        {/* Final sweet message */}
        <div
          className={`transition-all duration-1000 ${
            step >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="font-serif text-2xl md:text-3xl text-primary animate-pulse-soft text-balance">
            {"Ти моя Валентинка, Кицюняяяя"}
          </p>
          <div className="flex items-center justify-center gap-1 mt-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                viewBox="0 0 24 24"
                fill="hsl(345 80% 55%)"
                className="w-4 h-4 animate-heartbeat"
                style={{ animationDelay: `${i * 0.15}s` }}
                aria-hidden="true"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
