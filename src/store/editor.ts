import { create } from "zustand";
import type { BlockInstance, PageTheme } from "@/blocks/types";

export interface EditorPage {
  id: string;
  slug: string;
  title: string;
  templateId: string;
  blocks: BlockInstance[];
  theme: PageTheme;
  seoTitle: string;
  seoDescription: string;
  ogImageUrl: string;
  isPublic: boolean;
  passwordHash: string;
  pinCode: string;
  expiresAt: string;
  status: "draft" | "published" | "expired" | "archived" | "pending_approval";
}

type Viewport = "desktop" | "tablet" | "mobile";

interface EditorState {
  page: EditorPage | null;
  viewport: Viewport;
  selectedBlockId: string | null;
  isSaving: boolean;
  lastSavedAt: Date | null;
  isDirty: boolean;
  activePanel: "blocks" | "settings" | "seo" | "share" | null;
  history: EditorPage[];
  historyIndex: number;

  setPage: (page: EditorPage) => void;
  setViewport: (v: Viewport) => void;
  selectBlock: (id: string | null) => void;
  setIsSaving: (v: boolean) => void;
  setLastSaved: (d: Date) => void;
  setActivePanel: (p: EditorState["activePanel"]) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  updateBlock: (id: string, props: Record<string, unknown>) => void;
  addBlock: (block: BlockInstance, afterId?: string) => void;
  removeBlock: (id: string) => void;
  reorderBlocks: (blocks: BlockInstance[]) => void;
  updateTheme: (patch: Partial<PageTheme>) => void;
  updatePageMeta: (patch: Partial<Omit<EditorPage, "blocks" | "theme">>) => void;
}

function pushHistory(state: EditorState, newPage: EditorPage): Partial<EditorState> {
  const newHistory = state.history.slice(0, state.historyIndex + 1);
  newHistory.push(newPage);
  const capped = newHistory.slice(-50);
  return { history: capped, historyIndex: capped.length - 1, page: newPage, isDirty: true };
}

export const useEditorStore = create<EditorState>()((set, get) => ({
  page: null,
  viewport: "desktop",
  selectedBlockId: null,
  isSaving: false,
  lastSavedAt: null,
  isDirty: false,
  activePanel: null,
  history: [],
  historyIndex: -1,

  setPage: (page) => set({ page, isDirty: false, history: [page], historyIndex: 0 }),
  setViewport: (viewport) => set({ viewport }),
  selectBlock: (selectedBlockId) => set({ selectedBlockId }),
  setIsSaving: (isSaving) => set({ isSaving }),
  setLastSaved: (lastSavedAt) => set({ lastSavedAt, isDirty: false }),
  setActivePanel: (activePanel) => set({ activePanel }),

  canUndo: () => get().historyIndex > 0,
  canRedo: () => get().historyIndex < get().history.length - 1,

  undo: () => {
    const { historyIndex, history } = get();
    if (historyIndex <= 0) return;
    const prev = history[historyIndex - 1];
    set({ historyIndex: historyIndex - 1, page: prev, isDirty: true });
  },

  redo: () => {
    const { historyIndex, history } = get();
    if (historyIndex >= history.length - 1) return;
    const next = history[historyIndex + 1];
    set({ historyIndex: historyIndex + 1, page: next, isDirty: true });
  },

  updateBlock: (id, props) =>
    set((s) => {
      if (!s.page) return {};
      const newPage = {
        ...s.page,
        blocks: s.page.blocks.map((b) =>
          b.id === id ? { ...b, props: { ...b.props, ...props } } : b,
        ),
      };
      return pushHistory(s, newPage);
    }),

  addBlock: (block, afterId) =>
    set((s) => {
      if (!s.page) return {};
      const blocks = [...s.page.blocks];
      const idx = afterId ? blocks.findIndex((b) => b.id === afterId) : blocks.length - 1;
      blocks.splice(idx + 1, 0, block);
      return pushHistory(s, { ...s.page, blocks });
    }),

  removeBlock: (id) =>
    set((s) => {
      if (!s.page) return {};
      return pushHistory(s, { ...s.page, blocks: s.page.blocks.filter((b) => b.id !== id) });
    }),

  reorderBlocks: (blocks) =>
    set((s) => {
      if (!s.page) return {};
      return pushHistory(s, { ...s.page, blocks });
    }),

  updateTheme: (patch) =>
    set((s) => {
      if (!s.page) return {};
      return pushHistory(s, { ...s.page, theme: { ...s.page.theme, ...patch } });
    }),

  updatePageMeta: (patch) =>
    set((s) => {
      if (!s.page) return {};
      return pushHistory(s, { ...s.page, ...patch });
    }),
}));
