-- Seed Birthday Bloom template
-- UUID: e5f6a7b8-c9d0-1234-ef01-567890123456

insert into public.templates (
  id, plugin_id, slug, name, tagline, description,
  category_id, tags, cover_url, price_cents, is_premium,
  is_published, is_featured, sort_order
)
select
  'e5f6a7b8-c9d0-1234-ef01-567890123456'::uuid,
  'birthday-bloom',
  'birthday-bloom',
  'Birthday Bloom',
  'A light, soft and sweet 6-screen birthday surprise with a grand finale',
  'A warm, light-themed birthday experience with floating hearts background. Features interactive CSS birthday cake with candle lighting, typewriter message with 3-phase confetti finale, and hug screen.',
  (select id from public.categories where slug = 'birthday' limit 1),
  array['birthday','light-theme','cake','typewriter','confetti','photos','hug','interactive'],
  '/templates/birthday-bloom/images/1.jpg',
  999,
  false,
  true,
  false,
  41
on conflict (id) do update set
  plugin_id    = excluded.plugin_id,
  slug         = excluded.slug,
  name         = excluded.name,
  tagline      = excluded.tagline,
  description  = excluded.description,
  category_id  = excluded.category_id,
  tags         = excluded.tags,
  cover_url    = excluded.cover_url,
  price_cents  = excluded.price_cents,
  is_premium   = excluded.is_premium,
  is_published = excluded.is_published,
  is_featured  = excluded.is_featured,
  sort_order   = excluded.sort_order;
