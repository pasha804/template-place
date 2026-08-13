import { o as __toESM } from "./_runtime.mjs";
import { n as supabase } from "./_ssr/client-Dc1BRJHd.mjs";
import { i as require_react } from "./_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "./_libs/@react-three/drei+[...].mjs";
import { c as motion, l as AnimatePresence } from "./_libs/framer-motion.mjs";
import { Gt as ChevronRight, H as Redo2, L as Save, Nt as Eye, Ut as CircleCheck, V as RefreshCw, W as Plus, d as Upload, f as Undo2, ft as LoaderCircle, g as Trash2, i as X, nn as ArrowRight, qt as ChevronDown, rn as ArrowLeft, vt as Image$1 } from "./_libs/lucide-react.mjs";
import { r as create } from "./_libs/zustand.mjs";
import { o as getExternalTemplate } from "./_ssr/registry-BOtXfR_2.mjs";
import { t as useAuthStore } from "./_ssr/auth-Dy4ewPDE.mjs";
import { _ as useNavigate, g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./_ssr/utils-C_uf36nf.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as Route } from "./_templateId-ZwvqjPcO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_templateId-Bm11_nkX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Generic Template Editor Store
* Pure configuration form — no preview state.
*/
var MAX_HISTORY = 50;
var _history = [];
var _histIdx = -1;
function pushHistory(cfg) {
	_history = _history.slice(0, _histIdx + 1);
	_history.push({ ...cfg });
	if (_history.length > MAX_HISTORY) _history.shift();
	_histIdx = _history.length - 1;
}
var useTemplateEditorStore = create((set, get) => ({
	templateId: "",
	pageId: "",
	config: {},
	isDirty: false,
	isSaving: false,
	lastSaved: null,
	init: (templateId, pageId, config) => {
		_history = [{ ...config }];
		_histIdx = 0;
		set({
			templateId,
			pageId,
			config: { ...config },
			isDirty: false
		});
	},
	setField: (key, value) => set((s) => {
		const next = {
			...s.config,
			[key]: value
		};
		pushHistory(next);
		return {
			config: next,
			isDirty: true
		};
	}),
	setConfig: (patch) => set((s) => {
		const next = {
			...s.config,
			...patch
		};
		pushHistory(next);
		return {
			config: next,
			isDirty: true
		};
	}),
	setIsSaving: (isSaving) => set({ isSaving }),
	setSaved: (lastSaved) => set({
		lastSaved,
		isDirty: false
	})
}));
function editorUndo() {
	if (_histIdx <= 0) return;
	_histIdx--;
	const prev = _history[_histIdx];
	useTemplateEditorStore.setState({
		config: { ...prev },
		isDirty: true
	});
}
function editorRedo() {
	if (_histIdx >= _history.length - 1) return;
	_histIdx++;
	const next = _history[_histIdx];
	useTemplateEditorStore.setState({
		config: { ...next },
		isDirty: true
	});
}
function canUndo() {
	return _histIdx > 0;
}
function canRedo() {
	return _histIdx < _history.length - 1;
}
/**
* EditorTopBar — Save / Undo / Redo / Preview / Continue to Checkout
*/
function EditorTopBar({ onSave }) {
	const navigate = useNavigate();
	const { isDirty, isSaving, lastSaved, config, pageId } = useTemplateEditorStore();
	async function handleContinue() {
		if (isDirty) await onSave();
		navigate({
			to: "/checkout/$pageId",
			params: { pageId }
		});
	}
	async function handlePreview() {
		if (isDirty) await onSave();
		const slug = config._page_slug || pageId;
		window.open(`/p/${slug}`, "_blank");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex h-12 shrink-0 items-center justify-between border-b border-white/[0.06] bg-[#0d0b20] px-3 gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/dashboard",
					className: "flex h-8 w-8 items-center justify-center rounded-xl text-white/40 hover:bg-white/[0.06] hover:text-white/80 transition-colors",
					"aria-label": "Back to dashboard",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden sm:flex items-center gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-violet-600 text-xs font-black text-white",
							children: "S"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold text-white/80 truncate max-w-[140px]",
							children: config._page_title || "Untitled page"
						}),
						isDirty && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "h-1.5 w-1.5 rounded-full bg-amber-400",
							title: "Unsaved changes"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: editorUndo,
					disabled: !canUndo(),
					className: "flex h-7 w-7 items-center justify-center rounded-lg text-white/35 disabled:opacity-20 hover:bg-white/[0.06] hover:text-white/70 transition-colors",
					"aria-label": "Undo",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, { className: "h-3.5 w-3.5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: editorRedo,
					disabled: !canRedo(),
					className: "flex h-7 w-7 items-center justify-center rounded-lg text-white/35 disabled:opacity-20 hover:bg-white/[0.06] hover:text-white/70 transition-colors",
					"aria-label": "Redo",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Redo2, { className: "h-3.5 w-3.5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden sm:flex items-center gap-1.5 text-[11px] text-white/30 min-w-[80px] justify-end",
						children: isSaving ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }), " Saving…"] }) : lastSaved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3 text-emerald-400" }), " Saved"] }) : null
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: handlePreview,
						disabled: isSaving,
						className: "flex h-8 items-center gap-1.5 rounded-xl border border-violet-500/30 bg-violet-500/10 px-3 text-xs font-semibold text-violet-300 hover:bg-violet-500/20 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" }), " Preview"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onSave,
						disabled: isSaving || !isDirty,
						className: "flex h-8 items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-xs font-medium text-white/60 hover:text-white disabled:opacity-40 transition-colors",
						children: [isSaving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-3.5 w-3.5" }), "Save"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: handleContinue,
						disabled: isSaving,
						className: "flex h-8 items-center gap-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 px-4 text-xs font-bold text-white shadow-[0_0_16px_rgba(236,72,153,0.3)] hover:scale-[1.03] transition-all disabled:opacity-60",
						children: ["Continue ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
					})
				]
			})
		]
	});
}
var MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
/**
* Validates file size (max 5MB) and type.
*/
function validateImageFile(file) {
	if (!file) return {
		valid: false,
		error: "No file selected."
	};
	if (!file.type.startsWith("image/")) return {
		valid: false,
		error: "File must be a valid image (PNG, JPG, WebP, etc.)."
	};
	if (file.size > MAX_FILE_SIZE_BYTES) return {
		valid: false,
		error: `Image is too large (${(file.size / (1024 * 1024)).toFixed(2)} MB). Maximum size allowed is 5 MB.`
	};
	return { valid: true };
}
/**
* Reads an image file and compresses/resizes it using Canvas to WebP/JPEG data URL.
*/
async function compressImage(file, options = {}) {
	const validation = validateImageFile(file);
	if (!validation.valid) throw new Error(validation.error);
	const { maxWidth = 1920, maxHeight = 1920, quality = .82, mimeType = "image/webp" } = options;
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = () => reject(/* @__PURE__ */ new Error("Failed to read image file."));
		reader.onload = (event) => {
			const img = new Image();
			img.onerror = () => reject(/* @__PURE__ */ new Error("Failed to process image format."));
			img.onload = () => {
				let width = img.width;
				let height = img.height;
				if (width > maxWidth || height > maxHeight) {
					const ratio = Math.min(maxWidth / width, maxHeight / height);
					width = Math.round(width * ratio);
					height = Math.round(height * ratio);
				}
				const canvas = document.createElement("canvas");
				canvas.width = width;
				canvas.height = height;
				const ctx = canvas.getContext("2d");
				if (!ctx) {
					resolve(event.target?.result);
					return;
				}
				ctx.imageSmoothingEnabled = true;
				ctx.imageSmoothingQuality = "high";
				ctx.drawImage(img, 0, 0, width, height);
				try {
					const dataUrl = canvas.toDataURL(mimeType, quality);
					if (dataUrl.startsWith(`data:${mimeType}`)) {
						resolve(dataUrl);
						return;
					}
				} catch {}
				resolve(canvas.toDataURL("image/jpeg", quality));
			};
			img.src = event.target?.result;
		};
		reader.readAsDataURL(file);
	});
}
/**
* Uploads an image file or Data URL to Supabase Storage.
* Falls back gracefully to compressed Data URL if Storage bucket is not available.
*/
async function uploadToSupabaseStorage(fileOrDataUrl, options = {}) {
	const { supabase } = await import("./_ssr/client-Dc1BRJHd.mjs").then((n) => n.t).then((n) => n.t);
	const bucket = options.bucket || "template-assets";
	const folder = options.folder || "uploads";
	let compressedDataUrl = typeof fileOrDataUrl === "string" ? fileOrDataUrl : "";
	if (typeof fileOrDataUrl !== "string") compressedDataUrl = await compressImage(fileOrDataUrl);
	try {
		const { data: userData } = await supabase.auth.getUser();
		const userId = userData?.user?.id;
		if (!userId) return compressedDataUrl;
		const blob = await (await fetch(compressedDataUrl)).blob();
		const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.webp`;
		const uploadRes = await supabase.storage.from(bucket).upload(filename, blob, {
			contentType: "image/webp",
			upsert: true
		});
		if (uploadRes.data?.path) {
			const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(uploadRes.data.path);
			const publicUrl = publicUrlData?.publicUrl || compressedDataUrl;
			try {
				await supabase.from("storage_objects").insert({
					user_id: userId,
					page_id: options.pageId || null,
					bucket_name: bucket,
					file_path: uploadRes.data.path,
					mime_type: "image/webp",
					size_bytes: blob.size
				});
			} catch {}
			return publicUrl;
		}
	} catch (err) {
		console.warn("[Supabase Storage] Fallback to data URL:", err);
	}
	return compressedDataUrl;
}
/**
* FieldWidget — renders the right input control for any FieldDef.
* Generic: works for every external template, no template-specific logic.
*/
var inputCls = "w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5 text-sm text-white/90 outline-none transition-all focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/15 placeholder:text-white/25";
function FieldWidget({ field, value, onChange, defaultValue }) {
	const { kind } = field;
	if (kind === "text" || kind === "pin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: kind === "pin" ? "password" : "text",
		value: value ?? "",
		placeholder: field.placeholder,
		maxLength: kind === "pin" ? 6 : void 0,
		className: inputCls,
		onChange: (e) => onChange(e.target.value)
	});
	if (kind === "textarea") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		rows: field.rows ?? 4,
		value: value ?? "",
		placeholder: field.placeholder,
		className: cn(inputCls, "resize-y min-h-[80px]"),
		onChange: (e) => onChange(e.target.value)
	});
	if (kind === "color") {
		const hex = value || "#b50000";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-9 w-9 overflow-hidden rounded-xl border border-white/15 flex-shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 rounded-xl",
					style: { background: hex }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "color",
					value: hex,
					onChange: (e) => onChange(e.target.value),
					className: "absolute -inset-1 cursor-pointer opacity-0 w-12 h-12"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "text",
				value: hex,
				onChange: (e) => onChange(e.target.value),
				className: cn(inputCls, "font-mono text-xs"),
				maxLength: 7
			})]
		});
	}
	if (kind === "boolean") {
		const checked = Boolean(value ?? true);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			role: "switch",
			"aria-checked": checked,
			onClick: () => onChange(!checked),
			className: cn("relative inline-flex h-6 w-11 items-center rounded-full border transition-all duration-200", checked ? "bg-violet-600 border-violet-500" : "bg-white/[0.08] border-white/10"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200", checked ? "translate-x-6" : "translate-x-1") })
		});
	}
	if (kind === "number") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "number",
		value: value ?? 0,
		min: field.min,
		max: field.max,
		step: field.step ?? 1,
		className: inputCls,
		onChange: (e) => onChange(Number(e.target.value))
	});
	if (kind === "range") {
		const v = value ?? field.min ?? 0;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "range",
				min: field.min ?? 0,
				max: field.max ?? 100,
				step: field.step ?? 1,
				value: v,
				onChange: (e) => onChange(Number(e.target.value)),
				className: "flex-1 h-1.5 accent-violet-500 cursor-pointer"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "w-10 text-right text-xs font-mono text-white/60",
				children: v
			})]
		});
	}
	if (kind === "select" && field.options) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		value: value ?? "",
		onChange: (e) => onChange(e.target.value),
		className: cn(inputCls, "cursor-pointer appearance-none"),
		children: field.options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: o.value,
			className: "bg-[#1a1730]",
			children: o.label
		}, o.value))
	});
	if (kind === "date") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "date",
		value: (value ?? "").slice(0, 10),
		className: inputCls,
		onChange: (e) => onChange(e.target.value)
	});
	if (kind === "image" || kind === "gif" || kind === "audio" || kind === "video") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaUploadWidget, {
		field,
		value,
		onChange
	});
	if (kind === "list-text") {
		const list = value ?? [];
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2",
			children: [list.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					value: item,
					onChange: (e) => {
						const next = [...list];
						next[i] = e.target.value;
						onChange(next);
					},
					className: cn(inputCls, "flex-1 text-xs")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onChange(list.filter((_, j) => j !== i)),
					className: "flex h-9 w-9 items-center justify-center rounded-xl border border-red-500/25 text-red-400 hover:bg-red-500/10 transition-colors",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
				})]
			}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onChange([...list, ""]),
				className: "flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/15 py-2 text-xs text-white/40 hover:border-violet-500/40 hover:text-white/70 transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Add item"]
			})]
		});
	}
	if (kind === "list-image") {
		const defaultList = Array.isArray(defaultValue) ? defaultValue : [];
		const valList = Array.isArray(value) ? value : [];
		const slotCount = field.maxCount ?? field.max ?? (defaultList.length > 0 ? defaultList.length : valList.length > 0 ? valList.length : 6);
		const slots = Array.from({ length: slotCount }, (_, i) => {
			if (typeof valList[i] === "string") return valList[i];
			if (typeof defaultList[i] === "string") return defaultList[i];
			return "";
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 gap-2",
				children: slots.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageSlotTile, {
					index: i,
					src,
					onUpdate: (newUrl) => {
						const next = [...slots];
						next[i] = newUrl;
						onChange(next);
					},
					onRemove: () => {
						const next = [...slots];
						next[i] = "";
						onChange(next);
					}
				}, i))
			}), field.help && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] text-white/35",
				children: field.help
			})]
		});
	}
	if (kind === "list-cards") {
		const list = Array.isArray(value) ? value : [];
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [list.map((card, i) => {
				const isObj = typeof card === "object" && card !== null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative rounded-xl border border-white/10 bg-white/[0.03] p-3 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-semibold text-violet-400",
							children: ["Card #", i + 1]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => onChange(list.filter((_, j) => j !== i)),
							className: "flex h-6 w-6 items-center justify-center rounded-lg border border-red-500/25 text-red-400 hover:bg-red-500/10 transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" })
						})]
					}), isObj ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							("title" in card, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Title",
								value: card.title ?? "",
								onChange: (e) => {
									const next = [...list];
									next[i] = {
										...card,
										title: e.target.value
									};
									onChange(next);
								},
								className: cn(inputCls, "text-xs")
							})),
							("date" in card || "date" in (list[0] || {})) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Date (e.g. June 12, 2018)",
								value: card.date ?? "",
								onChange: (e) => {
									const next = [...list];
									next[i] = {
										...card,
										date: e.target.value
									};
									onChange(next);
								},
								className: cn(inputCls, "text-xs")
							}),
							("text" in card || "copy" in card, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 2,
								placeholder: "Description",
								value: card.text ?? card.copy ?? "",
								onChange: (e) => {
									const next = [...list];
									next[i] = {
										...card,
										text: e.target.value,
										copy: e.target.value
									};
									onChange(next);
								},
								className: cn(inputCls, "text-xs resize-none")
							})),
							("imageUrl" in card || "image" in card || "img" in card, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Image URL",
								value: card.imageUrl ?? card.image ?? card.img ?? "",
								onChange: (e) => {
									const next = [...list];
									next[i] = {
										...card,
										imageUrl: e.target.value,
										image: e.target.value,
										img: e.target.value
									};
									onChange(next);
								},
								className: cn(inputCls, "text-xs")
							}))
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						rows: 2,
						value: String(card ?? ""),
						onChange: (e) => {
							const next = [...list];
							next[i] = e.target.value;
							onChange(next);
						},
						className: cn(inputCls, "text-xs resize-none")
					})]
				}, i);
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => {
					const first = list[0];
					const newItem = typeof first === "object" && first !== null ? {
						title: "",
						date: "",
						text: "",
						imageUrl: ""
					} : "";
					onChange([...list, newItem]);
				},
				className: "flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/15 py-2 text-xs text-white/40 hover:border-violet-500/40 hover:text-white/70 transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Add card"]
			})]
		});
	}
	if (kind === "gradient") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "text",
		value: value ?? "",
		placeholder: "linear-gradient(135deg, #b50000, #000)",
		className: inputCls,
		onChange: (e) => onChange(e.target.value)
	});
	if (kind === "font") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "text",
		value: value ?? "",
		placeholder: "'Kalam', cursive",
		className: inputCls,
		onChange: (e) => onChange(e.target.value)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-xs text-white/30 italic",
		children: ["Unsupported field kind: ", kind]
	});
}
function MediaUploadWidget({ field, value, onChange }) {
	const inputRef = (0, import_react.useRef)(null);
	const isImage = field.kind === "image" || field.kind === "gif";
	async function handleFile(e) {
		const file = e.target.files?.[0];
		if (!file) return;
		try {
			onChange(await uploadToSupabaseStorage(file, { bucket: "template-assets" }));
		} catch {
			const reader = new FileReader();
			reader.onload = () => onChange(reader.result);
			reader.readAsDataURL(file);
		}
	}
	const accept = field.accept ?? (field.kind === "image" ? "image/*" : field.kind === "gif" ? "image/gif,image/*" : field.kind === "audio" ? "audio/*" : "video/*");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			value && isImage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative w-full overflow-hidden rounded-xl border border-white/10",
				style: { maxHeight: 120 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: value,
					alt: "",
					className: "w-full object-cover",
					style: { maxHeight: 120 }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onChange(""),
					className: "absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-red-400",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
				})]
			}),
			value && !isImage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-white/50 truncate flex-1",
					children: value.startsWith("data:") ? "File uploaded ✓" : value
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onChange(""),
					className: "text-red-400 hover:text-red-300",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => inputRef.current?.click(),
					className: "flex flex-1 items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 py-2.5 text-xs text-white/40 hover:border-violet-500/40 hover:text-white/70 transition-colors",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-3.5 w-3.5" }),
						"Upload ",
						field.kind
					]
				}), value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					value,
					onChange: (e) => onChange(e.target.value),
					placeholder: "or paste URL",
					className: cn(inputCls, "flex-1 text-xs")
				})]
			}),
			!value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "text",
				placeholder: "or paste URL…",
				className: cn(inputCls, "text-xs"),
				onChange: (e) => onChange(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: inputRef,
				type: "file",
				accept,
				className: "hidden",
				onChange: handleFile
			})
		]
	});
}
function ImageSlotTile({ index, src, onUpdate, onRemove }) {
	const fileInputRef = (0, import_react.useRef)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [dragOver, setDragOver] = (0, import_react.useState)(false);
	async function processAndUpload(file) {
		const check = validateImageFile(file);
		if (!check.valid) {
			toast.error(check.error || "Invalid file");
			return;
		}
		setLoading(true);
		try {
			onUpdate(await uploadToSupabaseStorage(file, { bucket: "template-assets" }));
			toast.success(`Photo #${index + 1} updated`);
		} catch (err) {
			toast.error(err?.message || "Failed to process image.");
		} finally {
			setLoading(false);
		}
	}
	function handleFileChange(e) {
		const file = e.target.files?.[0];
		if (file) processAndUpload(file);
		e.target.value = "";
	}
	function handleDrop(e) {
		e.preventDefault();
		setDragOver(false);
		const file = e.dataTransfer.files?.[0];
		if (file) processAndUpload(file);
	}
	const hasImage = Boolean(src && src.trim());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		onDragOver: (e) => {
			e.preventDefault();
			setDragOver(true);
		},
		onDragLeave: () => setDragOver(false),
		onDrop: handleDrop,
		className: cn("relative group aspect-square overflow-hidden rounded-xl border transition-all flex flex-col items-center justify-center text-center select-none", dragOver ? "border-violet-500 bg-violet-500/20 scale-[1.02]" : "border-white/10 bg-white/[0.03]", !hasImage && "border-dashed hover:border-violet-500/40 hover:bg-white/[0.05]"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: fileInputRef,
				type: "file",
				accept: "image/*",
				className: "hidden",
				onChange: handleFileChange
			}),
			loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm text-white",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin text-violet-400 mb-1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[9px] text-white/70",
					children: "Optimizing..."
				})]
			}),
			hasImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src,
					alt: `Slot #${index + 1}`,
					className: "w-full h-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute top-1 left-1 rounded-md bg-black/70 px-1.5 py-0.5 text-[9px] font-bold text-white/80",
					children: ["#", index + 1]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						title: "Replace Image",
						onClick: () => fileInputRef.current?.click(),
						className: "flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600/90 text-white hover:bg-violet-500 transition-colors shadow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3.5 w-3.5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						title: "Remove Image",
						onClick: onRemove,
						className: "flex h-7 w-7 items-center justify-center rounded-lg bg-red-600/90 text-white hover:bg-red-500 transition-colors shadow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
					})]
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => fileInputRef.current?.click(),
				className: "flex h-full w-full flex-col items-center justify-center gap-1 p-2 text-white/40 hover:text-white/80 transition-colors",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image$1, { className: "h-5 w-5 text-white/30 group-hover:text-violet-400 transition-colors" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[9px] font-semibold",
						children: ["Slot #", index + 1]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[8px] text-white/25",
						children: "Upload / Drop"
					})
				]
			})
		]
	});
}
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
function EditorFormPanel({ plugin }) {
	const { config, setField } = useTemplateEditorStore();
	const mainSections = plugin.schema.filter((s) => s.key !== "page");
	const pageSection = plugin.schema.find((s) => s.key === "page");
	const [openSections, setOpenSections] = (0, import_react.useState)(() => {
		const first = mainSections[0]?.key;
		return first ? /* @__PURE__ */ new Set([first]) : /* @__PURE__ */ new Set();
	});
	function toggleSection(key) {
		setOpenSections((prev) => {
			const next = new Set(prev);
			if (next.has(key)) next.delete(key);
			else next.add(key);
			return next;
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-[760px] px-4 py-8 pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-8 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-3xl",
							style: { background: plugin.manifest.coverGradient },
							children: plugin.manifest.thumbnailUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: plugin.manifest.thumbnailUrl,
								alt: plugin.manifest.name,
								className: "h-full w-full rounded-xl object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: plugin.manifest.accentEmoji })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-lg font-bold text-white truncate",
									children: plugin.manifest.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-white/40 capitalize",
									children: plugin.manifest.category
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-white/30 leading-snug line-clamp-2",
									children: plugin.manifest.tagline
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "shrink-0 text-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xl font-black",
								style: {
									background: "linear-gradient(135deg,#a78bfa,#f472b6)",
									WebkitBackgroundClip: "text",
									backgroundClip: "text",
									color: "transparent"
								},
								children: plugin.manifest.priceCents === 0 ? "Free" : `Rs. ${plugin.manifest.priceCents.toLocaleString("en-PK")}`
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 text-xs text-white/25 px-1",
				children: "Fill in your details below. All changes are auto-saved every 30 seconds."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [mainSections.map((section) => {
					const isOpen = openSections.has(section.key);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => toggleSection(section.key),
							className: cn("flex w-full items-center gap-3 px-5 py-4 text-left transition-colors", isOpen ? "bg-violet-600/10" : "hover:bg-white/[0.03]"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xl leading-none",
									children: section.icon ?? "⚙️"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("flex-1 text-sm font-semibold", isOpen ? "text-white" : "text-white/60"),
									children: section.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-white/30",
									children: isOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 text-violet-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
							initial: false,
							children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								initial: {
									height: 0,
									opacity: 0
								},
								animate: {
									height: "auto",
									opacity: 1
								},
								exit: {
									height: 0,
									opacity: 0
								},
								transition: {
									duration: .22,
									ease: [
										.22,
										1,
										.36,
										1
									]
								},
								className: "overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "border-t border-white/[0.06] px-5 py-5 space-y-5",
									children: section.fields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "mb-2 block",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-semibold text-white/70",
											children: field.label
										}), field.help && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-0.5 block text-xs text-white/30 leading-relaxed",
											children: field.help
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldWidget, {
										field,
										value: config[field.key],
										defaultValue: plugin?.defaults?.[field.key],
										onChange: (v) => setField(field.key, v)
									})] }, field.key))
								})
							})
						})]
					}, section.key);
				}), pageSection && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => toggleSection("page"),
						className: cn("flex w-full items-center gap-3 px-5 py-4 text-left transition-colors", openSections.has("page") ? "bg-violet-600/8" : "hover:bg-white/[0.03]"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xl leading-none",
								children: "⚙️"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("flex-1 text-sm font-semibold", openSections.has("page") ? "text-white" : "text-white/40"),
								children: "Page Settings"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-white/20",
								children: openSections.has("page") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 text-violet-400/60" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						initial: false,
						children: openSections.has("page") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								height: 0,
								opacity: 0
							},
							animate: {
								height: "auto",
								opacity: 1
							},
							exit: {
								height: 0,
								opacity: 0
							},
							transition: {
								duration: .22,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							className: "overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border-t border-white/[0.05] px-5 py-5 space-y-5",
								children: pageSection.fields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-2 block",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-semibold text-white/50",
										children: field.label
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldWidget, {
									field,
									value: config[field.key],
									defaultValue: plugin?.defaults?.[field.key],
									onChange: (v) => setField(field.key, v)
								})] }, field.key))
							})
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8" })
		]
	});
}
/**
* Template Editor — configuration-only page
* /editor/template/:templateId?pageId=xxx
*
* Pure data-entry form. No live preview. No split layout.
* User fills in fields → Save → Continue → Checkout.
*/
function generateSlug(name) {
	return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Math.random().toString(36).slice(2, 7);
}
function TemplateEditorPage() {
	const { templateId } = Route.useParams();
	const { pageId } = Route.useSearch();
	const navigate = useNavigate();
	const user = useAuthStore((s) => s.user);
	const plugin = getExternalTemplate(templateId);
	const store = useTemplateEditorStore();
	const autosaveRef = (0, import_react.useRef)(null);
	const initialized = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!user) {
			navigate({ to: "/auth/login" });
			return;
		}
		if (!plugin) {
			toast.error("Template not found");
			navigate({ to: "/templates" });
		}
	}, [
		user,
		plugin,
		navigate
	]);
	(0, import_react.useEffect)(() => {
		if (!user || !plugin || initialized.current) return;
		initialized.current = true;
		async function loadOrCreate() {
			if (!user || !plugin) return;
			if (pageId) {
				let pageData = null;
				try {
					const { data: isAdminUser } = await supabase.rpc("is_admin");
					let q = supabase.from("pages").select("*").eq("id", pageId);
					if (!isAdminUser) q = q.eq("user_id", user.id);
					const { data, error } = await q.single();
					if (!error && data) pageData = data;
				} catch (e) {
					console.warn("Supabase query error:", e);
				}
				if (!pageData) {
					const cached = localStorage.getItem(`page_${pageId}`);
					if (cached) try {
						pageData = JSON.parse(cached);
					} catch {}
				}
				if (!pageData) {
					toast.error("Page not found");
					navigate({ to: "/dashboard" });
					return;
				}
				const savedConfig = pageData.content ?? {};
				const merged = {
					...plugin.defaults,
					...savedConfig
				};
				store.init(templateId, pageId, merged);
			} else {
				const slug = generateSlug(plugin.manifest.name);
				let data = null;
				const res = await supabase.from("pages").insert({
					user_id: user.id,
					template_id: plugin.manifest.id,
					title: plugin.defaults._page_title ?? plugin.manifest.name,
					slug,
					status: "draft",
					blocks: [],
					theme: {},
					content: {
						...plugin.defaults,
						_template_id: plugin.manifest.id
					},
					is_public: false
				}).select().single();
				if (res.data) data = res.data;
				else if (res.error) {
					console.error("Failed to create page:", res.error);
					toast.error("Failed to create page. Please try again.");
					navigate({ to: "/templates" });
					return;
				}
				const finalPageId = data?.id || `draft-${Date.now()}`;
				const finalSlug = data?.slug || slug;
				const pageObj = {
					id: finalPageId,
					user_id: user.id,
					template_id: plugin.manifest.id,
					title: plugin.defaults._page_title ?? plugin.manifest.name,
					slug: finalSlug,
					status: "draft",
					content: plugin.defaults,
					created_at: (/* @__PURE__ */ new Date()).toISOString(),
					updated_at: (/* @__PURE__ */ new Date()).toISOString()
				};
				localStorage.setItem(`page_${finalPageId}`, JSON.stringify(pageObj));
				store.init(templateId, finalPageId, {
					...plugin.defaults,
					_page_slug: finalSlug
				});
				navigate({
					to: "/editor/template/$templateId",
					params: { templateId },
					search: { pageId: finalPageId },
					replace: true
				});
			}
		}
		loadOrCreate();
	}, [
		user,
		plugin,
		pageId,
		templateId,
		navigate,
		store
	]);
	const doSave = (0, import_react.useCallback)(async () => {
		const { config, pageId: pid, setIsSaving, setSaved } = useTemplateEditorStore.getState();
		if (!pid || !user) return;
		setIsSaving(true);
		const title = config._page_title || plugin?.manifest.name || "Untitled";
		const slug = config._page_slug || pid;
		const isUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(pid);
		try {
			const payload = {
				...isUuid ? { id: pid } : {},
				user_id: user.id,
				template_id: plugin?.manifest.id || templateId,
				title,
				slug,
				status: "draft",
				content: {
					...config,
					_template_id: plugin?.manifest.id || templateId
				},
				is_public: Boolean(config._page_isPublic),
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			};
			const res = await supabase.from("pages").upsert(payload).select().single();
			let realPageId = pid;
			if (res.data?.id) {
				realPageId = res.data.id;
				useTemplateEditorStore.setState({ pageId: realPageId });
			} else if (res.error) {
				console.error("Save failed:", res.error);
				toast.error("Failed to save. Please check your connection.");
				setIsSaving(false);
				return;
			}
			const existing = localStorage.getItem(`page_${realPageId}`);
			const updatedObj = {
				...existing ? JSON.parse(existing) : {
					id: realPageId,
					user_id: user.id
				},
				id: realPageId,
				title,
				slug,
				content: config,
				template_id: plugin?.manifest.id || templateId,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			};
			localStorage.setItem(`page_${realPageId}`, JSON.stringify(updatedObj));
			if (pid !== realPageId) localStorage.setItem(`page_${pid}`, JSON.stringify(updatedObj));
			setSaved(/* @__PURE__ */ new Date());
			toast.success("Saved");
			return realPageId;
		} catch (e) {
			console.error("Save failed error:", e);
			toast.error("Save failed");
		} finally {
			setIsSaving(false);
		}
	}, [
		plugin,
		user,
		templateId
	]);
	const doPublish = (0, import_react.useCallback)(async () => {
		const { pageId: pid, setIsSaving } = useTemplateEditorStore.getState();
		if (!pid) return;
		setIsSaving(true);
		try {
			const activeId = await doSave() || pid;
			const isUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(activeId);
			let query = supabase.from("pages").update({
				status: "published",
				published_at: (/* @__PURE__ */ new Date()).toISOString(),
				is_public: true
			});
			if (isUuid) query = query.eq("id", activeId);
			else query = query.eq("slug", activeId);
			const { error } = await query;
			if (error) throw error;
			toast.success("Page published! 🎉");
		} catch (e) {
			console.error("Publish failed error:", e);
			toast.error("Publish failed");
		} finally {
			useTemplateEditorStore.getState().setIsSaving(false);
		}
	}, [doSave]);
	(0, import_react.useEffect)(() => {
		autosaveRef.current = setInterval(() => {
			if (useTemplateEditorStore.getState().isDirty) doSave();
		}, 3e4);
		return () => {
			if (autosaveRef.current) clearInterval(autosaveRef.current);
		};
	}, [doSave]);
	if (!plugin || !store.pageId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-[#08071a]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-violet-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-white/40",
				children: "Loading editor…"
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "app-ui flex h-screen flex-col overflow-hidden bg-[#08071a]",
		style: { fontFamily: "var(--font-poppins)" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorTopBar, {
			onSave: (0, import_react.useCallback)(async () => {
				await doSave();
			}, [doSave]),
			onPublish: doPublish
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-y-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorFormPanel, { plugin })
		})]
	});
}
//#endregion
export { TemplateEditorPage as component };
