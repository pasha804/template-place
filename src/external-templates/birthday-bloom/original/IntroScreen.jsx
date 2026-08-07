"use client"

import { motion } from "framer-motion"
import { Gift } from "lucide-react"
import Button from "./Button"

export default function IntroScreen({ onNext, introTitle, introSubtext, buttonText, birthdayName, age }) {
    const title = introTitle || `A ${birthdayName || "Special Person"} was born today, ${age || 21} years ago!`
    const subtext = introSubtext || "Yes, it's YOU! A little surprise awaits..."
    return (
        <motion.div
            className="bg-[#fff8fc] p-7 rounded-[60px] drop-shadow-2xl  min-w-48 w-full max-w-110 relative flex flex-col items-center gap-4"
        >
            <div className="relative h-44 md:h-52 bg-linear-to-b from-white/80 to-pink-200 w-full rounded-[40px] flex items-end justify-center shadow-inner">
                <img
                    loading="lazy"
                    src="/templates/birthday-bloom/gifs/intro.gif"
                    alt="Cute"
                    className="w-26 md:w-32"
                />
            </div>

            <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-semibold text-primary drop-shadow leading-tight will-change-transform"
                    style={{
                        filter: "drop-shadow(0 0 20px rgba(255,105,180,0.4))",
                    }}>
                    {title}
                </h1>
                <p className="mt-4 text-foreground will-change-transform">{subtext}</p>
            </div>

            <div
                className="mt-4">
                <Button
                    onClick={() => {
                        onNext?.()
                    }}
                    className="bg-[#f1caeb] text-primary"
                >
                    <Gift size={20} />
                    {buttonText || "Start the surprise"}
                </Button>
            </div>
        </motion.div >
    )
}
