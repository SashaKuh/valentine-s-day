"use client"

import React from "react"

import { useCallback, useEffect, useRef, useState } from "react"

interface RunawayButtonProps {
  onCaught: () => void
}

const teasingMessages = [
  "Хе-хе, не спіймаєш!",
  "Я швидша за тебе!",
  "Ой, ледь не спіймала!",
  "Майже! Спробуй ще!",
  "Та ну, ти можеш краще!",
  "Ок ладно... жартую!",
]

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

function Sparkle({ style }: { style: React.CSSProperties }) {
  return (
    <div className="absolute animate-ping" style={style}>
      <svg viewBox="0 0 24 24" fill="hsl(345 80% 55%)" className="w-3 h-3 opacity-60">
        <circle cx="12" cy="12" r="4" />
      </svg>
    </div>
  )
}

export function RunawayButton({ onCaught }: RunawayButtonProps) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const escapeCountRef = useRef(0)
  const [message, setMessage] = useState("")
  const [isStopped, setIsStopped] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; size: number }[]>([])
  const maxEscapes = 6
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // Generate sparkles for background
  useEffect(() => {
    const newSparkles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
    }))
    setSparkles(newSparkles)
  }, [])

  const moveNoButton = useCallback(() => {
    if (isStopped) return

    const newCount = escapeCountRef.current + 1
    escapeCountRef.current = newCount
    setMessage(teasingMessages[Math.min(newCount - 1, teasingMessages.length - 1)])

    if (newCount >= maxEscapes) {
      setIsStopped(true)
      setMessage("Ну добре, здаюсь! Тисни!")
      setShowHint(true)
      setNoPosition({ x: 0, y: 0 })
      return
    }

    const newX = (Math.random() - 0.5) * 250
    const newY = (Math.random() - 0.5) * 200
    setNoPosition({ x: newX, y: newY })
  }, [isStopped])

  const handleYesClick = () => {
    onCaught()
  }

  const handleNoClick = () => {
    if (isStopped) {
      onCaught()
    }
  }

  if (!visible) return null

  return (
    <div ref={containerRef} className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden">
      {/* Background sparkles / particles */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full animate-pulse-soft"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: `hsl(345 80% ${55 + Math.random() * 20}%)`,
            opacity: 0.15 + Math.random() * 0.2,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
          aria-hidden="true"
        />
      ))}

      {/* Floating big hearts in background */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`bg-heart-${i}`}
          className="absolute animate-float-heart opacity-10"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            animationDuration: `${5 + Math.random() * 5}s`,
            animationDelay: `${Math.random() * 3}s`,
          }}
          aria-hidden="true"
        >
          <HeartIcon className="w-12 h-12 text-primary" />
        </div>
      ))}

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/3 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" aria-hidden="true" />
      <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }} aria-hidden="true" />

      {/* Message bubble */}
      <div
        className={`absolute top-6 left-1/2 -translate-x-1/2 transition-all duration-500 z-50 ${
          message ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="bg-card/95 backdrop-blur-sm px-6 py-3 rounded-2xl border border-primary/30 shadow-lg shadow-primary/10">
          <p className="text-primary font-serif text-xl text-center whitespace-nowrap">{message}</p>
        </div>
      </div>

      {/* Hint */}
      {showHint && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 animate-bounce z-50">
          <p className="text-muted-foreground text-sm">{"(тепер тисни Ні)"}</p>
        </div>
      )}

      {/* Main card */}
      <div className="relative bg-card/90 backdrop-blur-md border border-primary/20 rounded-3xl p-8 md:p-10 shadow-2xl shadow-primary/15 max-w-sm w-full mx-4 z-10">
        {/* Card heart decoration */}
        <div className="flex justify-center mb-4">
          <HeartIcon className="w-10 h-10 text-primary animate-heartbeat drop-shadow-[0_0_15px_hsl(345_80%_55%_/_0.4)]" />
        </div>

        <h2 className="font-serif text-3xl md:text-4xl text-primary text-center mb-8 text-balance">
          {"Чи любиш ти мене?"}
        </h2>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-6">
          {/* TAK button - always in place */}
          <button
            type="button"
            onClick={handleYesClick}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-serif text-xl
              shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40
              transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer
              animate-pulse-glow"
          >
            {"Так"}
          </button>

          {/* NI button - runs away */}
          <button
            type="button"
            onMouseEnter={() => {
              if (!isStopped) moveNoButton()
            }}
            onTouchStart={() => {
              if (!isStopped) moveNoButton()
            }}
            onClick={handleNoClick}
            className={`px-8 py-3 rounded-full font-serif text-xl border-2 transition-all cursor-pointer ${
              isStopped
                ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-100"
                : "border-primary/40 bg-card text-foreground hover:border-primary/60"
            } ${isStopped ? "duration-700" : "duration-200"}`}
            style={{
              transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
              transition: isStopped ? "all 0.7s ease-out" : "all 0.2s ease-out",
            }}
          >
            {"Ні"}
          </button>
        </div>
      </div>
    </div>
  )
}
