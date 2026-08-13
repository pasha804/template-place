import { o as __toESM } from "./_runtime.mjs";
import { i as require_react } from "./_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "./_libs/@react-three/drei+[...].mjs";
import { c as motion, l as AnimatePresence } from "./_libs/framer-motion.mjs";
import { H as Redo2, L as Save, Nt as Eye, P as Settings, T as Smartphone, Ut as CircleCheck, W as Plus, Y as Palette, bt as GripVertical, f as Undo2, ft as LoaderCircle, g as Trash2, gt as Layers, rn as ArrowLeft, tt as Monitor, y as Tablet } from "./_libs/lucide-react.mjs";
import { d as CSS, i as closestCenter, l as useSensor, r as PointerSensor, t as DndContext, u as useSensors } from "./_libs/@dnd-kit/core+[...].mjs";
import { r as create } from "./_libs/zustand.mjs";
import { t as useAuthStore } from "./_ssr/auth-Dy4ewPDE.mjs";
import { _ as useNavigate, g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./_pageId-C6fQ5uBu.mjs";
import { n as createBlockInstance, t as allBlocks } from "./_ssr/registry-BHB5YlGA.mjs";
import { t as cn } from "./_ssr/utils-C_uf36nf.mjs";
import { i as useUpdatePage, r as usePage } from "./_ssr/use-pages-D3HISOQY.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { i as verticalListSortingStrategy, n as arrayMove, r as useSortable, t as SortableContext } from "./_libs/dnd-kit__sortable.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_pageId-NjTf18PL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function pushHistory(state, newPage) {
	const newHistory = state.history.slice(0, state.historyIndex + 1);
	newHistory.push(newPage);
	const capped = newHistory.slice(-50);
	return {
		history: capped,
		historyIndex: capped.length - 1,
		page: newPage,
		isDirty: true
	};
}
var useEditorStore = create()((set, get) => ({
	page: null,
	viewport: "desktop",
	selectedBlockId: null,
	isSaving: false,
	lastSavedAt: null,
	isDirty: false,
	activePanel: null,
	history: [],
	historyIndex: -1,
	setPage: (page) => set({
		page,
		isDirty: false,
		history: [page],
		historyIndex: 0
	}),
	setViewport: (viewport) => set({ viewport }),
	selectBlock: (selectedBlockId) => set({ selectedBlockId }),
	setIsSaving: (isSaving) => set({ isSaving }),
	setLastSaved: (lastSavedAt) => set({
		lastSavedAt,
		isDirty: false
	}),
	setActivePanel: (activePanel) => set({ activePanel }),
	canUndo: () => get().historyIndex > 0,
	canRedo: () => get().historyIndex < get().history.length - 1,
	undo: () => {
		const { historyIndex, history } = get();
		if (historyIndex <= 0) return;
		const prev = history[historyIndex - 1];
		set({
			historyIndex: historyIndex - 1,
			page: prev,
			isDirty: true
		});
	},
	redo: () => {
		const { historyIndex, history } = get();
		if (historyIndex >= history.length - 1) return;
		const next = history[historyIndex + 1];
		set({
			historyIndex: historyIndex + 1,
			page: next,
			isDirty: true
		});
	},
	updateBlock: (id, props) => set((s) => {
		if (!s.page) return {};
		return pushHistory(s, {
			...s.page,
			blocks: s.page.blocks.map((b) => b.id === id ? {
				...b,
				props: {
					...b.props,
					...props
				}
			} : b)
		});
	}),
	addBlock: (block, afterId) => set((s) => {
		if (!s.page) return {};
		const blocks = [...s.page.blocks];
		const idx = afterId ? blocks.findIndex((b) => b.id === afterId) : blocks.length - 1;
		blocks.splice(idx + 1, 0, block);
		return pushHistory(s, {
			...s.page,
			blocks
		});
	}),
	removeBlock: (id) => set((s) => {
		if (!s.page) return {};
		return pushHistory(s, {
			...s.page,
			blocks: s.page.blocks.filter((b) => b.id !== id)
		});
	}),
	reorderBlocks: (blocks) => set((s) => {
		if (!s.page) return {};
		return pushHistory(s, {
			...s.page,
			blocks
		});
	}),
	updateTheme: (patch) => set((s) => {
		if (!s.page) return {};
		return pushHistory(s, {
			...s.page,
			theme: {
				...s.page.theme,
				...patch
			}
		});
	}),
	updatePageMeta: (patch) => set((s) => {
		if (!s.page) return {};
		return pushHistory(s, {
			...s.page,
			...patch
		});
	})
}));
function BlockFieldEditor({ blockId, def, props }) {
	const { updateBlock } = useEditorStore();
	function set(key, value) {
		updateBlock(blockId, { [key]: value });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		children: def.fields.map((field) => {
			const val = props[field.key];
			if (field.kind === "text" || field.kind === "image" || field.kind === "video" || field.kind === "audio") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mb-1 block text-[11px] font-medium text-muted-foreground",
					children: field.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					value: val ?? "",
					placeholder: field.placeholder ?? "",
					onChange: (e) => set(field.key, e.target.value),
					className: "w-full rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs outline-none focus:border-primary"
				}),
				field.help && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-[10px] text-muted-foreground",
					children: field.help
				})
			] }, field.key);
			if (field.kind === "textarea") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mb-1 block text-[11px] font-medium text-muted-foreground",
					children: field.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					rows: 4,
					value: val ?? "",
					placeholder: field.placeholder ?? "",
					onChange: (e) => set(field.key, e.target.value),
					className: "w-full resize-none rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs outline-none focus:border-primary"
				}),
				field.help && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-[10px] text-muted-foreground",
					children: field.help
				})
			] }, field.key);
			if (field.kind === "number") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "mb-1 block text-[11px] font-medium text-muted-foreground",
				children: field.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "number",
				min: field.min,
				max: field.max,
				value: val ?? 0,
				onChange: (e) => set(field.key, Number(e.target.value)),
				className: "w-full rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs outline-none focus:border-primary"
			})] }, field.key);
			if (field.kind === "boolean") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: `${blockId}-${field.key}`,
					type: "checkbox",
					checked: val ?? false,
					onChange: (e) => set(field.key, e.target.checked),
					className: "accent-primary"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: `${blockId}-${field.key}`,
					className: "text-xs font-medium cursor-pointer",
					children: field.label
				})]
			}, field.key);
			if (field.kind === "select" && field.options) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "mb-1 block text-[11px] font-medium text-muted-foreground",
				children: field.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				value: val ?? "",
				onChange: (e) => set(field.key, e.target.value),
				className: "w-full rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs outline-none focus:border-primary",
				children: field.options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: o.value,
					children: o.label
				}, o.value))
			})] }, field.key);
			if (field.kind === "date") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "mb-1 block text-[11px] font-medium text-muted-foreground",
				children: field.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "date",
				value: (val ?? "").slice(0, 10),
				onChange: (e) => set(field.key, e.target.value),
				className: "w-full rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs outline-none focus:border-primary"
			})] }, field.key);
			if (field.kind === "list-text" || field.kind === "list-image") {
				const list = val ?? [];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1 block text-[11px] font-medium text-muted-foreground",
						children: field.label
					}),
					field.help && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-1 text-[10px] text-muted-foreground",
						children: field.help
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [list.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: item,
								onChange: (e) => {
									const next = [...list];
									next[i] = e.target.value;
									set(field.key, next);
								},
								className: "flex-1 rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs outline-none focus:border-primary"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => set(field.key, list.filter((_, j) => j !== i)),
								className: "rounded-lg border border-destructive/30 px-2 text-xs text-destructive hover:bg-destructive/10",
								children: "✕"
							})]
						}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => set(field.key, [...list, ""]),
							className: "w-full rounded-lg border border-dashed border-border py-1.5 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors",
							children: "+ Add"
						})]
					})
				] }, field.key);
			}
			return null;
		})
	});
}
var colorFields = [
	{
		key: "primary",
		label: "Primary color"
	},
	{
		key: "accent",
		label: "Accent color"
	},
	{
		key: "background",
		label: "Background"
	},
	{
		key: "surface",
		label: "Surface"
	},
	{
		key: "foreground",
		label: "Foreground text"
	},
	{
		key: "muted",
		label: "Muted text"
	}
];
var fontOptions = [
	"'Sora', sans-serif",
	"'Manrope', sans-serif",
	"'Playfair Display', serif",
	"'DM Serif Display', serif",
	"'Inter', sans-serif",
	"'Raleway', sans-serif"
];
var radiusOptions = [
	{
		label: "None",
		value: "0px"
	},
	{
		label: "Small",
		value: "8px"
	},
	{
		label: "Medium",
		value: "14px"
	},
	{
		label: "Large",
		value: "20px"
	},
	{
		label: "Extra Large",
		value: "28px"
	}
];
function ThemeEditor() {
	const { page, updateTheme } = useEditorStore();
	if (!page) return null;
	const theme = page.theme;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
				children: "Colors"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3",
				children: colorFields.map(({ key, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mb-1 block text-[11px] text-muted-foreground",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative h-7 w-7 overflow-hidden rounded-lg border border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "color",
							value: theme[key],
							onChange: (e) => updateTheme({ [key]: e.target.value }),
							className: "absolute -inset-1 cursor-pointer border-0 p-0 opacity-0 w-10 h-10"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full w-full rounded-md",
							style: { background: theme[key] }
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: theme[key],
						onChange: (e) => updateTheme({ [key]: e.target.value }),
						className: "flex-1 rounded-lg border border-input bg-background px-2 py-1 text-[11px] font-mono outline-none focus:border-primary"
					})]
				})] }, key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border/60 pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground",
					children: "Typography"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1 block text-[11px] text-muted-foreground",
						children: "Display font"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: theme.displayFont,
						onChange: (e) => updateTheme({ displayFont: e.target.value }),
						className: "w-full rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs outline-none focus:border-primary",
						children: fontOptions.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: f,
							style: { fontFamily: f },
							children: f.split(",")[0].replace(/'/g, "")
						}, f))
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1 block text-[11px] text-muted-foreground",
						children: "Body font"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: theme.bodyFont,
						onChange: (e) => updateTheme({ bodyFont: e.target.value }),
						className: "w-full rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs outline-none focus:border-primary",
						children: fontOptions.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: f,
							children: f.split(",")[0].replace(/'/g, "")
						}, f))
					})] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border/60 pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground",
					children: "Border radius"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-1.5",
					children: radiusOptions.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => updateTheme({ radius: r.value }),
						className: "rounded-lg border py-2 text-[11px] transition-all",
						style: {
							borderColor: theme.radius === r.value ? "var(--primary)" : "var(--border)",
							color: theme.radius === r.value ? "var(--primary)" : "var(--muted-foreground)",
							background: theme.radius === r.value ? "color-mix(in oklab, var(--primary) 10%, transparent)" : "transparent"
						},
						children: r.label
					}, r.value))
				})]
			})
		]
	});
}
var tabs = [
	{
		id: "blocks",
		label: "Blocks",
		icon: Layers
	},
	{
		id: "theme",
		label: "Theme",
		icon: Palette
	},
	{
		id: "settings",
		label: "Settings",
		icon: Settings
	}
];
function SortableBlock({ id, label, type, isSelected, onSelect, onRemove }) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: setNodeRef,
		style: {
			transform: CSS.Transform.toString(transform),
			transition,
			opacity: isDragging ? .4 : 1
		},
		className: cn("group flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 transition-all", isSelected ? "border-primary/50 bg-primary/8" : "border-border/60 bg-surface hover:border-primary/30"),
		onClick: onSelect,
		role: "button",
		tabIndex: 0,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				...attributes,
				...listeners,
				className: "cursor-grab touch-none text-muted-foreground hover:text-foreground",
				onClick: (e) => e.stopPropagation(),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, { className: "h-4 w-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex-1 text-xs font-medium",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: (e) => {
					e.stopPropagation();
					onRemove();
				},
				className: "opacity-0 text-muted-foreground transition-opacity hover:text-destructive group-hover:opacity-100",
				"aria-label": "Remove block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
			})
		]
	});
}
function EditorSidebar() {
	const [tab, setTab] = (0, import_react.useState)("blocks");
	const [addOpen, setAddOpen] = (0, import_react.useState)(false);
	const [expandedBlock, setExpandedBlock] = (0, import_react.useState)(null);
	const { page, selectedBlockId, selectBlock, removeBlock, reorderBlocks, addBlock } = useEditorStore();
	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
	function handleDragEnd(event) {
		const { active, over } = event;
		if (!over || active.id === over.id || !page) return;
		const oldIdx = page.blocks.findIndex((b) => b.id === active.id);
		const newIdx = page.blocks.findIndex((b) => b.id === over.id);
		reorderBlocks(arrayMove(page.blocks, oldIdx, newIdx));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "flex w-72 shrink-0 flex-col border-r border-border/60 bg-surface overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex border-b border-border/60 p-1 gap-0.5",
			children: tabs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setTab(t.id),
				className: cn("flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition-all", tab === t.id ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(t.icon, { className: "h-3.5 w-3.5" }), t.label]
			}, t.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 overflow-y-auto",
			children: [
				tab === "blocks" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3 space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setAddOpen((v) => !v),
							className: "flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-2.5 text-xs font-medium text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Add block"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: addOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
							className: "overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-xl border border-border/60 bg-background p-2 grid grid-cols-2 gap-1.5",
								children: allBlocks.map((def) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										addBlock(createBlockInstance(def.type, def.defaults), selectedBlockId ?? void 0);
										setAddOpen(false);
									},
									className: "rounded-lg border border-border/60 px-2 py-2 text-left transition-all hover:border-primary/40 hover:bg-primary/5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-medium",
										children: def.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-muted-foreground line-clamp-1",
										children: def.description
									})]
								}, def.type))
							})
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DndContext, {
							sensors,
							collisionDetection: closestCenter,
							onDragEnd: handleDragEnd,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableContext, {
								items: (page?.blocks ?? []).map((b) => b.id),
								strategy: verticalListSortingStrategy,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-1.5",
									children: (page?.blocks ?? []).map((block) => {
										const def = allBlocks.find((d) => d.type === block.type);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableBlock, {
											id: block.id,
											label: def?.label ?? block.type,
											type: block.type,
											isSelected: selectedBlockId === block.id,
											onSelect: () => {
												selectBlock(block.id);
												setExpandedBlock(expandedBlock === block.id ? null : block.id);
											},
											onRemove: () => removeBlock(block.id)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: expandedBlock === block.id && def && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
											className: "overflow-hidden",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "rounded-b-xl border border-t-0 border-primary/30 bg-primary/5 px-3 pb-3 pt-2",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlockFieldEditor, {
													blockId: block.id,
													def,
													props: block.props
												})
											})
										}) })] }, block.id);
									})
								})
							})
						})
					]
				}),
				tab === "theme" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeEditor, {}),
				tab === "settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSettingsEditor, {})
			]
		})]
	});
}
function PageSettingsEditor() {
	const { page, updatePageMeta } = useEditorStore();
	if (!page) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
				children: "Page Settings"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Page title",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					value: page.title,
					onChange: (e) => updatePageMeta({ title: e.target.value }),
					className: "w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
				label: "URL slug",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					value: page.slug,
					onChange: (e) => updatePageMeta({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") }),
					className: "w-full rounded-xl border border-input bg-background px-3 py-2 text-sm font-mono outline-none focus:border-primary"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-[10px] text-muted-foreground",
					children: ["greetingvibes.com/p/", page.slug]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "PIN code (optional)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					value: page.pinCode,
					maxLength: 6,
					placeholder: "4-6 digits",
					onChange: (e) => updatePageMeta({ pinCode: e.target.value.replace(/\D/g, "") }),
					className: "w-full rounded-xl border border-input bg-background px-3 py-2 text-sm font-mono outline-none focus:border-primary"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Expires at (optional)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "date",
					value: page.expiresAt?.slice(0, 10) ?? "",
					onChange: (e) => updatePageMeta({ expiresAt: e.target.value }),
					className: "w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Visibility",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2 cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: page.isPublic,
						onChange: (e) => updatePageMeta({ isPublic: e.target.checked }),
						className: "accent-primary"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm",
						children: "Public page"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border/60 pt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground",
						children: "SEO"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "SEO title",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: page.seoTitle,
							placeholder: page.title,
							onChange: (e) => updatePageMeta({ seoTitle: e.target.value }),
							className: "w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "SEO description",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 3,
							value: page.seoDescription,
							onChange: (e) => updatePageMeta({ seoDescription: e.target.value }),
							className: "w-full resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
						})
					})
				]
			})
		]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			className: "text-xs font-medium text-muted-foreground",
			children: label
		}), children]
	});
}
var viewports = [
	{
		id: "desktop",
		icon: Monitor,
		label: "Desktop"
	},
	{
		id: "tablet",
		icon: Tablet,
		label: "Tablet"
	},
	{
		id: "mobile",
		icon: Smartphone,
		label: "Mobile"
	}
];
function EditorTopbar({ onSave }) {
	const { page, viewport, setViewport, isSaving, lastSavedAt, isDirty, undo, redo, canUndo, canRedo } = useEditorStore();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex h-14 shrink-0 items-center justify-between border-b border-border/60 bg-surface px-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/dashboard",
						className: "flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Dashboard"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-border/60",
						children: "|"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "max-w-[180px] truncate text-sm font-medium",
						children: page?.title ?? "Untitled"
					}),
					isDirty && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "h-1.5 w-1.5 rounded-full bg-warning",
						title: "Unsaved changes"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center rounded-xl border border-border bg-background p-1 gap-0.5",
				children: viewports.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setViewport(v.id),
					className: cn("flex h-7 w-7 items-center justify-center rounded-lg transition-all", viewport === v.id ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"),
					"aria-label": v.label,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(v.icon, { className: "h-3.5 w-3.5" })
				}, v.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: undo,
						disabled: !canUndo(),
						className: "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground disabled:opacity-30",
						"aria-label": "Undo",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: redo,
						disabled: !canRedo(),
						className: "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground disabled:opacity-30",
						"aria-label": "Redo",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Redo2, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex",
						children: isSaving ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), " Saving…"] }) : lastSavedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 text-success" }), " Saved"] }) : null
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onSave,
						disabled: isSaving || !isDirty,
						className: "flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow transition-all hover:bg-primary/90 disabled:opacity-50",
						children: [isSaving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-3.5 w-3.5" }), "Save"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/p/$slug",
						params: { slug: page?.slug ?? "" },
						target: "_blank",
						className: "flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-xs font-medium transition-all hover:border-primary/40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" }), " Preview"]
					})
				]
			})
		]
	});
}
function EditorPage() {
	const { pageId } = Route.useParams();
	const navigate = useNavigate();
	const user = useAuthStore((s) => s.user);
	const { data: page, isLoading, error } = usePage(pageId);
	const updatePage = useUpdatePage();
	const { setPage, page: editorPage, isDirty, setLastSaved, setIsSaving } = useEditorStore();
	(0, import_react.useEffect)(() => {
		if (!user) {
			navigate({ to: "/auth/login" });
			return;
		}
	}, [user]);
	(0, import_react.useEffect)(() => {
		if (page) setPage({
			id: page.id,
			slug: page.slug,
			title: page.title,
			templateId: page.template_id,
			blocks: page.blocks ?? [],
			theme: page.theme ?? {},
			seoTitle: page.seo_title ?? "",
			seoDescription: page.seo_description ?? "",
			ogImageUrl: page.og_image_url ?? "",
			isPublic: page.is_public,
			passwordHash: "",
			pinCode: page.pin_code ?? "",
			expiresAt: page.expires_at ?? "",
			status: page.status
		});
	}, [page, setPage]);
	const handleSave = (0, import_react.useCallback)(async () => {
		if (!editorPage || !isDirty) return;
		setIsSaving(true);
		try {
			await updatePage.mutateAsync({
				id: editorPage.id,
				blocks: editorPage.blocks,
				theme: editorPage.theme,
				title: editorPage.title,
				seo_title: editorPage.seoTitle || null,
				seo_description: editorPage.seoDescription || null,
				is_public: editorPage.isPublic,
				pin_code: editorPage.pinCode || null,
				expires_at: editorPage.expiresAt || null
			});
			setLastSaved(/* @__PURE__ */ new Date());
			toast.success("Saved");
		} catch {
			toast.error("Failed to save");
		} finally {
			setIsSaving(false);
		}
	}, [
		editorPage,
		isDirty,
		updatePage,
		setLastSaved,
		setIsSaving
	]);
	(0, import_react.useEffect)(() => {
		const interval = setInterval(() => {
			if (isDirty) handleSave();
		}, 3e4);
		return () => clearInterval(interval);
	}, [isDirty, handleSave]);
	if (isLoading || !editorPage) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" })
	});
	if (error || !page) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col items-center justify-center gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xl font-semibold",
			children: "Page not found"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/dashboard",
			className: "text-primary",
			children: "Go to dashboard"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-screen flex-col overflow-hidden bg-[#08071a]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorTopbar, { onSave: handleSave }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-y-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorSidebar, {})
		})]
	});
}
//#endregion
export { EditorPage as component };
