-- ============================================================
-- Seed core template categories
-- Uses INSERT ... ON CONFLICT DO NOTHING so re-runs are safe
-- ============================================================

insert into public.categories (id, slug, name, description, icon, accent, sort_order, is_active)
values
  (
    'b1000000-0000-0000-0000-000000000001',
    'birthday',
    'Birthday',
    'Animated birthday surprises, cakes, countdowns, and love letters',
    '🎂',
    '#ec4899',
    10,
    true
  ),
  (
    'b2000000-0000-0000-0000-000000000002',
    'proposal',
    'Proposal',
    'Cinematic marriage proposals, will you be mine experiences',
    '💍',
    '#e11d48',
    20,
    true
  ),
  (
    'b3000000-0000-0000-0000-000000000003',
    'sorry',
    'Sorry',
    'Heartfelt apology sites with music, scratch cards, and confetti',
    '💕',
    '#a855f7',
    30,
    true
  ),
  (
    'b4000000-0000-0000-0000-000000000004',
    'anniversary',
    'Anniversary',
    'Romantic anniversary celebrations and memory journeys',
    '💑',
    '#f59e0b',
    40,
    true
  )
on conflict (slug) do update set
  name        = excluded.name,
  description = excluded.description,
  icon        = excluded.icon,
  accent      = excluded.accent,
  sort_order  = excluded.sort_order,
  is_active   = excluded.is_active;
