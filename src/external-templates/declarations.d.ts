/**
 * Module declarations for .jsx original template components.
 * These are verbatim copies of the original standalone templates.
 * Typed as `any` to avoid noImplicitAny errors when imported from .tsx Renderers.
 */

// Wildcard declaration: any .jsx file exports a default component (any type)
declare module "*.jsx" {
  const component: any;
  export default component;
}
