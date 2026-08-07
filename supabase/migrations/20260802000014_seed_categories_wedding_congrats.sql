-- Add missing categories: wedding and congratulations
INSERT INTO public.categories (id, slug, name, description, icon, accent, sort_order, is_active)
VALUES
  (
    'b5000000-0000-0000-0000-000000000005',
    'wedding',
    'Wedding',
    'Full-page luxury wedding websites with countdown, gallery, story and RSVP',
    '💒',
    '#d4a843',
    50,
    true
  ),
  (
    'b6000000-0000-0000-0000-000000000006',
    'congratulations',
    'Congratulations',
    'Cinematic achievement celebrations, graduation and milestone sites',
    '🏆',
    '#84cc16',
    60,
    true
  )
ON CONFLICT (slug) DO UPDATE SET
  name        = excluded.name,
  description = excluded.description,
  icon        = excluded.icon,
  accent      = excluded.accent,
  sort_order  = excluded.sort_order,
  is_active   = excluded.is_active;
