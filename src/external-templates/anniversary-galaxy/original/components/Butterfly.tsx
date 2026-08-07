// @ts-nocheck
export function Butterfly({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <g fill="currentColor">
        <path d="M31 32C24 18 14 12 8 16c-6 4-4 16 4 20 5 2.5 12 1.5 19-4z" opacity="0.9" />
        <path d="M33 32c7-14 17-20 23-16 6 4 4 16-4 20-5 2.5-12 1.5-19-4z" opacity="0.9" />
        <path d="M31 33c-6 12-14 17-20 14-5-3-4-11 2-14 4-2 11-2 18 0z" opacity="0.6" />
        <path d="M33 33c6 12 14 17 20 14 5-3 4-11-2-14-4-2-11-2-18 0z" opacity="0.6" />
        <rect x="30.6" y="20" width="2.8" height="26" rx="1.4" opacity="0.95" />
      </g>
    </svg>
  );
}
