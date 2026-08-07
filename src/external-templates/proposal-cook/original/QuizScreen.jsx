"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import PremiumBackground from "./PremiumBackground"
import PremiumButton from "./PremiumButton"

const QUESTIONS = [
  {
    q: "What's your first reaction when you see my name pop up on your phone? 📱",
    options: [
      { label: "My heart literally skips 💓", fun: "That means I matter to you 🥺 I'll be your reason to smile every time!" },
      { label: "I smile without realizing it 😊", fun: "A hidden smile? That's the best kind, Jana 💕" },
      { label: "I get nervous and excited 😳", fun: "Nervous + excited = butterflies! I give you butterflies 🦋" },
      { label: "I immediately drop everything 😂", fun: "Haha! Queen behavior — and I'm honored 👑💖" },
    ],
  },
  {
    q: "If I could give you one thing in this world, what would you want? 🌍",
    options: [
      { label: "Your time & attention 🕰️", fun: "Every second of my time is already yours, Jana 💕" },
      { label: "A lifetime of laughter 😂", fun: "Deal. I promise to be your personal comedian forever 🎭❤️" },
      { label: "Unconditional love 💞", fun: "Already done. That's why I'm here, making this website for you 🥺" },
      { label: "All three above 🥺", fun: "You want everything and you deserve everything 👑 Done. Done. Done!" },
    ],
  },
  {
    q: "What do you think when you look in the mirror, Jana? 🪞",
    options: [
      { label: "I look okay today 😊", fun: "OKAY?! Jana, you're absolutely gorgeous. Own it! 💅👑" },
      { label: "I see someone loved 💕", fun: "Yes! And so deeply loved by me 🥺❤️" },
      { label: "I'm not sure... 🤔", fun: "Then let me tell you — you see someone who makes my whole world brighter 🌟" },
      { label: "I see a queen 👑", fun: "CORRECT ANSWER. I have taught you well 😂💖 Queen behavior activated!" },
    ],
  },
  {
    q: "On a scale of feelings — where are we right now? 💫",
    options: [
      { label: "My heart is racing 💓", fun: "Mine too, Jana. Mine too 🥺💕" },
      { label: "I feel something real 🌹", fun: "That 'something real' — that's us. And it's beautiful 💞" },
      { label: "I'm smiling reading this 😄", fun: "That smile is why I made all of this just for YOU 💖" },
      { label: "I'm falling a little 💫", fun: "Fall, Jana. I promise I'll catch you every single time 🤍🌹" },
    ],
  },
]

