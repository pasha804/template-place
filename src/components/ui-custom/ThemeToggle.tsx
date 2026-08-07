import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

function getInitialDark(): boolean {
  if (typeof window === "undefined") return true;
  const stored = localStorage.getItem("shaukat-theme");
  if (stored === "light") return false;
  if (stored === "dark") return true;
  // default dark
  return true;
}

function applyTheme(dark: boolean) {
  const root = document.documentElement;
  if (dark) {
    root.classList.remove("light");
    localStorage.setItem("shaukat-theme", "dark");
  } else {
    root.classList.add("light");
    localStorage.setItem("shaukat-theme", "light");
  }
}

export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(getInitialDark);

  useEffect(() => {
    applyTheme(dark);
  }, [dark]);

  // Apply on mount without waiting for state change
  useEffect(() => {
    applyTheme(getInitialDark());
  }, []);

  return (
    <button
      type="button"
      onClick={() => setDark((d) => !d)}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] text-muted-foreground backdrop-blur transition-all hover:border-primary/40 hover:text-foreground",
        className,
      )}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
