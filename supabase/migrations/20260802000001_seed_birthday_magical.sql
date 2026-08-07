-- Seed Birthday Magical template
-- UUID: a9b0c1d2-e3f4-5678-9abc-def012345678

insert into public.templates (
  id, plugin_id, slug, name, tagline, description, category_id,
  tags, cover_url, price_cents, is_premium, is_published, is_featured, sort_order
) values (
  'a9b0c1d2-e3f4-5678-9abc-def012345678',
  'a9b0c1d2-e3f4-5678-9abc-def012345678',
  'birthday-magical',
  'Birthday Magical',
  'A 15-chapter cinematic birthday experience unlike anything else',
  'A fully interactive, 15-chapter cinematic birthday gift with 3D WebGL cake, mic-blow candles, constellation, scratch card, gift unboxing, and fireworks finale.',
  (select id from public.categories where slug = 'birthday' limit 1),
  array['birthday','cinematic','interactive','3d','webgl','cake','mic','constellation','scratch','unboxing','letter','balloons','confetti','aurora','premium'],
  '/templates/birthday-magical/images/1.jpeg',
  2999, true, true, true, 70
)
on conflict (id) do update set
  plugin_id = excluded.plugin_id, slug = excluded.slug, name = excluded.name,
  tagline = excluded.tagline, description = excluded.description,
  category_id = excluded.category_id, tags = excluded.tags,
  cover_url = excluded.cover_url, price_cents = excluded.price_cents,
  is_premium = excluded.is_premium, is_published = excluded.is_published,
  is_featured = excluded.is_featured, sort_order = excluded.sort_order;
