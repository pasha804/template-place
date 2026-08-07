-- Seed Sorry Sweet II (template2)
-- UUID: d4e5f6a7-b8c9-0123-defa-456789012345
insert into public.templates (id, plugin_id, slug, name, tagline, description, category_id, tags, cover_url, price_cents, is_premium, is_published, is_featured, sort_order)
values (
  'd4e5f6a7-b8c9-0123-defa-456789012345', 'd4e5f6a7-b8c9-0123-defa-456789012345',
  'sorry-sweet-2', 'Sorry Sweet II',
  'Enhanced cinematic apology — deeper visuals, richer animations',
  'Enhanced edition of Sorry Sweet with near-black deep plum aesthetic, 45 particles, dynamic purple ambient lighting, and stronger visual effects throughout all 10 screens.',
  (select id from public.categories where slug = 'sorry' limit 1),
  array['sorry','apology','music','voice-note','scratch-card','confetti','cinematic','enhanced','plum','romantic'],
  '/templates/sorry-sweet2/gifs/1.gif', 1999, true, true, false, 120
)
on conflict (id) do update set
  plugin_id=excluded.plugin_id, slug=excluded.slug, name=excluded.name,
  tagline=excluded.tagline, description=excluded.description, category_id=excluded.category_id,
  tags=excluded.tags, cover_url=excluded.cover_url, price_cents=excluded.price_cents,
  is_premium=excluded.is_premium, is_published=excluded.is_published,
  is_featured=excluded.is_featured, sort_order=excluded.sort_order;
