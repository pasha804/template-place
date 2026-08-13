import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$24 } from "../_pageId-C6fQ5uBu.mjs";
import { i as literalType, o as objectType, s as stringType } from "../_libs/zod.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$25 } from "../_pageId-DvKxJCm6.mjs";
import { t as useAuth } from "./use-auth-BkAzBpck.mjs";
import { t as Route$26 } from "../_slug-DV78iSSS.mjs";
import { t as Route$27 } from "../_slug-DRxf6zpE.mjs";
import { t as Route$28 } from "../_slug-CiM2pOUS.mjs";
import { t as Route$29 } from "../_templateId-CXsZ4yYC.mjs";
import { t as Route$30 } from "./new-_DyyFSsk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DtWLzJvM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BgJU2Pxy.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$23 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Greeting Vibes Templates — Dedications that Fall in Love" },
			{
				name: "description",
				content: "Create beautiful dedication pages for every occasion. Choose a template, add your story, share the link."
			},
			{
				name: "author",
				content: "Greeting Vibes"
			},
			{
				property: "og:title",
				content: "Greeting Vibes Templates"
			},
			{
				property: "og:description",
				content: "Beautiful dedication pages for every occasion."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@GreetingVibes"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: `(function(){var t=localStorage.getItem('shaukat-theme');if(t==='light'){document.documentElement.classList.add('light');}})();` } })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	useAuth();
	const { queryClient } = Route$23.useRouteContext();
	(0, import_react.useEffect)(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "instant"
		});
	}, [useRouterState({ select: (s) => s.location.pathname })]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "app-ui font-sans antialiased text-foreground min-h-screen",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			position: "bottom-right",
			theme: "dark",
			toastOptions: { style: {
				background: "rgba(15,13,36,0.92)",
				border: "1px solid rgba(167,139,250,0.18)",
				color: "#f0eeff",
				borderRadius: "16px",
				backdropFilter: "blur(20px)",
				boxShadow: "0 8px 40px -10px rgba(0,0,0,0.6), 0 0 0 1px rgba(167,139,250,0.08)",
				fontFamily: "var(--font-poppins)"
			} }
		})]
	});
}
var $$splitComponentImporter$22 = () => import("./routes-DGcITLWk.mjs");
var Route$22 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Greeting Vibes Templates — Create Beautiful Moments" },
		{
			name: "description",
			content: "Build stunning personal websites for your loved ones in minutes. Choose a template, customize it your way and share your love."
		},
		{
			property: "og:title",
			content: "Greeting Vibes Templates"
		},
		{
			property: "og:description",
			content: "Create beautiful moments with premium templates."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./contact-Du3fmZi7.mjs");
var Route$21 = createFileRoute("/contact")({
	head: () => ({ meta: [{ title: "Contact — Greeting Vibes Templates" }] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
objectType({
	email: stringType().email(),
	subject: stringType().min(5, "Subject too short"),
	message: stringType().min(20, "Message too short")
});
var $$splitComponentImporter$20 = () => import("./pricing-DmdNRIUh.mjs");
var Route$20 = createFileRoute("/pricing")({
	head: () => ({ meta: [{ title: "Plans & Pricing — Greeting Vibes Templates" }, {
		name: "description",
		content: "Simple, transparent pricing for every budget."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
/**
* Admin Dashboard — /admin
* Only accessible to users with role "admin" or "moderator".
*/
var $$splitComponentImporter$19 = () => import("./admin-DeEfSP3w.mjs");
var Route$19 = createFileRoute("/admin/")({
	head: () => ({ meta: [{ title: "Admin — Greeting Vibes" }] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
/**
* Admin Orders — /admin/orders
* List all orders, filter by status, open detail modal to approve/reject/publish.
*/
var $$splitComponentImporter$18 = () => import("./orders-RV4MzNqs.mjs");
var Route$18 = createFileRoute("/admin/orders")({
	head: () => ({ meta: [{ title: "Orders — Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
/**
* Admin Pages — /admin/pages
* View all published/pending pages, unpublish, expire, delete.
*/
var $$splitComponentImporter$17 = () => import("./pages-BcsV04ke.mjs");
var Route$17 = createFileRoute("/admin/pages")({
	head: () => ({ meta: [{ title: "Pages — Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
/**
* Pending Websites — /admin/pending
* Dedicated queue for reviewing, live-previewing, and publishing pending websites after user payment.
*/
var $$splitComponentImporter$16 = () => import("./pending-EBBLU5YI.mjs");
var Route$16 = createFileRoute("/admin/pending")({
	head: () => ({ meta: [{ title: "Pending Websites — Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
/**
* Admin Users — /admin/users
* View all users, see their roles, promote to admin/moderator.
*/
var $$splitComponentImporter$15 = () => import("./users-r7PYeBoe.mjs");
var Route$15 = createFileRoute("/admin/users")({
	head: () => ({ meta: [{ title: "Users — Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./forgot-password-ClsTvKSx.mjs");
var Route$14 = createFileRoute("/auth/forgot-password")({
	head: () => ({ meta: [{ title: "Reset password — Greeting Vibes Templates" }] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
objectType({ email: stringType().email("Enter a valid email") });
var $$splitComponentImporter$13 = () => import("./login-Cvhb4rO9.mjs");
var Route$13 = createFileRoute("/auth/login")({
	head: () => ({ meta: [{ title: "Sign in — Greeting Vibes Templates" }] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
objectType({
	email: stringType().email("Enter a valid email"),
	password: stringType().min(6, "Password must be at least 6 characters")
});
var $$splitComponentImporter$12 = () => import("./reset-password-D76pFcew.mjs");
var Route$12 = createFileRoute("/auth/reset-password")({
	head: () => ({ meta: [{ title: "Set new password — Greeting Vibes Templates" }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
objectType({
	password: stringType().min(8, "Password must be at least 8 characters"),
	confirm: stringType()
}).refine((d) => d.password === d.confirm, {
	message: "Passwords do not match",
	path: ["confirm"]
});
var $$splitComponentImporter$11 = () => import("./signup-iUvmIIE9.mjs");
var Route$11 = createFileRoute("/auth/signup")({
	head: () => ({ meta: [{ title: "Create account — Greeting Vibes Templates" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
objectType({
	fullName: stringType().min(2, "Enter your full name"),
	email: stringType().email("Enter a valid email"),
	password: stringType().min(8, "Password must be at least 8 characters"),
	terms: literalType(true, { errorMap: () => ({ message: "Accept the terms to continue" }) })
});
var $$splitComponentImporter$10 = () => import("./blog-4GAdtlJF.mjs");
var Route$10 = createFileRoute("/blog/")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("../_slug-BA6SkkGe.mjs");
var Route$9 = createFileRoute("/blog/$slug")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./dashboard-Dfrg2xMA.mjs");
var Route$8 = createFileRoute("/dashboard/")({
	head: () => ({ meta: [{ title: "Dashboard — Greeting Vibes Templates" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./analytics-DQtc40BY.mjs");
var Route$7 = createFileRoute("/dashboard/analytics")({
	head: () => ({ meta: [{ title: "Analytics — Dashboard" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./billing-BmGOpfdZ.mjs");
var Route$6 = createFileRoute("/dashboard/billing")({
	head: () => ({ meta: [{ title: "Billing — Dashboard" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./favorites-BKffGr3J.mjs");
var Route$5 = createFileRoute("/dashboard/favorites")({
	head: () => ({ meta: [{ title: "Favorites — Dashboard" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./notifications-B3bL3Ql9.mjs");
var Route$4 = createFileRoute("/dashboard/notifications")({
	head: () => ({ meta: [{ title: "Notifications — Dashboard" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./pages-CWj_09Fw.mjs");
var Route$3 = createFileRoute("/dashboard/pages")({
	head: () => ({ meta: [{ title: "My Pages — Dashboard" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./profile-DHs-dpqI.mjs");
var Route$2 = createFileRoute("/dashboard/profile")({
	head: () => ({ meta: [{ title: "Profile — Dashboard" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
objectType({
	full_name: stringType().min(2, "Name is too short"),
	bio: stringType().max(200).optional(),
	country: stringType().optional()
});
var $$splitComponentImporter$1 = () => import("./settings-BTk7iGoq.mjs");
var Route$1 = createFileRoute("/dashboard/settings")({
	head: () => ({ meta: [{ title: "Settings — Dashboard" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./templates-nErJ5yCb.mjs");
var Route = createFileRoute("/templates/")({
	head: () => ({ meta: [{ title: "Templates — Greeting Vibes Templates" }, {
		name: "description",
		content: "Browse interactive templates for every occasion."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$22.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$23
});
var ContactRoute = Route$21.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$23
});
var PricingRoute = Route$20.update({
	id: "/pricing",
	path: "/pricing",
	getParentRoute: () => Route$23
});
var AdminIndexRoute = Route$19.update({
	id: "/admin/",
	path: "/admin/",
	getParentRoute: () => Route$23
});
var AdminOrdersRoute = Route$18.update({
	id: "/admin/orders",
	path: "/admin/orders",
	getParentRoute: () => Route$23
});
var AdminPagesRoute = Route$17.update({
	id: "/admin/pages",
	path: "/admin/pages",
	getParentRoute: () => Route$23
});
var AdminPendingRoute = Route$16.update({
	id: "/admin/pending",
	path: "/admin/pending",
	getParentRoute: () => Route$23
});
var AdminUsersRoute = Route$15.update({
	id: "/admin/users",
	path: "/admin/users",
	getParentRoute: () => Route$23
});
var AuthForgotPasswordRoute = Route$14.update({
	id: "/auth/forgot-password",
	path: "/auth/forgot-password",
	getParentRoute: () => Route$23
});
var AuthLoginRoute = Route$13.update({
	id: "/auth/login",
	path: "/auth/login",
	getParentRoute: () => Route$23
});
var AuthResetPasswordRoute = Route$12.update({
	id: "/auth/reset-password",
	path: "/auth/reset-password",
	getParentRoute: () => Route$23
});
var AuthSignupRoute = Route$11.update({
	id: "/auth/signup",
	path: "/auth/signup",
	getParentRoute: () => Route$23
});
var BlogIndexRoute = Route$10.update({
	id: "/blog/",
	path: "/blog/",
	getParentRoute: () => Route$23
});
var BlogSlugRoute = Route$9.update({
	id: "/blog/$slug",
	path: "/blog/$slug",
	getParentRoute: () => Route$23
});
var CheckoutPageIdRoute = Route$25.update({
	id: "/checkout/$pageId",
	path: "/checkout/$pageId",
	getParentRoute: () => Route$23
});
var DashboardIndexRoute = Route$8.update({
	id: "/dashboard/",
	path: "/dashboard/",
	getParentRoute: () => Route$23
});
var DashboardAnalyticsRoute = Route$7.update({
	id: "/dashboard/analytics",
	path: "/dashboard/analytics",
	getParentRoute: () => Route$23
});
var DashboardBillingRoute = Route$6.update({
	id: "/dashboard/billing",
	path: "/dashboard/billing",
	getParentRoute: () => Route$23
});
var DashboardFavoritesRoute = Route$5.update({
	id: "/dashboard/favorites",
	path: "/dashboard/favorites",
	getParentRoute: () => Route$23
});
var DashboardNotificationsRoute = Route$4.update({
	id: "/dashboard/notifications",
	path: "/dashboard/notifications",
	getParentRoute: () => Route$23
});
var DashboardPagesRoute = Route$3.update({
	id: "/dashboard/pages",
	path: "/dashboard/pages",
	getParentRoute: () => Route$23
});
var DashboardProfileRoute = Route$2.update({
	id: "/dashboard/profile",
	path: "/dashboard/profile",
	getParentRoute: () => Route$23
});
var DashboardSettingsRoute = Route$1.update({
	id: "/dashboard/settings",
	path: "/dashboard/settings",
	getParentRoute: () => Route$23
});
var DemoSlugRoute = Route$26.update({
	id: "/demo/$slug",
	path: "/demo/$slug",
	getParentRoute: () => Route$23
});
var EditorPageIdRoute = Route$24.update({
	id: "/editor/$pageId",
	path: "/editor/$pageId",
	getParentRoute: () => Route$23
});
var EditorNewRoute = Route$30.update({
	id: "/editor/new",
	path: "/editor/new",
	getParentRoute: () => Route$23
});
var PSlugRoute = Route$28.update({
	id: "/p/$slug",
	path: "/p/$slug",
	getParentRoute: () => Route$23
});
var TemplatesIndexRoute = Route.update({
	id: "/templates/",
	path: "/templates/",
	getParentRoute: () => Route$23
});
var rootRouteChildren = {
	IndexRoute,
	ContactRoute,
	PricingRoute,
	AdminOrdersRoute,
	AdminPagesRoute,
	AdminPendingRoute,
	AdminUsersRoute,
	AuthForgotPasswordRoute,
	AuthLoginRoute,
	AuthResetPasswordRoute,
	AuthSignupRoute,
	BlogSlugRoute,
	CheckoutPageIdRoute,
	DashboardAnalyticsRoute,
	DashboardBillingRoute,
	DashboardFavoritesRoute,
	DashboardNotificationsRoute,
	DashboardPagesRoute,
	DashboardProfileRoute,
	DashboardSettingsRoute,
	DemoSlugRoute,
	EditorPageIdRoute,
	EditorNewRoute,
	PSlugRoute,
	TemplatesSlugRoute: Route$27.update({
		id: "/templates/$slug",
		path: "/templates/$slug",
		getParentRoute: () => Route$23
	}),
	AdminIndexRoute,
	BlogIndexRoute,
	DashboardIndexRoute,
	TemplatesIndexRoute,
	EditorTemplateTemplateIdRoute: Route$29.update({
		id: "/editor/template/$templateId",
		path: "/editor/template/$templateId",
		getParentRoute: () => Route$23
	})
};
var routeTree = Route$23._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
