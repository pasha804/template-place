-- Seed Sorry Sweet (template1)
-- UUID: c3d4e5f6-a7b8-9012-cdef-345678901234
insert into public.templates (id, plugin_id, slug, name, tagline, description, category_id, tags, cover_url, price_cents, is_premium, is_published, is_featured, sort_order)
values (
  'c3d4e5f6-a7b8-9012-cdef-345678901234', 'c3d4e5f6-a7b8-9012-cdef-345678901234',
  'sorry-sweet', 'Sorry Sweet',
  'A cinematic apology with music, voice note, scratch card & confetti',
  '10-screen emotionally moving apology: background music, love cards, eye carousel, typewriter letter, scratch card, voice note, and confetti forgiveness.',
  (select id from public.categories where slug = 'sorry' limit 1),
  array['sorry','apology','music','voice-note','scratch-card','confetti','cinematic','dark-theme','urdu','romantic'],
  '/templates/sorry-sweet/gifs/1.gif', 1999, true, true, true, 110
)
on conflict (id) do update set
  plugin_id=excluded.plugin_id, slug=excluded.slug, name=excluded.name,
  tagline=excluded.tagline, description=excluded.description, category_id=excluded.category_id,
  tags=excluded.tags, cover_url=excluded.cover_url, price_cents=excluded.price_cents,
  is_premium=excluded.is_premium, is_published=excluded.is_published,
  is_featured=excluded.is_featured, sort_order=excluded.sort_order;
