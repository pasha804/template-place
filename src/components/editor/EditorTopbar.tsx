import { Link } from "@tanstack/react-router";
import { ArrowLeft, Monitor, Tablet, Smartphone, Undo2, Redo2, Save, Eye, Loader2, CheckCircle2 } from "lucide-react";
import { useEditorStore } from "@/store/editor";
import { cn } from "@/lib/utils";

const viewports = [
  { id: "desktop", icon: Monitor, label: "Desktop" },
  { id: "tablet", icon: Tablet, label: "Tablet" },
  { id: "mobile", icon: Smartphone, label: "Mobile" },
] as const;

export function EditorTopbar({ onSave }: { onSave: () => void }) {
  const { page, viewport, setViewport, isSaving, lastSavedAt, isDirty, undo, redo, canUndo, canRedo } = useEditorStore();

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border/60 bg-surface px-4">
      {/* Left */}
      <div className="flex items-center gap-3">
        <Link to="/dashboard" className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Dashboard</span>
        </Link>
        <span className="text-border/60">|</span>
        <span className="max-w-[180px] truncate text-sm font-medium">{page?.title ?? "Untitled"}</span>
        {isDirty && <span className="h-1.5 w-1.5 rounded-full bg-warning" title="Unsaved changes" />}
      </div>

      {/* Center – viewport */}
      <div className="flex items-center rounded-xl border border-border bg-background p-1 gap-0.5">
        {viewports.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setViewport(v.id)}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-lg transition-all",
              viewport === v.id ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
            aria-label={v.label}
          >
            <v.icon className="h-3.5 w-3.5" />
          </button>
        ))}
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Undo/Redo */}
        <button
          type="button"
          onClick={undo}
          disabled={!canUndo()}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground disabled:opacity-30"
          aria-label="Undo"
        >
          <Undo2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={redo}
          disabled={!canRedo()}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground disabled:opacity-30"
          aria-label="Redo"
        >
          <Redo2 className="h-4 w-4" />
        </button>

        {/* Save status */}
        <div className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
          {isSaving ? (
            <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving…</>
          ) : lastSavedAt ? (
            <><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Saved</>
          ) : null}
        </div>

        <button
          type="button"
          onClick={onSave}
          disabled={isSaving || !isDirty}
          className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow transition-all hover:bg-primary/90 disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
          Save
        </button>

        <Link
          to="/p/$slug"
          params={{ slug: page?.slug ?? "" }}
          target="_blank"
          className="flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-xs font-medium transition-all hover:border-primary/40"
        >
          <Eye className="h-3.5 w-3.5" /> Preview
        </Link>
      </div>
    </header>
  );
}
