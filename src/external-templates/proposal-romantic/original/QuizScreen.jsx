"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export default function QuizScreen({ onBack }) {
    const [selectedAnswer, setSelectedAnswer] = useState("")

    const handleSubmit = () => {
        if (!selectedAnswer) {
            return
        }

        // Show fun response based on answer
        if (selectedAnswer === "me") {
            alert("Haha! I knew you'd say that! But we both know the truth... 👀❤️")
        } else {
            alert("Aww, that's sweet! But you are definitely the queen/king here! 👑💖")
        }
    }

    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-center px-4 py-6 relative z-10 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="text-center max-w-lg w-full">
                {/* Title */}
                <motion.h1
                    className="text-4xl md:text-5xl text-pink-200 mb-10 font-semibold"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    style={{ fontFamily: "'Shantell Sans', cursive" }}
                >
                    Quiz{" "}
                    <span className="font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                        for you
                    </span>{" "}
                    😘
                </motion.h1>

                {/* Question */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <p className="text-center text-pink-200/80 font-medium text-lg md:text-xl mb-6 leading-relaxed">
                        Who is the absolute 'boss' in this relationship 😂?
                    </p>

                    {/* Options */}
                    <div className="space-y-4 mb-8">
                        <motion.div
                            className="flex items-center p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl hover:bg-purple-500/20 transition-all cursor-pointer border-2 border-purple-400/30 hover:border-pink-400/60 hover:shadow-lg hover:shadow-purple-500/20"
                            onClick={() => setSelectedAnswer("me")}
                            whileHover={{ scale: 1.02 }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7, duration: 0.4 }}
                        >
                            <input
                                type="radio"
                                id="me"
                                name="boss"
                                value="me"
                                checked={selectedAnswer === "me"}
                                onChange={(e) => setSelectedAnswer(e.target.value)}
                                className="w-5 h-5 text-pink-500 focus:ring-pink-400 cursor-pointer"
                            />
                            <label htmlFor="me" className="ml-3 text-pink-200 font-medium cursor-pointer flex-1">
                                Me
                            </label>
                        </motion.div>

                        <motion.div
                            className="flex items-center p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl hover:bg-purple-500/20 transition-all cursor-pointer border-2 border-purple-400/30 hover:border-pink-400/60 hover:shadow-lg hover:shadow-purple-500/20"
                            onClick={() => setSelectedAnswer("you")}
                            whileHover={{ scale: 1.02 }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.85, duration: 0.4 }}
                        >
                            <input
                                type="radio"
                                id="you"
                                name="boss"
                                value="you"
                                checked={selectedAnswer === "you"}
                                onChange={(e) => setSelectedAnswer(e.target.value)}
                                className="w-5 h-5 text-pink-500 focus:ring-pink-400 cursor-pointer"
                            />
                            <label htmlFor="you" className="ml-3 text-pink-200 font-medium cursor-pointer flex-1">
                                You
                            </label>
                        </motion.div>
                    </div>

                    {/* Selected Answer Display */}
                    {selectedAnswer && (
                        <motion.div
                            className="text-center mb-6 p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-pink-400/40"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <p className="text-pink-200/70 text-sm mb-1">Your answer:</p>
                            <p className="text-pink-200 font-semibold text-lg">
                                {selectedAnswer === "me" ? "Me" : "You"}
                            </p>
                        </motion.div>
                    )}
                </motion.div>

                {/* Buttons */}
                <motion.div
                    className="flex flex-col gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={!selectedAnswer}
                        className={`px-8 py-3 bg-red-500 text-white font-bold text-base rounded-full shadow-lg transition-all duration-300 transform ${selectedAnswer ? 'hover:bg-red-600 hover:shadow-xl hover:scale-105 cursor-pointer pulse-glow' : 'opacity-50 cursor-not-allowed'
                            }`}
                    >
                        Submit
                    </button>

                    {/* Back Button - Now same style as submit */}
                    <button
                        onClick={onBack}
                        className="px-8 py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                        ← Back to Gifts
                    </button>
                </motion.div>
            </div>
        </motion.div>
    )
}
