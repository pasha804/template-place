-- Seed Birthday Aurora template into the templates table
-- Maps to the external-templates plugin: birthday-aurora
-- UUID: d4e5f6a7-b8c9-0123-def0-456789012345
--
-- NOTE: category_id is a FK to public.categories.
-- We look it up by name 'birthday'; if it doesn't exist we leave it NULL.

insert into public.templates (
  id,
  plugin_id,
  slug,
  name,
  tagline,
  description,
  category_id,
  tags,
  cover_url,
  price_cents,
  is_premium,
  is_published,
  is_featured,
  sort_order
)
select
  'd4e5f6a7-b8c9-0123-def0-456789012345'::uuid,
  'birthday-aurora',
  'birthday-aurora',
  'Birthday Aurora',
  'A cinematic 9-screen aurora birthday journey they''ll never forget',
  'A multi-screen interactive birthday experience wrapped in a beautiful aurora atmosphere. Features a cinematic loader, 5-second countdown, confetti celebration, age reveal with flip-clock digits, animated birthday cake with poppable balloons, coverflow photo gallery with lightbox, GIF vibes love-grid, numbered GIF reel slideshow, expandable wishes wall, and a grand finale typewriter letter in a 3D envelope. Aurora orb backgrounds, particle system, glassmorphism cards, shimmer sweeps, and background music toggle.',
  (select id from public.categories where slug = 'birthday' limit 1),
  array['birthday','aurora','animated','confetti','gallery','letter','wishes','reel','interactive'],
  '/templates/birthday-aurora/images/1.jpg',
  1999,
  true,
  true,
  false,
  40
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
