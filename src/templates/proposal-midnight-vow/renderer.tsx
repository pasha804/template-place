import { TemplateSurface } from "@/templates/surface";
import type { TemplateRendererProps } from "@/templates/contract";

import { animations } from "./animations";

export function Renderer(props: TemplateRendererProps) {
  return <TemplateSurface {...props} entrance={animations.entrance} ambient={animations.ambient} />;
}
