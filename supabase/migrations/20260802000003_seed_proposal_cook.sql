-- Seed Proposal Cook
-- UUID: a0b1c2d3-e4f5-6789-abcd-ef0123456789
insert into public.templates (id, plugin_id, slug, name, tagline, description, category_id, tags, cover_url, price_cents, is_premium, is_published, is_featured, sort_order)
values (
  'a0b1c2d3-e4f5-6789-abcd-ef0123456789', 'a0b1c2d3-e4f5-6789-abcd-ef0123456789',
  'proposal-cook', 'Proposal Cook',
  'Deep plum cinematic proposal with enhanced effects & fireworks',
  'Enhanced 15-screen proposal with near-black deep plum aesthetic, richer glass effects, and spectacular fireworks finale.',
  (select id from public.categories where slug = 'proposal' limit 1),
  array['proposal','marriage','interactive','cinematic','deep-plum','enhanced','fireworks','gifts','quiz','letter','gallery'],
  '/templates/proposal-cook/gif/1.gif', 2999, true, true, true, 90
)
on conflict (id) do update set
  plugin_id=excluded.plugin_id, slug=excluded.slug, name=excluded.name,
  tagline=excluded.tagline, description=excluded.description, category_id=excluded.category_id,
  tags=excluded.tags, cover_url=excluded.cover_url, price_cents=excluded.price_cents,
  is_premium=excluded.is_premium, is_published=excluded.is_published,
  is_featured=excluded.is_featured, sort_order=excluded.sort_order;
