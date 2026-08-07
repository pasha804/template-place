"use client"

import { motion } from "framer-motion"

export default function ValentineMessageScreen({ onNext }) {

    const handleButtonClick = () => {
        onNext()
    }

    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-center px-4 py-6 relative z-10 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <div className="text-center max-w-3xl mx-auto">
                {/* Bear couple with gradient container */}
                <motion.div
                    className="mb-8"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.6, type: "spring", stiffness: 200 }}
                >
                    <div className="w-36 h-36 mx-auto rounded-full bg-gradient-to-br from-purple-500/20 to-rose-500/20 flex items-center justify-center border-2 border-pink-400/30 pulse-glow">
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }}
                        >
                            <img src="/templates/proposal-romantic/gif/celebrate.gif" className="w-28 h-28 object-contain" alt="cute couple" loading="lazy" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    className="text-4xl md:text-6xl text-pink-200 mb-6 font-semibold text-center leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    style={{ fontFamily: "'Shantell Sans', cursive" }}
                >
                    {" "}
                    <span className="font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                        Janan
                    </span>{" "}
                    🌸
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    className="text-pink-200/70 text-xl md:text-2xl mb-12 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                >
                    I Love you and that's the beginning and ending of everything
                </motion.p>

                {/* Button */}
                <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                >
                    <button
                        onClick={handleButtonClick}
                        className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-bold text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 pulse-glow"
                    >
                        YES MY LOVE ❤️
                    </button>
                </motion.div>
            </div>
        </motion.div>
    )
}
