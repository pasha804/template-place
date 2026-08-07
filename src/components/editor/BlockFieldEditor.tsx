import { useEditorStore } from "@/store/editor";
import type { BlockDefinition } from "@/blocks/types";

interface Props {
  blockId: string;
  def: BlockDefinition;
  props: Record<string, unknown>;
}

export function BlockFieldEditor({ blockId, def, props }: Props) {
  const { updateBlock } = useEditorStore();

  function set(key: string, value: unknown) {
    updateBlock(blockId, { [key]: value });
  }

  return (
    <div className="space-y-3">
      {def.fields.map((field) => {
        const val = props[field.key];

        if (field.kind === "text" || field.kind === "image" || field.kind === "video" || field.kind === "audio") {
          return (
            <div key={field.key}>
              <label className="mb-1 block text-[11px] font-medium text-muted-foreground">{field.label}</label>
              <input
                type="text"
                value={(val as string) ?? ""}
                placeholder={field.placeholder ?? ""}
                onChange={(e) => set(field.key, e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs outline-none focus:border-primary"
              />
              {field.help && <p className="mt-0.5 text-[10px] text-muted-foreground">{field.help}</p>}
            </div>
          );
        }

        if (field.kind === "textarea") {
          return (
            <div key={field.key}>
              <label className="mb-1 block text-[11px] font-medium text-muted-foreground">{field.label}</label>
              <textarea
                rows={4}
                value={(val as string) ?? ""}
                placeholder={field.placeholder ?? ""}
                onChange={(e) => set(field.key, e.target.value)}
                className="w-full resize-none rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs outline-none focus:border-primary"
              />
              {field.help && <p className="mt-0.5 text-[10px] text-muted-foreground">{field.help}</p>}
            </div>
          );
        }

        if (field.kind === "number") {
          return (
            <div key={field.key}>
              <label className="mb-1 block text-[11px] font-medium text-muted-foreground">{field.label}</label>
              <input
                type="number"
                min={field.min}
                max={field.max}
                value={(val as number) ?? 0}
                onChange={(e) => set(field.key, Number(e.target.value))}
                className="w-full rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs outline-none focus:border-primary"
              />
            </div>
          );
        }

        if (field.kind === "boolean") {
          return (
            <div key={field.key} className="flex items-center gap-2">
              <input
                id={`${blockId}-${field.key}`}
                type="checkbox"
                checked={(val as boolean) ?? false}
                onChange={(e) => set(field.key, e.target.checked)}
                className="accent-primary"
              />
              <label htmlFor={`${blockId}-${field.key}`} className="text-xs font-medium cursor-pointer">{field.label}</label>
            </div>
          );
        }

        if (field.kind === "select" && field.options) {
          return (
            <div key={field.key}>
              <label className="mb-1 block text-[11px] font-medium text-muted-foreground">{field.label}</label>
              <select
                value={(val as string) ?? ""}
                onChange={(e) => set(field.key, e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs outline-none focus:border-primary"
              >
                {field.options.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          );
        }

        if (field.kind === "date") {
          return (
            <div key={field.key}>
              <label className="mb-1 block text-[11px] font-medium text-muted-foreground">{field.label}</label>
              <input
                type="date"
                value={((val as string) ?? "").slice(0, 10)}
                onChange={(e) => set(field.key, e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs outline-none focus:border-primary"
              />
            </div>
          );
        }

        if (field.kind === "list-text" || field.kind === "list-image") {
          const list = (val as string[]) ?? [];
          return (
            <div key={field.key}>
              <label className="mb-1 block text-[11px] font-medium text-muted-foreground">{field.label}</label>
              {field.help && <p className="mb-1 text-[10px] text-muted-foreground">{field.help}</p>}
              <div className="space-y-1.5">
                {list.map((item, i) => (
                  <div key={i} className="flex gap-1.5">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const next = [...list];
                        next[i] = e.target.value;
                        set(field.key, next);
                      }}
                      className="flex-1 rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs outline-none focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => set(field.key, list.filter((_, j) => j !== i))}
                      className="rounded-lg border border-destructive/30 px-2 text-xs text-destructive hover:bg-destructive/10"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => set(field.key, [...list, ""])}
                  className="w-full rounded-lg border border-dashed border-border py-1.5 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
                >
                  + Add
                </button>
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
