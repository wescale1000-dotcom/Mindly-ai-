export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Top-Left: Sky Blue Square */}
      <rect x="6" y="6" width="16" height="16" rx="4" fill="#0EA5E9" />
      {/* Top-Right: Amber Circle */}
      <circle cx="34" cy="14" r="8" fill="#F59E0B" />
      {/* Bottom-Left: Pink Triangle */}
      <path d="M6 42 L22 42 L22 26 Z" fill="#EC4899" />
    </svg>
  );
}
