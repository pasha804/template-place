export function Heart({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className}>
      <path d="M16 28C16 28 3 20 3 11C3 6.5 6.5 3 11 3C13.8 3 15.3 4.5 16 5.8C16.7 4.5 18.2 3 21 3C25.5 3 29 6.5 29 11C29 20 16 28 16 28Z" />
    </svg>
  );
}
