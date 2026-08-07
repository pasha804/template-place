-- Seed Sorry Teddy (template4)
-- UUID: e5f6a7b8-c9d0-1234-efab-567890123456
insert into public.templates (id, plugin_id, slug, name, tagline, description, category_id, tags, cover_url, price_cents, is_premium, is_published, is_featured, sort_order)
values (
  'e5f6a7b8-c9d0-1234-efab-567890123456', 'e5f6a7b8-c9d0-1234-efab-567890123456',
  'sorry-teddy', 'Sorry Teddy',
  'A 6-page teddy bear apology with diary, letter, hug & gift',
  'A warm heartfelt apology site with starry night background and adorable teddy bear GIFs across 6 pages: Opening, Diary, Apology, Love Letter, Hug, and Gift reveal.',
  (select id from public.categories where slug = 'sorry' limit 1),
  array['sorry','apology','teddy','bear','cute','diary','letter','hug','gift','starry'],
  '/templates/sorry-teddy/gifs/sad-teddy.gif', 999, false, true, false, 130
)
on conflict (id) do update set
  plugin_id=excluded.plugin_id, slug=excluded.slug, name=excluded.name,
  tagline=excluded.tagline, description=excluded.description, category_id=excluded.category_id,
  tags=excluded.tags, cover_url=excluded.cover_url, price_cents=excluded.price_cents,
  is_premium=excluded.is_premium, is_published=excluded.is_published,
  is_featured=excluded.is_featured, sort_order=excluded.sort_order;
