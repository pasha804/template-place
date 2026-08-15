import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Twitter, Instagram, Github, Mail, Heart, Youtube } from "lucide-react";

const cols = {
  Product: [
    { label: "Templates",  href: "/templates" },
    { label: "Pricing",    href: "/pricing" },
    { label: "Features",   href: "/#features" },
  ],
  Company: [
    { label: "About Us",   href: "/contact" },
    { label: "Careers",    href: "/contact" },
    { label: "Contact",    href: "/contact" },
    { label: "Partners",   href: "/contact" },
  ],
  Support: [
    { label: "Help Center",     href: "/contact" },
    { label: "Documentation",   href: "/contact" },
    { label: "Status",          href: "/contact" },
    { label: "Privacy Policy",  href: "/contact" },
  ],
};

const socials = [
  { icon: Twitter,   href: "https://twitter.com",   label: "Twitter",   color: "#1d9bf0" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram", color: "#e1306c" },
  { icon: Youtube,   href: "https://youtube.com",   label: "YouTube",   color: "#ff0000" },
  { icon: Github,    href: "https://github.com",     label: "GitHub",    color: "#e6edf3" },
  { icon: Mail,      href: "mailto:greetingvibes786@gmail.com", label: "Email", color: "#a78bfa" },
];

export function Footer() {
  return (
    <footer
      className="relative mt-10 border-t border-white/[0.06]"
      style={{ background: "rgba(255,255,255,0.015)" }}
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="group mb-5 flex items-center gap-2.5">
              <img
                src="/dp.jpeg"
                alt="Greeting Vibes Logo"
                className="h-9 w-9 rounded-xl object-cover shadow-[0_0_18px_rgba(236,72,153,0.35)] ring-1 ring-white/15 transition-transform duration-300 group-hover:scale-105"
              />
              <div>
                <p className="text-sm font-bold text-white transition-colors group-hover:text-pink-300">Greeting Vibes</p>
                <p className="text-[10px] text-white/35">Templates</p>
              </div>
            </Link>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-white/40">
              Build stunning personal websites for your loved ones. Choose a template, customize it and share your love in minutes.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.04] text-white/40 transition-colors"
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = s.color; (e.currentTarget as HTMLElement).style.borderColor = s.color + "40"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = ""; (e.currentTarget as HTMLElement).style.borderColor = ""; }}>
                  <s.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(cols).map(([group, items], gi) => (
            <div key={group}>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-white/30">{group}</p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link to={item.href}
                      className="group flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white">
                      <span className="h-px w-0 bg-pink-500 transition-all duration-300 group-hover:w-3" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.05] pt-8 sm:flex-row">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Greeting Vibes Templates. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-white/25">
            Made with <Heart className="h-3 w-3 fill-pink-500 text-pink-500" /> for every occasion
          </p>
        </div>
      </div>
    </footer>
  );
}
