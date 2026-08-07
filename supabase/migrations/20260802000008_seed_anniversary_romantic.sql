-- Seed Anniversary Romantic
-- UUID: b5c6d7e8-f9a0-1234-bcde-f01234567890
insert into public.templates (id, plugin_id, slug, name, tagline, description, category_id, tags, cover_url, price_cents, is_premium, is_published, is_featured, sort_order)
values (
  'b5c6d7e8-f9a0-1234-bcde-f01234567890', 'b5c6d7e8-f9a0-1234-bcde-f01234567890',
  'anniversary-romantic', 'Anniversary Romantic',
  'A cinematic 7-screen Midnight Romance anniversary experience',
  'A 7-screen luxury anniversary surprise: aurora background, live time counter, 3D photo gallery, flip cards, promise cards, and an envelope typewriter love letter with confetti.',
  (select id from public.categories where slug = 'anniversary' limit 1),
  array['anniversary','romantic','cinematic','flip-cards','gallery','letter','promises','aurora','confetti','dark'],
  '/templates/anniversary-romantic/images/1.jpg',
  1999, true, true, true, 140
)
on conflict (id) do update set
  plugin_id=excluded.plugin_id, slug=excluded.slug, name=excluded.name,
  tagline=excluded.tagline, description=excluded.description, category_id=excluded.category_id,
  tags=excluded.tags, cover_url=excluded.cover_url, price_cents=excluded.price_cents,
  is_premium=excluded.is_premium, is_published=excluded.is_published,
  is_featured=excluded.is_featured, sort_order=excluded.sort_order;
