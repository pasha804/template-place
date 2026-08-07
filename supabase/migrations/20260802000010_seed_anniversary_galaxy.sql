-- Seed: Anniversary Galaxy template
INSERT INTO templates (plugin_id, slug, name, tagline, description, category_id, tags, cover_url, price_cents, is_premium, is_published, is_featured, sort_order)
VALUES (
  'c1d2e3f4-a5b6-7890-cdef-012345678901',
  'anniversary-galaxy',
  'Anniversary Galaxy',
  'A cinematic 11-chapter galaxy anniversary love story',
  'An interactive galaxy-themed anniversary experience with 11 chapters including timeline, memories gallery, love letter, candle blowing, envelope reveal, gift surprise and song player.',
  (SELECT id FROM categories WHERE slug = 'anniversary' LIMIT 1),
  ARRAY['anniversary','galaxy','cinematic','love-letter','memories','interactive','dark','aurora'],
  '/templates/anniversary-galaxy/couple-galaxy.webp',
  1999,
  true,
  true,
  false,
  110
)
ON CONFLICT (slug) DO NOTHING;
