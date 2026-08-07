/**
 * Generic Template Editor Store
 * Pure configuration form — no preview state.
 */
import { create } from "zustand";
import type { TemplateConfig } from "@/engine/types";

interface TemplateEditorState {
  templateId: string;
  pageId:     string;
  config:     TemplateConfig;
  isDirty:    boolean;
  isSaving:   boolean;
  lastSaved:  Date | null;

  init:       (templateId: string, pageId: string, config: TemplateConfig) => void;
  setField:   (key: string, value: unknown) => void;
  setConfig:  (patch: Partial<TemplateConfig>) => void;
  setIsSaving:(v: boolean) => void;
  setSaved:   (d: Date) => void;
}

// History for undo/redo
const MAX_HISTORY = 50;
let _history: TemplateConfig[] = [];
let _histIdx = -1;

function pushHistory(cfg: TemplateConfig) {
  _history = _history.slice(0, _histIdx + 1);
  _history.push({ ...cfg });
  if (_history.length > MAX_HISTORY) _history.shift();
  _histIdx = _history.length - 1;
}

export const useTemplateEditorStore = create<TemplateEditorState>((set, get) => ({
  templateId:    "",
  pageId:        "",
  config:        {},
  isDirty:       false,
  isSaving:      false,
  lastSaved:     null,

  init: (templateId, pageId, config) => {
    _history = [{ ...config }];
    _histIdx = 0;
    set({ templateId, pageId, config: { ...config }, isDirty: false });
  },

  setField: (key, value) =>
    set((s) => {
      const next = { ...s.config, [key]: value };
      pushHistory(next);
      return { config: next, isDirty: true };
    }),

  setConfig: (patch) =>
    set((s) => {
      const next = { ...s.config, ...patch };
      pushHistory(next);
      return { config: next, isDirty: true };
    }),

  setIsSaving:   (isSaving)       => set({ isSaving }),
  setSaved:      (lastSaved)      => set({ lastSaved, isDirty: false }),
}));

/* Undo / Redo — called outside the store */
export function editorUndo() {
  if (_histIdx <= 0) return;
  _histIdx--;
  const prev = _history[_histIdx];
  useTemplateEditorStore.setState({ config: { ...prev }, isDirty: true });
}
export function editorRedo() {
  if (_histIdx >= _history.length - 1) return;
  _histIdx++;
  const next = _history[_histIdx];
  useTemplateEditorStore.setState({ config: { ...next }, isDirty: true });
}
export function canUndo() { return _histIdx > 0; }
export function canRedo() { return _histIdx < _history.length - 1; }
