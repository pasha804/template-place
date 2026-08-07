/**
 * FieldWidget — renders the right input control for any FieldDef.
 * Generic: works for every external template, no template-specific logic.
 */
import { useRef } from "react";
import { Upload, X, Plus, GripVertical, Trash2 } from "lucide-react";
import type { FieldDef } from "@/engine/types";
import { cn } from "@/lib/utils";

interface Props {
  field: FieldDef;
  value: unknown;
  onChange: (value: unknown) => void;
}

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5 text-sm text-white/90 outline-none transition-all focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/15 placeholder:text-white/25";

export function FieldWidget({ field, value, onChange }: Props) {
  const { kind } = field;

  /* ── text / pin ── */
  if (kind === "text" || kind === "pin") {
    return (
      <input
        type={kind === "pin" ? "password" : "text"}
        value={(value as string) ?? ""}
        placeholder={field.placeholder}
        maxLength={kind === "pin" ? 6 : undefined}
        className={inputCls}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  /* ── textarea ── */
  if (kind === "textarea") {
    return (
      <textarea
        rows={field.rows ?? 4}
        value={(value as string) ?? ""}
        placeholder={field.placeholder}
        className={cn(inputCls, "resize-y min-h-[80px]")}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  /* ── color ── */
  if (kind === "color") {
    const hex = (value as string) || "#b50000";
    return (
      <div className="flex items-center gap-2">
        <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-white/15 flex-shrink-0">
          <div className="absolute inset-0 rounded-xl" style={{ background: hex }} />
          <input
            type="color"
            value={hex}
            onChange={(e) => onChange(e.target.value)}
            className="absolute -inset-1 cursor-pointer opacity-0 w-12 h-12"
          />
        </div>
        <input
          type="text"
          value={hex}
          onChange={(e) => onChange(e.target.value)}
          className={cn(inputCls, "font-mono text-xs")}
          maxLength={7}
        />
      </div>
    );
  }

  /* ── boolean toggle ── */
  if (kind === "boolean") {
    const checked = Boolean(value ?? true);
    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full border transition-all duration-200",
          checked
            ? "bg-violet-600 border-violet-500"
            : "bg-white/[0.08] border-white/10",
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200",
            checked ? "translate-x-6" : "translate-x-1",
          )}
        />
      </button>
    );
  }

  /* ── number ── */
  if (kind === "number") {
    return (
      <input
        type="number"
        value={(value as number) ?? 0}
        min={field.min}
        max={field.max}
        step={field.step ?? 1}
        className={inputCls}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    );
  }

  /* ── range slider ── */
  if (kind === "range") {
    const v = (value as number) ?? field.min ?? 0;
    return (
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={field.min ?? 0}
          max={field.max ?? 100}
          step={field.step ?? 1}
          value={v}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-1.5 accent-violet-500 cursor-pointer"
        />
        <span className="w-10 text-right text-xs font-mono text-white/60">{v}</span>
      </div>
    );
  }

  /* ── select dropdown ── */
  if (kind === "select" && field.options) {
    return (
      <select
        value={(value as string) ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className={cn(inputCls, "cursor-pointer appearance-none")}
      >
        {field.options.map((o) => (
          <option key={o.value} value={o.value} className="bg-[#1a1730]">
            {o.label}
          </option>
        ))}
      </select>
    );
  }

  /* ── date ── */
  if (kind === "date") {
    return (
      <input
        type="date"
        value={((value as string) ?? "").slice(0, 10)}
        className={inputCls}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  /* ── image / gif / audio / video ── */
  if (kind === "image" || kind === "gif" || kind === "audio" || kind === "video") {
    return <MediaUploadWidget field={field} value={value as string} onChange={onChange} />;
  }

  /* ── list-text ── */
  if (kind === "list-text") {
    const list = (value as string[]) ?? [];
    return (
      <div className="space-y-2">
        {list.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => {
                const next = [...list];
                next[i] = e.target.value;
                onChange(next);
              }}
              className={cn(inputCls, "flex-1 text-xs")}
            />
            <button
              type="button"
              onClick={() => onChange(list.filter((_, j) => j !== i))}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-500/25 text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...list, ""])}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/15 py-2 text-xs text-white/40 hover:border-violet-500/40 hover:text-white/70 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" /> Add item
        </button>
      </div>
    );
  }

  /* ── list-image ── */
  if (kind === "list-image") {
    const list = (value as string[]) ?? [];
    return (
      <div className="space-y-2">
        <div className="grid grid-cols-3 gap-2">
          {list.map((src, i) => (
            <div key={i} className="relative group aspect-square overflow-hidden rounded-xl border border-white/10">
              <img src={src} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => onChange(list.filter((_, j) => j !== i))}
                className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 text-center text-[9px] bg-black/50 text-white/50 py-0.5">
                {i + 1}
              </div>
            </div>
          ))}
          <UploadButton
            accept="image/*"
            label="Add photo"
            onUpload={(url) => onChange([...list, url])}
          />
        </div>
        {field.help && <p className="text-[10px] text-white/35">{field.help}</p>}
      </div>
    );
  }

  /* ── list-cards (object cards OR string cards) ── */
  if (kind === "list-cards") {
    const list = Array.isArray(value) ? value : [];
    return (
      <div className="space-y-3">
        {list.map((card, i) => {
          const isObj = typeof card === "object" && card !== null;
          return (
            <div key={i} className="relative rounded-xl border border-white/10 bg-white/[0.03] p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-violet-400">Card #{i + 1}</span>
                <button
                  type="button"
                  onClick={() => onChange(list.filter((_, j) => j !== i))}
                  className="flex h-6 w-6 items-center justify-center rounded-lg border border-red-500/25 text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>

              {isObj ? (
                <div className="space-y-2">
                  {("title" in card || true) && (
                    <input
                      type="text"
                      placeholder="Title"
                      value={card.title ?? ""}
                      onChange={(e) => {
                        const next = [...list];
                        next[i] = { ...card, title: e.target.value };
                        onChange(next);
                      }}
                      className={cn(inputCls, "text-xs")}
                    />
                  )}
                  {("date" in card || "date" in (list[0] || {})) && (
                    <input
                      type="text"
                      placeholder="Date (e.g. June 12, 2018)"
                      value={card.date ?? ""}
                      onChange={(e) => {
                        const next = [...list];
                        next[i] = { ...card, date: e.target.value };
                        onChange(next);
                      }}
                      className={cn(inputCls, "text-xs")}
                    />
                  )}
                  {("text" in card || "copy" in card || true) && (
                    <textarea
                      rows={2}
                      placeholder="Description"
                      value={card.text ?? card.copy ?? ""}
                      onChange={(e) => {
                        const next = [...list];
                        next[i] = { ...card, text: e.target.value, copy: e.target.value };
                        onChange(next);
                      }}
                      className={cn(inputCls, "text-xs resize-none")}
                    />
                  )}
                  {("imageUrl" in card || "image" in card || "img" in card || true) && (
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={card.imageUrl ?? card.image ?? card.img ?? ""}
                      onChange={(e) => {
                        const next = [...list];
                        next[i] = { ...card, imageUrl: e.target.value, image: e.target.value, img: e.target.value };
                        onChange(next);
                      }}
                      className={cn(inputCls, "text-xs")}
                    />
                  )}
                </div>
              ) : (
                <textarea
                  rows={2}
                  value={String(card ?? "")}
                  onChange={(e) => {
                    const next = [...list];
                    next[i] = e.target.value;
                    onChange(next);
                  }}
                  className={cn(inputCls, "text-xs resize-none")}
                />
              )}
            </div>
          );
        })}
        <button
          type="button"
          onClick={() => {
            const first = list[0];
            const newItem = typeof first === "object" && first !== null
              ? { title: "", date: "", text: "", imageUrl: "" }
              : "";
            onChange([...list, newItem]);
          }}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/15 py-2 text-xs text-white/40 hover:border-violet-500/40 hover:text-white/70 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" /> Add card
        </button>
      </div>
    );
  }

  /* ── gradient ── */
  if (kind === "gradient") {
    return (
      <input
        type="text"
        value={(value as string) ?? ""}
        placeholder="linear-gradient(135deg, #b50000, #000)"
        className={inputCls}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  /* ── font ── */
  if (kind === "font") {
    return (
      <input
        type="text"
        value={(value as string) ?? ""}
        placeholder="'Kalam', cursive"
        className={inputCls}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  return (
    <p className="text-xs text-white/30 italic">Unsupported field kind: {kind}</p>
  );
}

/* ── Media upload widget ── */
function MediaUploadWidget({ field, value, onChange }: { field: FieldDef; value: string; onChange: (v: unknown) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isImage = field.kind === "image" || field.kind === "gif";

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  }

  const accept =
    field.accept ??
    (field.kind === "image" ? "image/*" :
     field.kind === "gif"   ? "image/gif,image/*" :
     field.kind === "audio" ? "audio/*" : "video/*");

  return (
    <div className="space-y-2">
      {value && isImage && (
        <div className="relative w-full overflow-hidden rounded-xl border border-white/10" style={{ maxHeight: 120 }}>
          <img src={value} alt="" className="w-full object-cover" style={{ maxHeight: 120 }} />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-red-400"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}
      {value && !isImage && (
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
          <span className="text-xs text-white/50 truncate flex-1">
            {value.startsWith("data:") ? "File uploaded ✓" : value}
          </span>
          <button type="button" onClick={() => onChange("")} className="text-red-400 hover:text-red-300">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 py-2.5 text-xs text-white/40 hover:border-violet-500/40 hover:text-white/70 transition-colors"
        >
          <Upload className="h-3.5 w-3.5" />
          Upload {field.kind}
        </button>
        {value && (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="or paste URL"
            className={cn(inputCls, "flex-1 text-xs")}
          />
        )}
      </div>
      {!value && (
        <input
          type="text"
          placeholder="or paste URL…"
          className={cn(inputCls, "text-xs")}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={handleFile} />
    </div>
  );
}

/* ── Upload button (used inside list-image grid) ── */
function UploadButton({ accept, label, onUpload }: { accept: string; label: string; onUpload: (url: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onUpload(reader.result as string);
    reader.readAsDataURL(file);
  }
  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className="aspect-square flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-white/15 text-white/30 hover:border-violet-500/40 hover:text-white/60 transition-colors"
      >
        <Plus className="h-5 w-5" />
        <span className="text-[9px]">{label}</span>
      </button>
      <input ref={ref} type="file" accept={accept} className="hidden" onChange={handleFile} />
    </>
  );
}
