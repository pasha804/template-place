import { useEditorStore } from "@/store/editor";
import type { PageTheme } from "@/blocks/types";

const colorFields: { key: keyof PageTheme; label: string }[] = [
  { key: "primary", label: "Primary color" },
  { key: "accent", label: "Accent color" },
  { key: "background", label: "Background" },
  { key: "surface", label: "Surface" },
  { key: "foreground", label: "Foreground text" },
  { key: "muted", label: "Muted text" },
];

const fontOptions = [
  "'Sora', sans-serif",
  "'Manrope', sans-serif",
  "'Playfair Display', serif",
  "'DM Serif Display', serif",
  "'Inter', sans-serif",
  "'Raleway', sans-serif",
];

const radiusOptions = [
  { label: "None", value: "0px" },
  { label: "Small", value: "8px" },
  { label: "Medium", value: "14px" },
  { label: "Large", value: "20px" },
  { label: "Extra Large", value: "28px" },
];

export function ThemeEditor() {
  const { page, updateTheme } = useEditorStore();
  if (!page) return null;
  const theme = page.theme;

  return (
    <div className="space-y-5 p-4">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Colors</h3>
      <div className="grid grid-cols-2 gap-3">
        {colorFields.map(({ key, label }) => (
          <div key={key}>
            <label className="mb-1 block text-[11px] text-muted-foreground">{label}</label>
            <div className="flex items-center gap-2">
              <div className="relative h-7 w-7 overflow-hidden rounded-lg border border-border">
                <input
                  type="color"
                  value={theme[key] as string}
                  onChange={(e) => updateTheme({ [key]: e.target.value })}
                  className="absolute -inset-1 cursor-pointer border-0 p-0 opacity-0 w-10 h-10"
                />
                <div className="h-full w-full rounded-md" style={{ background: theme[key] as string }} />
              </div>
              <input
                type="text"
                value={theme[key] as string}
                onChange={(e) => updateTheme({ [key]: e.target.value })}
                className="flex-1 rounded-lg border border-input bg-background px-2 py-1 text-[11px] font-mono outline-none focus:border-primary"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border/60 pt-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Typography</h3>
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-[11px] text-muted-foreground">Display font</label>
            <select
              value={theme.displayFont}
              onChange={(e) => updateTheme({ displayFont: e.target.value })}
              className="w-full rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs outline-none focus:border-primary"
            >
              {fontOptions.map((f) => (
                <option key={f} value={f} style={{ fontFamily: f }}>{f.split(",")[0].replace(/'/g, "")}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-[11px] text-muted-foreground">Body font</label>
            <select
              value={theme.bodyFont}
              onChange={(e) => updateTheme({ bodyFont: e.target.value })}
              className="w-full rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs outline-none focus:border-primary"
            >
              {fontOptions.map((f) => (
                <option key={f} value={f}>{f.split(",")[0].replace(/'/g, "")}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="border-t border-border/60 pt-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Border radius</h3>
        <div className="grid grid-cols-3 gap-1.5">
          {radiusOptions.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => updateTheme({ radius: r.value })}
              className="rounded-lg border py-2 text-[11px] transition-all"
              style={{
                borderColor: theme.radius === r.value ? "var(--primary)" : "var(--border)",
                color: theme.radius === r.value ? "var(--primary)" : "var(--muted-foreground)",
                background: theme.radius === r.value ? "color-mix(in oklab, var(--primary) 10%, transparent)" : "transparent",
              }}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
