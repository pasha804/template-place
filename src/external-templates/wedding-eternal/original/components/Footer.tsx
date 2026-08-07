// @ts-nocheck
import { motion } from "framer-motion"
import { Instagram, Facebook, MessageCircle, MapPin } from "lucide-react"

export function Footer({
  brideName = "Ayesha",
  groomName = "Hamza",
  hashtag = "#AyeshaWedsHamza",
}: {
  brideName?: string
  groomName?: string
  hashtag?: string
}) {
  const links = [
    { href: "https://instagram.com", Icon: Instagram, label: "Instagram" },
    { href: "https://facebook.com", Icon: Facebook, label: "Facebook" },
    { href: "https://wa.me/920000000000", Icon: MessageCircle, label: "WhatsApp" },
    { href: "https://maps.google.com", Icon: MapPin, label: "Venue location" },
  ]

  return (
    <footer className="relative overflow-hidden bg-navy-abyss pt-24 pb-12">
      <div className="absolute inset-x-0 top-0 h-px gold-rule" />
      <div className="absolute inset-0 opacity-70 [background:radial-gradient(60%_60%_at_50%_100%,color-mix(in_oklab,var(--gold)_12%,transparent),transparent_70%)]" />

      <div className="relative mx-auto max-w-[1400px] px-6 text-center sm:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="font-display mx-auto max-w-md text-sm leading-relaxed text-ivory/55 italic"
        >
          &ldquo;Love makes life a beautiful journey — thank you for walking part of it with us.&rdquo;
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, filter: "blur(16px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
          className="font-script text-gold-gradient mt-8 text-5xl leading-tight sm:text-7xl"
        >
          {brideName} &amp; {groomName}
        </motion.h2>

        <p className="mt-4 text-[0.62rem] tracking-luxe text-gold/80 uppercase">
          {hashtag}
        </p>

        <div className="gold-rule mx-auto mt-10 h-px w-52" />

        <ul className="mt-10 flex justify-center gap-4">
          {links.map(({ href, Icon, label }) => (
            <li key={label}>
              <motion.a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                whileHover={{ y: -5 }}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/35 text-gold transition-all duration-500 hover:border-gold hover:shadow-[0_0_30px_-8px_var(--gold)]"
              >
                <Icon className="h-4 w-4" strokeWidth={1.3} aria-hidden />
              </motion.a>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-[0.62rem] tracking-[0.28em] text-ivory/35 uppercase">
          December 25, 2026 &middot; Lahore, Pakistan
        </p>
        <p className="mt-3 text-[0.6rem] tracking-[0.2em] text-ivory/25 uppercase">
          Made with love for our favourite people
        </p>
      </div>
    </footer>
  )
}
