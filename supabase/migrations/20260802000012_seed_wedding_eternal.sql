-- Seed: Wedding Eternal template
INSERT INTO templates (plugin_id, slug, name, tagline, description, category_id, tags, cover_url, price_cents, is_premium, is_published, is_featured, sort_order)
VALUES (
  'e3f4a5b6-c7d8-9012-efab-234567890123',
  'wedding-eternal',
  'Wedding Eternal',
  'A luxury navy & gold full-page wedding website',
  'A cinematic luxury wedding website with countdown, story, gallery, and WhatsApp RSVP.',
  (SELECT id FROM categories WHERE slug = 'wedding' LIMIT 1),
  ARRAY['wedding','luxury','navy','gold','countdown','gallery','rsvp','story'],
  '/templates/wedding-eternal/hero-couple.jpg',
  2999,
  true,
  true,
  true,
  130
)
ON CONFLICT (slug) DO NOTHING;
