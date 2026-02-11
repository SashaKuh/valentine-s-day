"use client"

import { useState } from "react"
import { FloatingHeartsBg } from "@/components/floating-hearts-bg"
import { ValentineHero } from "@/components/valentine-hero"
import { FallingHearts } from "@/components/falling-hearts"
import { RunawayButton } from "@/components/runaway-button"
import { FinalReveal } from "@/components/final-reveal"

type Stage = "intro" | "hearts-falling" | "runaway" | "final"

export default function ValentinePage() {
  const [stage, setStage] = useState<Stage>("intro")

  const handleStart = () => {
    setStage("hearts-falling")
    setTimeout(() => {
      setStage("runaway")
    }, 2500)
  }

  const handleCaught = () => {
    setStage("final")
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Ambient background glow */}
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Always visible floating hearts background */}
      <FloatingHeartsBg />

      {/* Stage: Intro */}
      {stage === "intro" && <ValentineHero onStart={handleStart} />}

      {/* Stage: Hearts falling + transition to runaway */}
      {(stage === "hearts-falling" || stage === "runaway") && (
        <FallingHearts count={stage === "runaway" ? 25 : 50} />
      )}

      {/* Stage: Runaway button */}
      {stage === "runaway" && <RunawayButton onCaught={handleCaught} />}

      {/* Stage: Final reveal */}
      {stage === "final" && (
        <>
          <FallingHearts count={60} />
          <FinalReveal />
        </>
      )}
    </main>
  )
}
