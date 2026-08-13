import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { a as numberType, n as booleanType, o as objectType, r as enumType, s as stringType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/registry-BHB5YlGA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function createBlockInstance(type, props) {
	return {
		id: `${type}-${Math.random().toString(36).slice(2, 10)}`,
		type,
		props: { ...props }
	};
}
var section$2 = "relative w-full px-6 py-16 sm:px-10 md:py-24";
var heroSchema = objectType({
	eyebrow: stringType().max(80).default(""),
	title: stringType().min(1).max(140),
	subtitle: stringType().max(400).default(""),
	imageUrl: stringType().default(""),
	align: enumType(["left", "center"]).default("center")
});
function Hero({ props, theme }) {
	const centered = props.align === "center";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: `${section$2} overflow-hidden`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "pointer-events-none absolute inset-0 opacity-70",
			style: { background: `radial-gradient(60% 55% at 50% 0%, ${theme.primary}33 0%, transparent 70%)` }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `relative mx-auto flex max-w-4xl flex-col gap-6 ${centered ? "items-center text-center" : "items-start text-left"}`,
			children: [
				props.eyebrow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
					initial: {
						opacity: 0,
						y: 12
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					className: "rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase",
					style: {
						background: `${theme.primary}22`,
						color: theme.primary
					},
					children: props.eyebrow
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
					initial: {
						opacity: 0,
						y: 22
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: {
						duration: .7,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					className: "text-4xl leading-[1.05] font-bold sm:text-5xl md:text-6xl",
					style: {
						fontFamily: theme.displayFont,
						color: theme.foreground
					},
					children: props.title
				}),
				props.subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
					initial: {
						opacity: 0,
						y: 18
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: {
						delay: .12,
						duration: .6
					},
					className: "max-w-2xl text-base leading-relaxed sm:text-lg",
					style: { color: theme.muted },
					children: props.subtitle
				}) : null,
				props.imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
					initial: {
						opacity: 0,
						scale: .96
					},
					whileInView: {
						opacity: 1,
						scale: 1
					},
					viewport: { once: true },
					transition: {
						duration: .8,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					src: props.imageUrl,
					alt: props.title,
					loading: "lazy",
					className: "mt-4 w-full max-w-2xl object-cover",
					style: {
						borderRadius: theme.radius,
						boxShadow: `0 30px 80px -40px ${theme.primary}`
					}
				}) : null
			]
		})]
	});
}
var heroBlock = {
	type: "hero",
	label: "Hero",
	description: "Opening statement with optional eyebrow, subtitle and image.",
	group: "content",
	schema: heroSchema,
	defaults: {
		eyebrow: "",
		title: "For you, always",
		subtitle: "A little page built to say something that a message never could.",
		imageUrl: "",
		align: "center"
	},
	fields: [
		{
			key: "eyebrow",
			label: "Eyebrow",
			kind: "text",
			placeholder: "Small label above the title"
		},
		{
			key: "title",
			label: "Title",
			kind: "text"
		},
		{
			key: "subtitle",
			label: "Subtitle",
			kind: "textarea"
		},
		{
			key: "imageUrl",
			label: "Image",
			kind: "image"
		},
		{
			key: "align",
			label: "Alignment",
			kind: "select",
			options: [{
				label: "Centered",
				value: "center"
			}, {
				label: "Left",
				value: "left"
			}]
		}
	],
	Component: Hero
};
var letterSchema = objectType({
	heading: stringType().max(120).default("A letter for you"),
	body: stringType().max(4e3).default(""),
	signature: stringType().max(80).default("")
});
function Letter({ props, theme }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: section$2,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
			initial: {
				opacity: 0,
				y: 26
			},
			whileInView: {
				opacity: 1,
				y: 0
			},
			viewport: {
				once: true,
				margin: "-80px"
			},
			transition: {
				duration: .7,
				ease: [
					.22,
					1,
					.36,
					1
				]
			},
			className: "mx-auto max-w-2xl p-8 sm:p-12",
			style: {
				background: theme.surface,
				borderRadius: theme.radius,
				boxShadow: `0 30px 90px -50px ${theme.primary}`,
				border: `1px solid ${theme.primary}22`
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-6 text-2xl font-semibold sm:text-3xl",
					style: {
						fontFamily: theme.displayFont,
						color: theme.foreground
					},
					children: props.heading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4 text-base leading-8",
					style: { color: theme.muted },
					children: props.body.split("\n").filter(Boolean).map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: line }, i))
				}),
				props.signature ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 text-right text-lg italic",
					style: {
						color: theme.primary,
						fontFamily: theme.displayFont
					},
					children: props.signature
				}) : null
			]
		})
	});
}
var letterBlock = {
	type: "letter",
	label: "Letter",
	description: "A long-form written message on a card surface.",
	group: "content",
	schema: letterSchema,
	defaults: {
		heading: "A letter for you",
		body: "There are things that are easier to write than to say.\nSo here they are, all in one place.",
		signature: "— Always yours"
	},
	fields: [
		{
			key: "heading",
			label: "Heading",
			kind: "text"
		},
		{
			key: "body",
			label: "Message",
			kind: "textarea",
			help: "One paragraph per line."
		},
		{
			key: "signature",
			label: "Signature",
			kind: "text"
		}
	],
	Component: Letter
};
var timelineSchema = objectType({
	heading: stringType().max(120).default("Our story"),
	items: arrayType(stringType()).default([])
});
function Timeline({ props, theme }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: section$2,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-10 text-center text-3xl font-semibold",
				style: {
					fontFamily: theme.displayFont,
					color: theme.foreground
				},
				children: props.heading
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "relative space-y-8 border-l pl-8",
				style: { borderColor: `${theme.primary}44` },
				children: props.items.map((item, i) => {
					const [label, ...rest] = item.split("|");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.li, {
						initial: {
							opacity: 0,
							x: -18
						},
						whileInView: {
							opacity: 1,
							x: 0
						},
						viewport: { once: true },
						transition: {
							delay: i * .07,
							duration: .55
						},
						className: "relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute top-1.5 -left-[38px] block h-3.5 w-3.5 rounded-full",
								style: {
									background: theme.primary,
									boxShadow: `0 0 0 5px ${theme.primary}22`
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold tracking-wide",
								style: { color: theme.primary },
								children: label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed",
								style: { color: theme.muted },
								children: rest.join("|") || ""
							})
						]
					}, i);
				})
			})]
		})
	});
}
var timelineBlock = {
	type: "timeline",
	label: "Timeline",
	description: "Chronological moments, one entry per line.",
	group: "content",
	schema: timelineSchema,
	defaults: {
		heading: "Our story",
		items: [
			"The first day|Where everything quietly started.",
			"The first trip|Bad directions, better company.",
			"Today|Still choosing you."
		]
	},
	fields: [{
		key: "heading",
		label: "Heading",
		kind: "text"
	}, {
		key: "items",
		label: "Moments",
		kind: "list-text",
		help: "Use “Title | description” on each entry."
	}],
	Component: Timeline
};
var typewriterSchema = objectType({
	lines: arrayType(stringType()).default([]),
	speedMs: numberType().min(20).max(300).default(65)
});
function Typewriter({ props, theme, mode }) {
	const lines = (0, import_react.useMemo)(() => props.lines.filter(Boolean), [props.lines]);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [text, setText] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (mode === "edit" || lines.length === 0) {
			setText(lines[0] ?? "");
			return;
		}
		const current = lines[index % lines.length];
		if (text.length < current.length) {
			const t = setTimeout(() => setText(current.slice(0, text.length + 1)), props.speedMs);
			return () => clearTimeout(t);
		}
		const t = setTimeout(() => {
			setText("");
			setIndex((i) => i + 1);
		}, 1800);
		return () => clearTimeout(t);
	}, [
		text,
		index,
		lines,
		props.speedMs,
		mode
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: `${section$2} text-center`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mx-auto min-h-[2.5em] max-w-3xl text-2xl font-medium sm:text-3xl",
			style: {
				fontFamily: theme.displayFont,
				color: theme.foreground
			},
			children: [text, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-0.5 inline-block animate-pulse",
				style: { color: theme.primary },
				children: "|"
			})]
		})
	});
}
var typewriterBlock = {
	type: "typewriter",
	label: "Typewriter",
	description: "Lines that type themselves out, one after another.",
	group: "content",
	schema: typewriterSchema,
	defaults: {
		lines: ["You make ordinary days feel rare.", "And rare days feel ordinary."],
		speedMs: 65
	},
	fields: [{
		key: "lines",
		label: "Lines",
		kind: "list-text"
	}, {
		key: "speedMs",
		label: "Typing speed (ms)",
		kind: "number",
		min: 20,
		max: 300
	}],
	Component: Typewriter
};
var ctaSchema = objectType({
	title: stringType().max(140).default("Say something back"),
	buttonLabel: stringType().max(40).default("Reply on WhatsApp"),
	buttonUrl: stringType().max(500).default("")
});
function Cta({ props, theme }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: `${section$2} text-center`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-6 text-3xl font-semibold",
			style: {
				fontFamily: theme.displayFont,
				color: theme.foreground
			},
			children: props.title
		}), props.buttonUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: props.buttonUrl,
			target: "_blank",
			rel: "noopener noreferrer",
			className: "inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.03]",
			style: {
				background: theme.primary,
				color: theme.background,
				borderRadius: theme.radius,
				boxShadow: `0 20px 50px -22px ${theme.primary}`
			},
			children: props.buttonLabel
		}) : null]
	});
}
var ctaBlock = {
	type: "cta",
	label: "Call to action",
	description: "A closing button that links anywhere.",
	group: "interactive",
	schema: ctaSchema,
	defaults: {
		title: "Say something back",
		buttonLabel: "Reply",
		buttonUrl: ""
	},
	fields: [
		{
			key: "title",
			label: "Title",
			kind: "text"
		},
		{
			key: "buttonLabel",
			label: "Button label",
			kind: "text"
		},
		{
			key: "buttonUrl",
			label: "Button link",
			kind: "text",
			placeholder: "https://"
		}
	],
	Component: Cta
};
var section$1 = "relative w-full px-6 py-16 sm:px-10 md:py-24";
var gallerySchema = objectType({
	heading: stringType().max(120).default("Our photos"),
	images: arrayType(stringType()).default([]),
	layout: enumType([
		"grid",
		"masonry",
		"carousel"
	]).default("grid")
});
function Gallery({ props, theme }) {
	const images = props.images.filter(Boolean);
	const [active, setActive] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: section$1,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl",
			children: [props.heading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-10 text-center text-3xl font-semibold",
				style: {
					fontFamily: theme.displayFont,
					color: theme.foreground
				},
				children: props.heading
			}) : null, props.layout === "carousel" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-4",
				children: [images.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
					initial: {
						opacity: 0,
						scale: .98
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					transition: { duration: .45 },
					src: images[active],
					alt: `Photo ${active + 1}`,
					loading: "lazy",
					className: "max-h-[520px] w-full object-cover",
					style: { borderRadius: theme.radius }
				}, active) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: images.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": `Show photo ${i + 1}`,
						onClick: () => setActive(i),
						className: "h-2 rounded-full transition-all",
						style: {
							width: i === active ? 26 : 8,
							background: i === active ? theme.primary : `${theme.primary}44`
						}
					}, i))
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: props.layout === "masonry" ? "columns-2 gap-4 sm:columns-3 [&>img]:mb-4" : "grid grid-cols-2 gap-4 sm:grid-cols-3",
				children: images.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
					initial: {
						opacity: 0,
						y: 20
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: {
						delay: i % 6 * .06,
						duration: .5
					},
					whileHover: { scale: 1.03 },
					src,
					alt: `Photo ${i + 1}`,
					loading: "lazy",
					className: "w-full object-cover",
					style: {
						borderRadius: theme.radius,
						aspectRatio: props.layout === "masonry" ? void 0 : "1 / 1"
					}
				}, `${src}-${i}`))
			})]
		})
	});
}
var galleryBlock = {
	type: "gallery",
	label: "Gallery",
	description: "Photo grid, masonry wall, or swipeable carousel.",
	group: "media",
	schema: gallerySchema,
	defaults: {
		heading: "Our photos",
		images: [],
		layout: "grid"
	},
	fields: [
		{
			key: "heading",
			label: "Heading",
			kind: "text"
		},
		{
			key: "images",
			label: "Photos",
			kind: "list-image"
		},
		{
			key: "layout",
			label: "Layout",
			kind: "select",
			options: [
				{
					label: "Grid",
					value: "grid"
				},
				{
					label: "Masonry",
					value: "masonry"
				},
				{
					label: "Carousel",
					value: "carousel"
				}
			]
		}
	],
	Component: Gallery
};
var videoSchema = objectType({
	heading: stringType().max(120).default(""),
	videoUrl: stringType().max(600).default(""),
	posterUrl: stringType().max(600).default("")
});
function VideoBlock({ props, theme }) {
	if (!props.videoUrl) return null;
	const isEmbed = /youtube|youtu\.be|vimeo/.test(props.videoUrl);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: section$1,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-4xl",
			children: [props.heading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-8 text-center text-3xl font-semibold",
				style: {
					fontFamily: theme.displayFont,
					color: theme.foreground
				},
				children: props.heading
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden",
				style: {
					borderRadius: theme.radius,
					boxShadow: `0 30px 80px -44px ${theme.primary}`
				},
				children: isEmbed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					src: props.videoUrl.replace("watch?v=", "embed/"),
					title: props.heading || "Video",
					allow: "accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture",
					allowFullScreen: true,
					className: "aspect-video w-full"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					src: props.videoUrl,
					poster: props.posterUrl || void 0,
					controls: true,
					playsInline: true,
					className: "w-full"
				})
			})]
		})
	});
}
var videoBlock = {
	type: "video",
	label: "Video",
	description: "An uploaded clip or a YouTube/Vimeo embed.",
	group: "media",
	schema: videoSchema,
	defaults: {
		heading: "",
		videoUrl: "",
		posterUrl: ""
	},
	fields: [
		{
			key: "heading",
			label: "Heading",
			kind: "text"
		},
		{
			key: "videoUrl",
			label: "Video",
			kind: "video"
		},
		{
			key: "posterUrl",
			label: "Poster image",
			kind: "image"
		}
	],
	Component: VideoBlock
};
var musicSchema = objectType({
	trackUrl: stringType().max(600).default(""),
	title: stringType().max(120).default("Our song"),
	artist: stringType().max(120).default(""),
	autoplay: booleanType().default(false)
});
function Music({ props, theme, mode }) {
	const audioRef = (0, import_react.useRef)(null);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (mode === "edit") return;
		if (props.autoplay && audioRef.current) audioRef.current.play().then(() => setPlaying(true), () => setPlaying(false));
	}, [
		props.autoplay,
		props.trackUrl,
		mode
	]);
	if (!props.trackUrl) return null;
	const toggle = () => {
		const el = audioRef.current;
		if (!el) return;
		if (el.paused) el.play().then(() => setPlaying(true), () => void 0);
		else {
			el.pause();
			setPlaying(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "w-full px-6 py-10 sm:px-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-md items-center gap-4 p-4",
			style: {
				background: theme.surface,
				borderRadius: theme.radius,
				border: `1px solid ${theme.primary}22`
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: toggle,
					"aria-label": playing ? "Pause music" : "Play music",
					className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-transform hover:scale-105",
					style: {
						background: theme.primary,
						color: theme.background
					},
					children: playing ? "❚❚" : "▶"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate font-semibold",
						style: { color: theme.foreground },
						children: props.title
					}), props.artist ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-sm",
						style: { color: theme.muted },
						children: props.artist
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
					ref: audioRef,
					src: props.trackUrl,
					loop: true,
					preload: "none",
					onEnded: () => setPlaying(false)
				})
			]
		})
	});
}
var musicBlock = {
	type: "music",
	label: "Music",
	description: "Background track with a compact player.",
	group: "media",
	schema: musicSchema,
	defaults: {
		trackUrl: "",
		title: "Our song",
		artist: "",
		autoplay: false
	},
	fields: [
		{
			key: "trackUrl",
			label: "Audio file",
			kind: "audio"
		},
		{
			key: "title",
			label: "Track title",
			kind: "text"
		},
		{
			key: "artist",
			label: "Artist",
			kind: "text"
		},
		{
			key: "autoplay",
			label: "Try to autoplay",
			kind: "boolean"
		}
	],
	Component: Music
};
var countdownSchema = objectType({
	heading: stringType().max(120).default("Counting since"),
	targetDate: stringType().default((/* @__PURE__ */ new Date()).toISOString().slice(0, 10)),
	direction: enumType(["up", "down"]).default("up")
});
function useTick(active) {
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	(0, import_react.useEffect)(() => {
		if (!active) return;
		const id = setInterval(() => setNow(Date.now()), 1e3);
		return () => clearInterval(id);
	}, [active]);
	return now;
}
function Countdown({ props, theme, mode }) {
	const now = useTick(mode === "view");
	const parts = (0, import_react.useMemo)(() => {
		const target = new Date(props.targetDate).getTime();
		const diffMs = props.direction === "up" ? now - target : target - now;
		const totalSeconds = Math.floor(Math.max(0, diffMs) / 1e3);
		return [
			{
				label: "days",
				value: Math.floor(totalSeconds / 86400)
			},
			{
				label: "hours",
				value: Math.floor(totalSeconds % 86400 / 3600)
			},
			{
				label: "minutes",
				value: Math.floor(totalSeconds % 3600 / 60)
			},
			{
				label: "seconds",
				value: totalSeconds % 60
			}
		];
	}, [
		now,
		props.targetDate,
		props.direction
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: `${section$1} text-center`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-8 text-2xl font-semibold sm:text-3xl",
			style: {
				fontFamily: theme.displayFont,
				color: theme.foreground
			},
			children: props.heading
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto grid max-w-2xl grid-cols-4 gap-3 sm:gap-5",
			children: parts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-2 py-5",
				style: {
					background: theme.surface,
					borderRadius: theme.radius,
					border: `1px solid ${theme.primary}22`
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-2xl font-bold tabular-nums sm:text-4xl",
					style: {
						color: theme.primary,
						fontFamily: theme.displayFont
					},
					children: String(p.value).padStart(2, "0")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-[11px] tracking-[0.16em] uppercase",
					style: { color: theme.muted },
					children: p.label
				})]
			}, p.label))
		})]
	});
}
var countdownBlock = {
	type: "countdown",
	label: "Countdown",
	description: "Time since a date, or time remaining until one.",
	group: "interactive",
	schema: countdownSchema,
	defaults: {
		heading: "Counting since",
		targetDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		direction: "up"
	},
	fields: [
		{
			key: "heading",
			label: "Heading",
			kind: "text"
		},
		{
			key: "targetDate",
			label: "Date",
			kind: "date"
		},
		{
			key: "direction",
			label: "Mode",
			kind: "select",
			options: [{
				label: "Count up from date",
				value: "up"
			}, {
				label: "Count down to date",
				value: "down"
			}]
		}
	],
	Component: Countdown
};
var section = "relative w-full px-6 py-16 sm:px-10 md:py-24";
function usePrefersReducedMotion() {
	const [reduced, setReduced] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReduced(mq.matches);
		const handler = (e) => setReduced(e.matches);
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, []);
	return reduced;
}
var heartsSchema = objectType({
	symbol: stringType().max(4).default("♥"),
	count: numberType().min(4).max(60).default(18),
	speed: numberType().min(4).max(30).default(12)
});
function FloatingHearts({ props, theme, mode }) {
	const reduced = usePrefersReducedMotion();
	const items = (0, import_react.useMemo)(() => Array.from({ length: props.count }, (_, i) => ({
		id: i,
		left: i * 37 % 100,
		delay: i % 10 * .7,
		size: 12 + i * 13 % 22,
		duration: props.speed + i * 3 % 8
	})), [props.count, props.speed]);
	if (reduced || mode === "edit") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none absolute inset-0 overflow-hidden",
		"aria-hidden": true,
		children: items.slice(0, 8).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute",
			style: {
				left: `${item.left}%`,
				top: `${item.id * 11 % 90}%`,
				fontSize: item.size,
				color: theme.primary,
				opacity: .35
			},
			children: props.symbol
		}, item.id))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none absolute inset-0 overflow-hidden",
		"aria-hidden": true,
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			className: "absolute bottom-[-40px]",
			style: {
				left: `${item.left}%`,
				fontSize: item.size,
				color: theme.primary
			},
			initial: {
				y: 0,
				opacity: 0
			},
			animate: {
				y: "-110vh",
				opacity: [
					0,
					.85,
					0
				]
			},
			transition: {
				duration: item.duration,
				delay: item.delay,
				repeat: Infinity,
				ease: "linear"
			},
			children: props.symbol
		}, item.id))
	});
}
var heartsBlock = {
	type: "hearts",
	label: "Floating hearts",
	description: "Ambient symbols drifting up the page.",
	group: "effects",
	schema: heartsSchema,
	defaults: {
		symbol: "♥",
		count: 18,
		speed: 12
	},
	fields: [
		{
			key: "symbol",
			label: "Symbol",
			kind: "text",
			help: "Any emoji or character."
		},
		{
			key: "count",
			label: "How many",
			kind: "number",
			min: 4,
			max: 60
		},
		{
			key: "speed",
			label: "Drift duration (s)",
			kind: "number",
			min: 4,
			max: 30
		}
	],
	Component: FloatingHearts
};
var confettiSchema = objectType({
	trigger: enumType(["load", "click"]).default("load"),
	buttonLabel: stringType().max(40).default("Celebrate"),
	intensity: numberType().min(30).max(400).default(160)
});
function ConfettiBlock({ props, theme, mode }) {
	const reduced = usePrefersReducedMotion();
	const fired = (0, import_react.useRef)(false);
	const fire = (0, import_react.useMemo)(() => async () => {
		if (reduced) return;
		const confetti = (await import("../_libs/canvas-confetti.mjs").then((n) => n.n)).default;
		confetti({
			particleCount: props.intensity,
			spread: 82,
			origin: { y: .65 },
			colors: [
				theme.primary,
				theme.accent,
				theme.foreground
			]
		});
	}, [
		props.intensity,
		reduced,
		theme.accent,
		theme.foreground,
		theme.primary
	]);
	(0, import_react.useEffect)(() => {
		if (mode === "edit" || props.trigger !== "load" || fired.current) return;
		fired.current = true;
		const t = setTimeout(() => void fire(), 400);
		return () => clearTimeout(t);
	}, [
		fire,
		mode,
		props.trigger
	]);
	if (props.trigger === "load") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "w-full px-6 py-10 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => void fire(),
			className: "inline-flex items-center justify-center px-7 py-3 text-sm font-semibold transition-transform hover:scale-105",
			style: {
				background: theme.primary,
				color: theme.background,
				borderRadius: theme.radius
			},
			children: props.buttonLabel
		})
	});
}
var confettiBlock = {
	type: "confetti",
	label: "Confetti",
	description: "Burst of confetti on load or on a button press.",
	group: "effects",
	schema: confettiSchema,
	defaults: {
		trigger: "load",
		buttonLabel: "Celebrate",
		intensity: 160
	},
	fields: [
		{
			key: "trigger",
			label: "Trigger",
			kind: "select",
			options: [{
				label: "When the page opens",
				value: "load"
			}, {
				label: "When a button is pressed",
				value: "click"
			}]
		},
		{
			key: "buttonLabel",
			label: "Button label",
			kind: "text"
		},
		{
			key: "intensity",
			label: "Particles",
			kind: "number",
			min: 30,
			max: 400
		}
	],
	Component: ConfettiBlock
};
var particlesSchema = objectType({
	density: numberType().min(20).max(160).default(70),
	twinkle: booleanType().default(true)
});
function Particles({ props, theme }) {
	const reduced = usePrefersReducedMotion();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none absolute inset-0 overflow-hidden",
		"aria-hidden": true,
		children: (0, import_react.useMemo)(() => Array.from({ length: props.density }, (_, i) => ({
			id: i,
			x: i * 53 % 100,
			y: i * 29 % 100,
			size: 1 + i * 7 % 3,
			delay: i % 12 * .35
		})), [props.density]).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute rounded-full",
			style: {
				left: `${d.x}%`,
				top: `${d.y}%`,
				width: d.size,
				height: d.size,
				background: theme.accent,
				opacity: .6,
				animation: props.twinkle && !reduced ? `pulse 3.2s ease-in-out ${d.delay}s infinite` : void 0
			}
		}, d.id))
	});
}
var particlesBlock = {
	type: "particles",
	label: "Particles",
	description: "A soft starfield behind the content.",
	group: "effects",
	schema: particlesSchema,
	defaults: {
		density: 70,
		twinkle: true
	},
	fields: [{
		key: "density",
		label: "Density",
		kind: "number",
		min: 20,
		max: 160
	}, {
		key: "twinkle",
		label: "Twinkle",
		kind: "boolean"
	}],
	Component: Particles
};
var floatingCardsSchema = objectType({
	heading: stringType().max(120).default("Reasons"),
	items: arrayType(stringType()).default([])
});
function FloatingCards({ props, theme }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: section,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-10 text-center text-3xl font-semibold",
				style: {
					fontFamily: theme.displayFont,
					color: theme.foreground
				},
				children: props.heading
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: props.items.filter(Boolean).map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 24
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: {
						delay: i % 6 * .06,
						duration: .5
					},
					whileHover: {
						y: -6,
						rotateX: 4,
						rotateY: -4
					},
					className: "p-6",
					style: {
						background: theme.surface,
						borderRadius: theme.radius,
						border: `1px solid ${theme.primary}22`,
						boxShadow: `0 22px 60px -40px ${theme.primary}`,
						transformStyle: "preserve-3d"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-3 block text-xs font-semibold tracking-[0.2em]",
						style: { color: theme.primary },
						children: String(i + 1).padStart(2, "0")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "leading-relaxed",
						style: { color: theme.muted },
						children: item
					})]
				}, i))
			})]
		})
	});
}
var floatingCardsBlock = {
	type: "floating-cards",
	label: "Floating cards",
	description: "A numbered grid of short reasons or notes.",
	group: "content",
	schema: floatingCardsSchema,
	defaults: {
		heading: "Reasons",
		items: ["The way you laugh at your own jokes.", "You never let me carry anything alone."]
	},
	fields: [{
		key: "heading",
		label: "Heading",
		kind: "text"
	}, {
		key: "items",
		label: "Cards",
		kind: "list-text"
	}],
	Component: FloatingCards
};
var gifSchema = objectType({
	url: stringType().max(600).default(""),
	caption: stringType().max(160).default(""),
	size: enumType([
		"sm",
		"md",
		"lg"
	]).default("md")
});
function Gif({ props, theme }) {
	if (!props.url) return null;
	const width = props.size === "sm" ? 220 : props.size === "lg" ? 520 : 360;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "w-full px-6 py-10 text-center sm:px-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: props.url,
			alt: props.caption || "Animation",
			loading: "lazy",
			className: "mx-auto w-full object-contain",
			style: {
				maxWidth: width,
				borderRadius: theme.radius
			}
		}), props.caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm",
			style: { color: theme.muted },
			children: props.caption
		}) : null]
	});
}
var definitions = [
	heroBlock,
	letterBlock,
	timelineBlock,
	typewriterBlock,
	floatingCardsBlock,
	galleryBlock,
	videoBlock,
	{
		type: "gif",
		label: "GIF",
		description: "An animated image with an optional caption.",
		group: "media",
		schema: gifSchema,
		defaults: {
			url: "",
			caption: "",
			size: "md"
		},
		fields: [
			{
				key: "url",
				label: "GIF",
				kind: "image"
			},
			{
				key: "caption",
				label: "Caption",
				kind: "text"
			},
			{
				key: "size",
				label: "Size",
				kind: "select",
				options: [
					{
						label: "Small",
						value: "sm"
					},
					{
						label: "Medium",
						value: "md"
					},
					{
						label: "Large",
						value: "lg"
					}
				]
			}
		],
		Component: Gif
	},
	musicBlock,
	countdownBlock,
	ctaBlock,
	heartsBlock,
	confettiBlock,
	particlesBlock
];
var blockRegistry = new Map(definitions.map((d) => [d.type, d]));
var allBlocks = definitions;
function getBlockDefinition(type) {
	return blockRegistry.get(type);
}
/** Validates and normalises stored block props against the registered schema. */
function resolveBlockProps(instance) {
	const def = blockRegistry.get(instance.type);
	if (!def) return null;
	const parsed = def.schema.safeParse({
		...def.defaults,
		...instance.props
	});
	return parsed.success ? parsed.data : def.defaults;
}
//#endregion
export { resolveBlockProps as i, createBlockInstance as n, getBlockDefinition as r, allBlocks as t };
