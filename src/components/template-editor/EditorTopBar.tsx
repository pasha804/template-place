/**
 * EditorTopBar — Save / Undo / Redo / Preview / Continue to Checkout
 */
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft, Undo2, Redo2, Save, Loader2,
  CheckCircle2, ArrowRight, Eye,
} from "lucide-react";
import { useTemplateEditorStore, editorUndo, editorRedo, canUndo, canRedo } from "@/store/templateEditor";

interface Props {
  onSave: () => Promise<void>;
  onPublish: () => Promise<void>;
}

export function EditorTopBar({ onSave }: Props) {
  const navigate = useNavigate();
  const { isDirty, isSaving, lastSaved, config, pageId } = useTemplateEditorStore();

  async function handleContinue() {
    // Auto-save before going to checkout
    if (isDirty) await onSave();
    navigate({ to: "/checkout/$pageId", params: { pageId } });
  }

  async function handlePreview() {
    if (isDirty) await onSave();
    const slug = (config._page_slug as string) || pageId;
    window.open(`/p/${slug}`, "_blank");
  }

  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-white/[0.06] bg-[#0d0b20] px-3 gap-2">
      {/* Left */}
      <div className="flex items-center gap-2">
        <Link to="/dashboard"
          className="flex h-8 w-8 items-center justify-center rounded-xl text-white/40 hover:bg-white/[0.06] hover:text-white/80 transition-colors"
          aria-label="Back to dashboard">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="hidden sm:flex items-center gap-1.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-violet-600 text-xs font-black text-white">S</div>
          <span className="text-sm font-semibold text-white/80 truncate max-w-[140px]">
            {(config._page_title as string) || "Untitled page"}
          </span>
          {isDirty && (
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" title="Unsaved changes" />
          )}
        </div>
      </div>

      {/* Center — undo/redo */}
      <div className="flex items-center gap-1">
        <button type="button" onClick={editorUndo} disabled={!canUndo()}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-white/35 disabled:opacity-20 hover:bg-white/[0.06] hover:text-white/70 transition-colors"
          aria-label="Undo">
          <Undo2 className="h-3.5 w-3.5" />
        </button>
        <button type="button" onClick={editorRedo} disabled={!canRedo()}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-white/35 disabled:opacity-20 hover:bg-white/[0.06] hover:text-white/70 transition-colors"
          aria-label="Redo">
          <Redo2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1.5">
        {/* Save status */}
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-white/30 min-w-[80px] justify-end">
          {isSaving ? (
            <><Loader2 className="h-3 w-3 animate-spin" /> Saving…</>
          ) : lastSaved ? (
            <><CheckCircle2 className="h-3 w-3 text-emerald-400" /> Saved</>
          ) : null}
        </div>

        {/* Live Preview */}
        <button type="button" onClick={handlePreview} disabled={isSaving}
          className="flex h-8 items-center gap-1.5 rounded-xl border border-violet-500/30 bg-violet-500/10 px-3 text-xs font-semibold text-violet-300 hover:bg-violet-500/20 transition-colors">
          <Eye className="h-3.5 w-3.5" /> Preview
        </button>

        {/* Save draft */}
        <button type="button" onClick={onSave} disabled={isSaving || !isDirty}
          className="flex h-8 items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-xs font-medium text-white/60 hover:text-white disabled:opacity-40 transition-colors">
          {isSaving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
          Save
        </button>

        {/* Continue → Checkout */}
        <button type="button" onClick={handleContinue} disabled={isSaving}
          className="flex h-8 items-center gap-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 px-4 text-xs font-bold text-white shadow-[0_0_16px_rgba(236,72,153,0.3)] hover:scale-[1.03] transition-all disabled:opacity-60">
          Continue <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </header>
  );
}

