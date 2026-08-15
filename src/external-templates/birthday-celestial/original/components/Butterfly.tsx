export function Butterfly({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" className={className}>
      <path d="M32 20c-3-8-12-14-20-10-8 4-10 16-4 24 5 7 14 8 22 2-2 6-6 12-12 14-6 2-10 8-6 14 3 5 10 5 16 0 5-4 7-10 4-16 0 0 0-1 0-1s0 1 0 1c-3 6-1 12 4 16 6 5 13 5 16 0 4-6 0-12-6-14-6-2-10-8-12-14 8 6 17 5 22-2 6-8 4-20-4-24-8-4-17 2-20 10z" />
    </svg>
  );
}
