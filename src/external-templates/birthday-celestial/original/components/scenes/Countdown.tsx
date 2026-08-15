import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Gift } from "lucide-react";

interface CountdownProps {
  onComplete: () => void;
  title?: string;
  subtitle?: string;
}

export function Countdown({
  onComplete,
  title = "Happy Birthday!",
  subtitle = "Get ready for something special... 🎁",
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  return (
    <div className="relative flex w-full flex-1 flex-col items-center justify-center px-5 py-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass inline-flex items-center gap-3 rounded-full px-6 py-3 mb-8"
      >
        <Gift className="h-5 w-5 text-primary neon-outline" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-5xl sm:text-7xl font-bold text-primary mb-3 text-glow text-center"
      >
        {title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="text-muted-foreground mb-12 text-lg sm:text-xl text-center"
      >
        {subtitle}
      </motion.p>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="glass rounded-3xl p-10 sm:p-12 mb-8"
      >
        <motion.div
          key={timeLeft}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-7xl sm:text-8xl font-bold text-primary text-glow"
        >
          {timeLeft}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="glass rounded-2xl px-6 py-4 flex items-center gap-3"
      >
        <Gift className="h-4 w-4 text-gold neon-outline" />
        <p className="text-sm text-muted-foreground">
          Starting your special journey in {timeLeft} second{timeLeft !== 1 ? "s" : ""}... 💝
        </p>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="mt-8 text-5xl"
      >
        🎂
      </motion.div>
    </div>
  );
}
