import { motion } from "framer-motion"
import PremiumBackground from "./PremiumBackground"

export default function CuteLoader() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="min-h-screen flex flex-col items-center justify-center relative z-10 overflow-hidden px-4"
        >
            <PremiumBackground particleCount={15} />

            {/* Enlarged loader with gradient container and multi-layered aura */}
            <motion.div
                className="mb-12 flex items-center justify-center relative z-10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.3,
                }}
            >
                {/* Outer glowing aura layer 1 */}
                <motion.div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: 260, height: 260,
                        background: "radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)",
                        filter: "blur(20px)",
                    }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
                
                <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-purple-500/20 to-rose-500/20 flex items-center justify-center border-2 border-pink-400/30 relative z-10 shadow-[0_0_40px_rgba(236,72,153,0.3)] backdrop-blur-sm">
                    <motion.div
                        animate={{
                            y: [0, -15, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    >
                        <img
                            src="/templates/proposal-romantic/gif/1.gif"
                            alt="Cute loading"
                            className="w-40 h-40 object-contain drop-shadow-2xl"
                            fetchPriority="high"
                        />
                    </motion.div>
                </div>
            </motion.div>

            {/* Cinematic Typography */}
            <motion.h2
                className="text-3xl md:text-5xl font-bold mb-10 text-center relative z-10"
                style={{ fontFamily: "'Shantell Sans', cursive", letterSpacing: "-0.02em", color: "rgba(255,255,255,0.9)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
            >
                Something{" "}
                <span className="gradient-text bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent font-extrabold" style={{ textShadow: "0 0 30px rgba(236,72,153,0.4)" }}>
                    special
                </span>{" "}
                is coming...
            </motion.h2>

            {/* Bouncing Dots */}
            <motion.div
                className="flex justify-center space-x-4 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
            >
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-5 h-5 rounded-full"
                        style={{ background: "linear-gradient(135deg, #f472b6, #c084fc)" }}
                        animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.6, 1, 0.6],
                            y: [0, -10, 0]
                        }}
                        transition={{
                            duration: 1.2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.2,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </motion.div>
        </motion.div>
    )
}