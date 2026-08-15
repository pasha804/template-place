import { useEffect, useState } from "react";

export function useTypewriter(fullText: string, speedMs = 18, delayMs = 0) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setOut("");
    setDone(false);
    let i = 0;
    let timer: NodeJS.Timeout;
    const delayTimer = setTimeout(() => {
      timer = setInterval(() => {
        i++;
        setOut(fullText.slice(0, i));
        if (i >= fullText.length) {
          clearInterval(timer);
          setDone(true);
        }
      }, speedMs);
    }, delayMs);

    return () => {
      clearTimeout(delayTimer);
      clearInterval(timer);
    };
  }, [fullText, speedMs, delayMs]);

  return { out, done };
}
