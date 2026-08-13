import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Palette, Settings, Share2, Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from "lucide-react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEditorStore } from "@/store/editor";
import { allBlocks } from "@/blocks/registry";
import { createBlockInstance } from "@/blocks/types";
import { BlockFieldEditor } from "@/components/editor/BlockFieldEditor";
import { ThemeEditor } from "@/components/editor/ThemeEditor";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "blocks", label: "Blocks", icon: Layers },
  { id: "theme", label: "Theme", icon: Palette },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

type Tab = typeof tabs[number]["id"];

function SortableBlock({ id, label, type, isSelected, onSelect, onRemove }: {
  id: string; label: string; type: string; isSelected: boolean;
  onSelect: () => void; onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 transition-all",
        isSelected ? "border-primary/50 bg-primary/8" : "border-border/60 bg-surface hover:border-primary/30"
      )}
      onClick={onSelect}
      role="button"
      tabIndex={0}
    >
      <button type="button" {...attributes} {...listeners} className="cursor-grab touch-none text-muted-foreground hover:text-foreground" onClick={(e) => e.stopPropagation()}>
        <GripVertical className="h-4 w-4" />
      </button>
      <span className="flex-1 text-xs font-medium">{label}</span>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        className="opacity-0 text-muted-foreground transition-opacity hover:text-destructive group-hover:opacity-100"
        aria-label="Remove block"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function EditorSidebar() {
  const [tab, setTab] = useState<Tab>("blocks");
  const [addOpen, setAddOpen] = useState(false);
  const [expandedBlock, setExpandedBlock] = useState<string | null>(null);
  const { page, selectedBlockId, selectBlock, removeBlock, reorderBlocks, addBlock } = useEditorStore();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id || !page) return;
    const oldIdx = page.blocks.findIndex((b) => b.id === active.id);
    const newIdx = page.blocks.findIndex((b) => b.id === over.id);
    reorderBlocks(arrayMove(page.blocks, oldIdx, newIdx));
  }

  return (
    <aside className="flex w-72 shrink-0 flex-col border-r border-border/60 bg-surface overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-border/60 p-1 gap-0.5">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition-all",
              tab === t.id ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {tab === "blocks" && (
          <div className="p-3 space-y-2">
            {/* Add block */}
            <button
              type="button"
              onClick={() => setAddOpen((v) => !v)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-2.5 text-xs font-medium text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground"
            >
              <Plus className="h-3.5 w-3.5" /> Add block
            </button>

            <AnimatePresence>
              {addOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="rounded-xl border border-border/60 bg-background p-2 grid grid-cols-2 gap-1.5">
                    {allBlocks.map((def) => (
                      <button
                        key={def.type}
                        type="button"
                        onClick={() => {
                          addBlock(createBlockInstance(def.type, def.defaults), selectedBlockId ?? undefined);
                          setAddOpen(false);
                        }}
                        className="rounded-lg border border-border/60 px-2 py-2 text-left transition-all hover:border-primary/40 hover:bg-primary/5"
                      >
                        <p className="text-xs font-medium">{def.label}</p>
                        <p className="text-[10px] text-muted-foreground line-clamp-1">{def.description}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Block list */}
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={(page?.blocks ?? []).map((b) => b.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-1.5">
                  {(page?.blocks ?? []).map((block) => {
                    const def = allBlocks.find((d) => d.type === block.type);
                    return (
                      <div key={block.id}>
                        <SortableBlock
                          id={block.id}
                          label={def?.label ?? block.type}
                          type={block.type}
                          isSelected={selectedBlockId === block.id}
                          onSelect={() => {
                            selectBlock(block.id);
                            setExpandedBlock(expandedBlock === block.id ? null : block.id);
                          }}
                          onRemove={() => removeBlock(block.id)}
                        />
                        <AnimatePresence>
                          {expandedBlock === block.id && def && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="rounded-b-xl border border-t-0 border-primary/30 bg-primary/5 px-3 pb-3 pt-2">
                                <BlockFieldEditor blockId={block.id} def={def} props={block.props} />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        )}

        {tab === "theme" && <ThemeEditor />}

        {tab === "settings" && <PageSettingsEditor />}
      </div>
    </aside>
  );
}

function PageSettingsEditor() {
  const { page, updatePageMeta } = useEditorStore();
  if (!page) return null;

  return (
    <div className="space-y-4 p-4">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Page Settings</h3>

      <Field label="Page title">
        <input
          type="text"
          value={page.title}
          onChange={(e) => updatePageMeta({ title: e.target.value })}
          className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
        />
      </Field>

      <Field label="URL slug">
        <input
          type="text"
          value={page.slug}
          onChange={(e) => updatePageMeta({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })}
          className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm font-mono outline-none focus:border-primary"
        />
        <p className="mt-1 text-[10px] text-muted-foreground">greetingvibes.com/p/{page.slug}</p>
      </Field>

      <Field label="PIN code (optional)">
        <input
          type="text"
          value={page.pinCode}
          maxLength={6}
          placeholder="4-6 digits"
          onChange={(e) => updatePageMeta({ pinCode: e.target.value.replace(/\D/g, "") })}
          className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm font-mono outline-none focus:border-primary"
        />
      </Field>

      <Field label="Expires at (optional)">
        <input
          type="date"
          value={page.expiresAt?.slice(0, 10) ?? ""}
          onChange={(e) => updatePageMeta({ expiresAt: e.target.value })}
          className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
        />
      </Field>

      <Field label="Visibility">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={page.isPublic}
            onChange={(e) => updatePageMeta({ isPublic: e.target.checked })}
            className="accent-primary"
          />
          <span className="text-sm">Public page</span>
        </label>
      </Field>

      <div className="border-t border-border/60 pt-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">SEO</h3>
        <Field label="SEO title">
          <input
            type="text"
            value={page.seoTitle}
            placeholder={page.title}
            onChange={(e) => updatePageMeta({ seoTitle: e.target.value })}
            className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </Field>
        <Field label="SEO description">
          <textarea
            rows={3}
            value={page.seoDescription}
            onChange={(e) => updatePageMeta({ seoDescription: e.target.value })}
            className="w-full resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </Field>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}
