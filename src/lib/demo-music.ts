/**
 * Curated Demo Music Catalog for Greeting Vibes Templates.
 * Provides accessible, categorized, and verified audio tracks located in /public/music/*.mp3
 */

export interface DemoTrack {
  id: string;
  title: string;
  artist: string;
  url: string;
  category: "Birthday" | "Romantic" | "Celebration" | "Wedding" | "Apology" | "Chill";
  duration?: string;
}

export const DEMO_TRACKS: DemoTrack[] = [
  { id: "track-1",  title: "Acoustic Warmth",    artist: "Greeting Vibes", url: "/music/1.mp3",  category: "Birthday" },
  { id: "track-2",  title: "Sweet Serenade",     artist: "Greeting Vibes", url: "/music/2.mp3",  category: "Romantic" },
  { id: "track-3",  title: "Celebration Joy",    artist: "Greeting Vibes", url: "/music/3.mp3",  category: "Celebration" },
  { id: "track-4",  title: "Gentle Piano Glow",  artist: "Greeting Vibes", url: "/music/4.mp3",  category: "Wedding" },
  { id: "track-5",  title: "Heartfelt Melodies", artist: "Greeting Vibes", url: "/music/5.mp3",  category: "Apology" },
  { id: "track-6",  title: "Cosmic Starlight",   artist: "Greeting Vibes", url: "/music/6.mp3",  category: "Birthday" },
  { id: "track-7",  title: "Eternal Vows",       artist: "Greeting Vibes", url: "/music/7.mp3",  category: "Wedding" },
  { id: "track-8",  title: "Rose Petals Waltz",  artist: "Greeting Vibes", url: "/music/8.mp3",  category: "Romantic" },
  { id: "track-9",  title: "Triumph Anthem",     artist: "Greeting Vibes", url: "/music/9.mp3",  category: "Celebration" },
  { id: "track-10", title: "Soft Nostalgia",     artist: "Greeting Vibes", url: "/music/10.mp3", category: "Chill" },
  { id: "track-11", title: "Midnight Whispers",  artist: "Greeting Vibes", url: "/music/11.mp3", category: "Romantic" },
  { id: "track-12", title: "Teddy Hugs Beat",    artist: "Greeting Vibes", url: "/music/12.mp3", category: "Apology" },
  { id: "track-13", title: "Aurora Radiance",    artist: "Greeting Vibes", url: "/music/13.mp3", category: "Birthday" },
  { id: "track-14", title: "Golden Sunshine",    artist: "Greeting Vibes", url: "/music/14.mp3", category: "Birthday" },
  { id: "track-15", title: "Lovers Breeze",      artist: "Greeting Vibes", url: "/music/15.mp3", category: "Romantic" },
  { id: "track-16", title: "Forever & Always",   artist: "Greeting Vibes", url: "/music/16.mp3", category: "Wedding" },
];

export const TEMPLATE_AUDIO_ASSETS: Record<string, string> = {
  "proposal-cook": "/templates/proposal-cook/audio/bg.mp3",
  "proposal-romantic": "/templates/proposal-romantic/audio/bg.mp3",
  "sorry-sweet": "/templates/sorry-sweet/audio/song.mp3",
  "sorry-sweet-voicenote": "/templates/sorry-sweet/audio/voice-note.mp3",
  "sorry-teddy": "/templates/sorry-teddy/audio/bg.mp3",
};

export function getTrackByUrl(url: string | null | undefined): DemoTrack | undefined {
  if (!url) return undefined;
  const clean = url.trim();
  return DEMO_TRACKS.find((t) => t.url === clean);
}

export function getDefaultTrackForCategory(category: string): DemoTrack {
  const cat = category.toLowerCase();
  if (cat.includes("birth")) return DEMO_TRACKS[0]; // Acoustic Warmth
  if (cat.includes("romance") || cat.includes("propos")) return DEMO_TRACKS[1]; // Sweet Serenade
  if (cat.includes("wedd")) return DEMO_TRACKS[3]; // Gentle Piano Glow
  if (cat.includes("sorr") || cat.includes("apol")) return DEMO_TRACKS[4]; // Heartfelt Melodies
  if (cat.includes("congrat") || cat.includes("triump")) return DEMO_TRACKS[8]; // Triumph Anthem
  if (cat.includes("anniv")) return DEMO_TRACKS[10]; // Midnight Whispers
  return DEMO_TRACKS[0];
}
