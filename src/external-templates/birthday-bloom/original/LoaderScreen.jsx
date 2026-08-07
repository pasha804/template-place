"use client"

import { motion } from "framer-motion"
import { useEffect } from "react"

export default function LoaderScreen({ onDone, loaderHeading }) {

    useEffect(() => {   
        const timer = setTimeout(() => {
            onDone?.()
        }, 3000)
        return () => clearTimeout(timer)
    }, [onDone])

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center will-change-transform"
        >
            <motion.div
                className="text-6xl md:text-7xl will-change-transform"
            >
                🎂
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="my-4 text-xl md:text-2xl font-semibold text-foreground text-center">
                {loaderHeading || "Loading your birthday surprise..."}
            </motion.p>

        </motion.div>
    )
}
