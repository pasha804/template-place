-- Seed: Wedding Petals template
INSERT INTO templates (plugin_id, slug, name, tagline, description, category_id, tags, cover_url, price_cents, is_premium, is_published, is_featured, sort_order)
VALUES (
  'f4a5b6c7-d8e9-0123-fabc-345678901234',
  'wedding-petals',
  'Wedding Petals',
  'A copper & blush full-page wedding website with falling petals',
  'A romantic copper and blush wedding website with falling petals, countdown, story, gallery, and WhatsApp RSVP.',
  (SELECT id FROM categories WHERE slug = 'wedding' LIMIT 1),
  ARRAY['wedding','copper','blush','petals','countdown','gallery','rsvp','romantic'],
  '/templates/wedding-petals/hero-couple.jpg',
  2999,
  true,
  true,
  false,
  140
)
ON CONFLICT (slug) DO NOTHING;