export default function QuizScreen({ onBack }) {
  const [step, setStep] = useState(0)       // 0 = intro, 1..n = questions, "done" = results
  const [answers, setAnswers] = useState([])
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const currentQ = QUESTIONS[step - 1]

  const startQuiz = () => setStep(1)

  const handleSelect = async (opt) => {
    if (revealed) return
    setSelected(opt)
    setRevealed(true)
    await console.log({
      title: "💕",
      text: opt.fun,
      background: "linear-gradient(135deg, #0d0008, #1a0010)",
      color: "#FFEDFF",
      confirmButtonColor: "#e11d48",
      confirmButtonText: "Next →",
      timer: 4000,
      timerProgressBar: true,
    })
    const next = [...answers, opt.label]
    setAnswers(next)
    if (step < QUESTIONS.length) {
      setSelected(null)
      setRevealed(false)
      setStep(step + 1)
    } else {
      setStep("done")
    }
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <PremiumBackground particleCount={18} />

      <AnimatePresence mode="wait">

        {/* ── INTRO ── */}
        {step === 0 && (
          <motion.div
            key="intro"
            className="glass-card relative z-30 w-full max-w-lg mx-auto flex flex-col items-center text-center p-8 md:p-12 rounded-[40px]"
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -30 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100, damping: 20 }}
          >
            <motion.div
              className="text-7xl mb-6"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💌
            </motion.div>
            <h1 className="gradient-text text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Shantell Sans', cursive" }}>
              Jana's Love Quiz
            </h1>
            <p className="text-white/60 text-base mb-2 leading-relaxed">
              4 cute little questions just for you.
            </p>
            <p className="text-white/40 text-sm mb-8 italic">
              No wrong answers here — just honest ones 💕
            </p>
            <PremiumButton onClick={startQuiz}>
              Let's Start 💕
            </PremiumButton>
            <button
              onClick={onBack}
              className="mt-5 text-white/30 text-sm hover:text-white/60 transition-colors"
            >
              ← Back to gifts
            </button>
          </motion.div>
        )}

        {/* ── QUESTION ── */}
        {typeof step === "number" && step >= 1 && step <= QUESTIONS.length && (
          <motion.div
            key={`q-${step}`}
            className="glass-card relative z-30 w-full max-w-xl mx-auto flex flex-col p-8 md:p-10 rounded-[40px]"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 120, damping: 20 }}
          >
            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {QUESTIONS.map((_, i) => (
                <motion.div
                  key={i}
                  className="rounded-full"
                  animate={{
                    width: i + 1 === step ? 24 : 8,
                    background: i + 1 <= step ? "#e11d48" : "rgba(255,255,255,0.2)",
                  }}
                  style={{ height: 8 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>

            {/* Question number */}
            <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">
              Question {step} of {QUESTIONS.length}
            </p>

            {/* Question */}
            <motion.h2
              className="text-white font-bold text-xl md:text-2xl text-center mb-8 leading-snug"
              style={{ fontFamily: "'Shantell Sans', cursive" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              {currentQ.q}
            </motion.h2>

            {/* Options */}
            <div className="flex flex-col gap-3">
              {currentQ.options.map((opt, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleSelect(opt)}
                  disabled={revealed}
                  className="w-full text-left px-5 py-4 rounded-2xl font-medium text-sm md:text-base transition-all duration-200 relative overflow-hidden"
                  style={{
                    background: selected === opt
                      ? "linear-gradient(135deg, rgba(225,29,72,0.5), rgba(168,85,247,0.4))"
                      : "rgba(255,255,255,0.05)",
                    border: selected === opt
                      ? "1.5px solid rgba(244,114,182,0.7)"
                      : "1.5px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.88)",
                    cursor: revealed ? "default" : "pointer",
                    boxShadow: selected === opt ? "0 0 20px rgba(225,29,72,0.25)" : "none",
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  whileHover={!revealed ? { scale: 1.02, background: "rgba(255,255,255,0.09)" } : {}}
                  whileTap={!revealed ? { scale: 0.98 } : {}}
                >
                  <span className="mr-2 opacity-50">{["A","B","C","D"][i]}.</span>
                  {opt.label}
                </motion.button>
              ))}
            </div>

            <button
              onClick={onBack}
              className="mt-8 text-white/25 text-xs hover:text-white/50 transition-colors text-center w-full"
            >
              ← Back to gifts
            </button>
          </motion.div>
        )}

        {/* ── DONE ── */}
        {step === "done" && (
          <motion.div
            key="done"
            className="glass-card relative z-30 w-full max-w-lg mx-auto flex flex-col items-center text-center p-8 md:p-12 rounded-[40px]"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100, damping: 18 }}
          >
            <motion.div
              className="text-6xl mb-6"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              💖
            </motion.div>
            <h2 className="gradient-text text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Shantell Sans', cursive" }}>
              You finished it, Jana!
            </h2>
            <p className="text-white/60 text-base mb-8 leading-relaxed">
              I made this quiz just to spend a little extra moment with you 🥺<br />
              Every answer you gave — it just made me like you even more. 💕
            </p>
            <PremiumButton onClick={onBack}>
              ← Back to Gifts 🎁
            </PremiumButton>
          </motion.div>
        )}

      </AnimatePresence>
    </motion.div>
  )
}
