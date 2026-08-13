import { useState, useEffect } from "react";
import { Clock, AlertCircle } from "lucide-react";

interface ExpirationTimerProps {
  expiresAt: string | null;
  pageSlug: string;
}

export function ExpirationTimer({ expiresAt, pageSlug }: ExpirationTimerProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isExpired, setIsExpired] = useState(false);
  const [urgency, setUrgency] = useState<"safe" | "warning" | "critical">("safe");

  useEffect(() => {
    if (!expiresAt) {
      setTimeLeft("Never expires");
      return;
    }

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const expiry = new Date(expiresAt).getTime();
      const diff = expiry - now;

      if (diff <= 0) {
        setIsExpired(true);
        setTimeLeft("Expired");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      // Set urgency level
      if (days === 0) {
        setUrgency("critical");
      } else if (days <= 3) {
        setUrgency("warning");
      } else {
        setUrgency("safe");
      }

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`${minutes}m`);
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [expiresAt]);

  if (!expiresAt) {
    return null;
  }

  const colors = {
    safe: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      border: "border-emerald-500/20",
    },
    warning: {
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      border: "border-amber-500/20",
    },
    critical: {
      bg: "bg-red-500/10",
      text: "text-red-400",
      border: "border-red-500/20",
    },
  };

  const style = isExpired ? colors.critical : colors[urgency];

  return (
    <div
      className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium ${style.bg} ${style.text} ${style.border}`}
    >
      {isExpired ? (
        <>
          <AlertCircle className="h-3.5 w-3.5" />
          <span>Expired - Website removed</span>
        </>
      ) : (
        <>
          <Clock className="h-3.5 w-3.5" />
          <span>Expires in: {timeLeft}</span>
        </>
      )}
    </div>
  );
}
