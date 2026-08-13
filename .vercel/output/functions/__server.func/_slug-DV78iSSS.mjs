import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-DV78iSSS.js
/**
* Demo route — /demo/:slug
* Renders the template fullscreen using its default config.
* No editor, no header, no chrome — just the raw template experience.
* Opens in a new tab when user clicks "Demo" on the detail page.
*
* IMPORTANT: No wrapper height/overflow constraints — the template renders
* exactly as it would standalone. The body is the scroll container.
*/
var $$splitComponentImporter = () => import("./_slug-BJfx4fYe.mjs");
var Route = createFileRoute("/demo/$slug")({
	head: () => ({ meta: [{ title: "Live Demo — Greeting Vibes" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
