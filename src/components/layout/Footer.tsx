import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Twitter, Instagram, Github, Mail, Heart, Youtube, ShieldCheck, FileText, X } from "lucide-react";

type FooterItem = {
  label: string;
  href?: string;
  action?: "privacy" | "terms";
};

const cols: Record<string, FooterItem[]> = {
  Product: [
    { label: "Pricing",    href: "/pricing" },
    { label: "Templates",  href: "/templates" },
  ],
  Company: [
    { label: "Contact",    href: "/contact" },
    { label: "About us",   href: "/contact" },
  ],
  Support: [
    { label: "Privacy Policy",  action: "privacy", href: "/contact" },
    { label: "Term of Service", action: "terms",   href: "/contact" },
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
  const [modalType, setModalType] = useState<"privacy" | "terms" | null>(null);

  return (
    <>
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
            {Object.entries(cols).map(([group, items]) => (
              <div key={group}>
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-white/30">{group}</p>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item.label}>
                      {item.action ? (
                        <button
                          type="button"
                          onClick={() => setModalType(item.action)}
                          className="group flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white"
                        >
                          <span className="h-px w-0 bg-pink-500 transition-all duration-300 group-hover:w-3" />
                          {item.label}
                        </button>
                      ) : (
                        <Link
                          to={item.href || "/"}
                          className="group flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white"
                        >
                          <span className="h-px w-0 bg-pink-500 transition-all duration-300 group-hover:w-3" />
                          {item.label}
                        </Link>
                      )}
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

      {/* Legal Modal (Privacy Policy & Term of Service) */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0e0c1f] p-6 sm:p-8 text-white shadow-2xl"
            style={{ boxShadow: "0 25px 60px -15px rgba(236,72,153,0.3)" }}
          >
            <button
              type="button"
              onClick={() => setModalType(null)}
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
            </button>

            {modalType === "privacy" ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Privacy Policy</h2>
                    <p className="text-xs text-white/40">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-white/70 leading-relaxed pt-3 border-t border-white/10">
                  <p>
                    Welcome to Greeting Vibes Templates. We respect your privacy and are committed to protecting any personal data you share with us.
                  </p>
                  <div>
                    <h3 className="font-semibold text-white mb-1">1. Information We Collect</h3>
                    <p>We collect information you provide directly, such as your email address when creating an account or contacting us, and any personalized greetings, photos, and messages you add to your templates.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">2. How We Use Information</h3>
                    <p>Your data is strictly used to render, customize, and publish your personal celebration pages, process transactions, and provide customer support.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">3. Data Security & PIN Protection</h3>
                    <p>Pages configured with a PIN lock are accessible only to recipients who have the PIN you set. We never sell or distribute your personal memories to third-party advertisers.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">4. Contact Us</h3>
                    <p>If you have any questions regarding your data, please contact us at <a href="mailto:greetingvibes786@gmail.com" className="text-pink-400 underline">greetingvibes786@gmail.com</a>.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Term of Service</h2>
                    <p className="text-xs text-white/40">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-white/70 leading-relaxed pt-3 border-t border-white/10">
                  <p>
                    By using Greeting Vibes Templates, you agree to comply with and be bound by the following terms and conditions.
                  </p>
                  <div>
                    <h3 className="font-semibold text-white mb-1">1. Template Usage & Content</h3>
                    <p>You may use Greeting Vibes templates to create personal celebrations, greeting cards, and announcement websites. You agree not to upload abusive, harmful, or unlawful media.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">2. Premium Purchases</h3>
                    <p>Templates and premium features purchased grant you access to customize and publish pages as specified at checkout. All payments are securely processed.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">3. Service Availability</h3>
                    <p>We strive for 99.9% uptime for published greeting sites so your celebrations remain accessible worldwide at any time.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">4. Modifications</h3>
                    <p>We reserve the right to improve and update features. Continued use of the platform constitutes acceptance of updated terms.</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="rounded-xl px-5 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/15 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
