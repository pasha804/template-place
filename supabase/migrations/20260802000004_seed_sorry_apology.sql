-- Seed Sorry Apology
-- UUID: b2c3d4e5-f6a7-8901-bcde-f23456789012
insert into public.templates (id, plugin_id, slug, name, tagline, description, category_id, tags, cover_url, price_cents, is_premium, is_published, is_featured, sort_order)
values (
  'b2c3d4e5-f6a7-8901-bcde-f23456789012', 'b2c3d4e5-f6a7-8901-bcde-f23456789012',
  'sorry-apology', 'Sorry Apology',
  'A soft, interactive apology note with a runaway NO button',
  '7-step interactive apology with mood selection, personalized responses, floating hearts, and a runaway NO button.',
  (select id from public.categories where slug = 'sorry' limit 1),
  array['sorry','apology','interactive','mood','glassmorphism','cute','runaway-button','pink'],
  '/templates/sorry-apology/please.gif', 999, false, true, false, 100
)
on conflict (id) do update set
  plugin_id=excluded.plugin_id, slug=excluded.slug, name=excluded.name,
  tagline=excluded.tagline, description=excluded.description, category_id=excluded.category_id,
  tags=excluded.tags, cover_url=excluded.cover_url, price_cents=excluded.price_cents,
  is_premium=excluded.is_premium, is_published=excluded.is_published,
  is_featured=excluded.is_featured, sort_order=excluded.sort_order;
