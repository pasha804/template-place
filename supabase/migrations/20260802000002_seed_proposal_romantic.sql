-- Seed Proposal Romantic
-- UUID: f6a7b8c9-d0e1-2345-fabc-678901234567
insert into public.templates (id, plugin_id, slug, name, tagline, description, category_id, tags, cover_url, price_cents, is_premium, is_published, is_featured, sort_order)
values (
  'f6a7b8c9-d0e1-2345-fabc-678901234567', 'f6a7b8c9-d0e1-2345-fabc-678901234567',
  'proposal-romantic', 'Proposal Romantic',
  'A cinematic 15-screen interactive proposal experience',
  'A fully interactive 15-screen cinematic marriage proposal with runaway NO button, 3 gift boxes, photo gallery, and grand finale.',
  (select id from public.categories where slug = 'proposal' limit 1),
  array['proposal','marriage','interactive','cinematic','will-you-be-mine','gifts','quiz','letter','gallery','confetti','music'],
  '/templates/proposal-romantic/gif/1.gif', 2999, true, true, true, 80
)
on conflict (id) do update set
  plugin_id=excluded.plugin_id, slug=excluded.slug, name=excluded.name,
  tagline=excluded.tagline, description=excluded.description, category_id=excluded.category_id,
  tags=excluded.tags, cover_url=excluded.cover_url, price_cents=excluded.price_cents,
  is_premium=excluded.is_premium, is_published=excluded.is_published,
  is_featured=excluded.is_featured, sort_order=excluded.sort_order;
