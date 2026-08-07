import { useEffect, useState } from "react"

export function useTypewriter(text: string, { speed = 28, delay = 500 } = {}) {
  const [out, setOut] = useState("")
  useEffect(() => {
    setOut("")
    let i = 0
    let timer: ReturnType<typeof setInterval>
    const start = setTimeout(() => {
      timer = setInterval(() => {
        i++
        setOut(text.slice(0, i))
        if (i >= text.length) clearInterval(timer)
      }, speed)
    }, delay)
    return () => { clearTimeout(start); clearInterval(timer) }
  }, [text, speed, delay])
  return { text: out, done: out.length >= text.length }
}
