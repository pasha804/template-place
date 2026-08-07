"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const loveTranslations = [
    "I love you",
    "Main tumse pyaar karta hoon",
    "Te quiero",
    "Je t'aime",
    "Ti amo",
    "我爱你",
    "愛してる",
    "사랑해",
    "Я тебя люблю",
    "أحبك",
    "Seni seviyorum",
    "Σ'αγαπώ",
    "Ich liebe dich",
    "Ik hou van je",
    "Jag älskar dig",
    "Eu te amo",
    "Kocham cię",
    "Miluju tě",
    "Szeretlek",
    "Rakastan sinua",
]

export default function FloatingLove() {
    const [items, setItems] = useState([])

    useEffect(() => {
        const h = window.innerHeight
        setItems(
            Array.from({ length: 25 }).map((_, i) => ({
                id: i,
                text: loveTranslations[i % loveTranslations.length],
                x: `${Math.random() * 95}%`,
                duration: Math.random() * 10 + 15,
                delay: Math.random() * 20,
                fontSize: Math.random() * 4 + 13, // 13–17px
                opacity: Math.random() * 0.1 + 0.12, // 0.12–0.22
                rotate: (Math.random() - 0.5) * 10,
                startY: h + 40,
            }))
        )
    }, [])

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {items.map((item) => (
                <motion.span
                    key={item.id}
                    className="absolute font-light italic text-white select-none"
                    style={{
                        left: item.x,
                        fontSize: item.fontSize,
                        whiteSpace: "nowrap",
                    }}
                    initial={{ y: item.startY, opacity: 0, rotate: -item.rotate }}
                    animate={{
                        y: -100,
                        opacity: [0, item.opacity, item.opacity, 0],
                        rotate: item.rotate,
                    }}
                    transition={{
                        duration: item.duration,
                        delay: item.delay,
                        repeat: Infinity,
                        ease: "linear",
                        opacity: { times: [0, 0.1, 0.85, 1] },
                    }}
                >
                    {item.text}
                </motion.span>
            ))}
        </div>
    )
}
