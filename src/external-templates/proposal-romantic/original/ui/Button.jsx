"use client"

import { motion } from "framer-motion"

export default function Button({ 
    children, 
    onClick, 
    variant = "primary", 
    className = "",
    ...props 
}) {
    // Combined base styles with transition for colors
    const baseStyles = "px-8 py-4 text-lg font-semibold rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-colors duration-300"
    
    const variants = {
        primary: "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white",
        success: "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white",
        danger: "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white",
        outline: "border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white"
    }

    return (
        <motion.button
            onClick={onClick}
            className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            {...props}
        >
            {children}
        </motion.button>
    )
}
