-- Seed: Congratulations Triumph template
INSERT INTO templates (plugin_id, slug, name, tagline, description, category_id, tags, cover_url, price_cents, is_premium, is_published, is_featured, sort_order)
VALUES (
  'd2e3f4a5-b6c7-8901-defa-123456789012',
  'congratulations-triumph',
  'Congratulations Triumph',
  'An 11-chapter cinematic celebration of a hard-earned achievement',
  'A luxury emerald and gold congratulations experience with 11 interactive chapters.',
  (SELECT id FROM categories WHERE slug = 'congratulations' LIMIT 1),
  ARRAY['congratulations','achievement','graduation','cinematic','gold','luxury','celebration'],
  '/templates/congratulations-triumph/hero-achievement.jpg',
  1999,
  true,
  true,
  false,
  120
)
ON CONFLICT (slug) DO NOTHING;
