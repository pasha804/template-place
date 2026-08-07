/**
 * EditorFormPanel — full-width configuration form
 *
 * Replaces the old split layout (left sidebar + preview pane).
 * There is NO preview here. This is a pure data-entry page.
 *
 * Layout:
 *   - Centered container, max-width 760px
 *   - Template info header (name, category, price)
 *   - All schema sections as collapsible accordion cards
 *   - Page settings at the bottom (collapsible)
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { ExternalTemplatePlugin } from "@/engine/types";
import { useTemplateEditorStore } from "@/store/templateEditor";
import { FieldWidget } from "./FieldWidget";
import { cn } from "@/lib/utils";

interface Props {
  plugin: ExternalTemplatePlugin;
}

export function EditorFormPanel({ plugin }: Props) {
  const { config, setField } = useTemplateEditorStore();

  // All sections except "page" shown in the main accordion
  const mainSections = plugin.schema.filter((s) => s.key !== "page");
  const pageSection  = plugin.schema.find((s) => s.key === "page");

  // Track which section is open (null = all collapsed, or a set)
  const [openSections, setOpenSections] = useState<Set<string>>(() => {
    // Open the first section by default
    const first = mainSections[0]?.key;
    return first ? new Set([first]) : new Set();
  });

  function toggleSection(key: string) {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <div className="mx-auto w-full max-w-[760px] px-4 py-8 pb-16">
      {/* ── Template info header ── */}
      <div className="mb-8 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
        <div className="flex items-start gap-4">
          {/* Accent cover */}
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-3xl"
            style={{ background: plugin.manifest.coverGradient }}
          >
            {plugin.manifest.thumbnailUrl ? (
              <img
                src={plugin.manifest.thumbnailUrl}
                alt={plugin.manifest.name}
                className="h-full w-full rounded-xl object-cover"
              />
            ) : (
              <span>{plugin.manifest.accentEmoji}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-white truncate">{plugin.manifest.name}</h1>
            <p className="text-sm text-white/40 capitalize">{plugin.manifest.category}</p>
            <p className="mt-1 text-sm text-white/30 leading-snug line-clamp-2">
              {plugin.manifest.tagline}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <span
              className="text-xl font-black"
              style={{
                background: "linear-gradient(135deg,#a78bfa,#f472b6)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {plugin.manifest.priceCents === 0
                ? "Free"
                : `Rs. ${plugin.manifest.priceCents.toLocaleString("en-PK")}`}
            </span>
          </div>
        </div>
      </div>

      {/* ── Section hint ── */}
      <p className="mb-4 text-xs text-white/25 px-1">
        Fill in your details below. All changes are auto-saved every 30 seconds.
      </p>

      {/* ── Main sections accordion ── */}
      <div className="space-y-3">
        {mainSections.map((section) => {
          const isOpen = openSections.has(section.key);
          return (
            <div
              key={section.key}
              className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025]"
            >
              {/* Section header */}
              <button
                type="button"
                onClick={() => toggleSection(section.key)}
                className={cn(
                  "flex w-full items-center gap-3 px-5 py-4 text-left transition-colors",
                  isOpen ? "bg-violet-600/10" : "hover:bg-white/[0.03]",
                )}
              >
                <span className="text-xl leading-none">{section.icon ?? "⚙️"}</span>
                <span
                  className={cn(
                    "flex-1 text-sm font-semibold",
                    isOpen ? "text-white" : "text-white/60",
                  )}
                >
                  {section.label}
                </span>
                <span className="text-white/30">
                  {isOpen ? (
                    <ChevronDown className="h-4 w-4 text-violet-400" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </span>
              </button>

              {/* Section body */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/[0.06] px-5 py-5 space-y-5">
                      {section.fields.map((field) => (
                        <div key={field.key}>
                          <label className="mb-2 block">
                            <span className="text-sm font-semibold text-white/70">
                              {field.label}
                            </span>
                            {field.help && (
                              <span className="mt-0.5 block text-xs text-white/30 leading-relaxed">
                                {field.help}
                              </span>
                            )}
                          </label>
                          <FieldWidget
                            field={field}
                            value={config[field.key]}
                            onChange={(v) => setField(field.key, v)}
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* ── Page Settings section ── */}
        {pageSection && (
          <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015]">
            <button
              type="button"
              onClick={() => toggleSection("page")}
              className={cn(
                "flex w-full items-center gap-3 px-5 py-4 text-left transition-colors",
                openSections.has("page") ? "bg-violet-600/8" : "hover:bg-white/[0.03]",
              )}
            >
              <span className="text-xl leading-none">⚙️</span>
              <span
                className={cn(
                  "flex-1 text-sm font-semibold",
                  openSections.has("page") ? "text-white" : "text-white/40",
                )}
              >
                Page Settings
              </span>
              <span className="text-white/20">
                {openSections.has("page") ? (
                  <ChevronDown className="h-4 w-4 text-violet-400/60" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {openSections.has("page") && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-white/[0.05] px-5 py-5 space-y-5">
                    {pageSection.fields.map((field) => (
                      <div key={field.key}>
                        <label className="mb-2 block">
                          <span className="text-sm font-semibold text-white/50">
                            {field.label}
                          </span>
                        </label>
                        <FieldWidget
                          field={field}
                          value={config[field.key]}
                          onChange={(v) => setField(field.key, v)}
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* ── Bottom spacer so last section isn't hidden behind anything ── */}
      <div className="h-8" />
    </div>
  );
}
