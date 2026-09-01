export default function CRTOverlay() {
  return (
    <div data-testid="crt-overlay" aria-hidden className="pointer-events-none fixed inset-0 z-[90]">
      <div className="absolute inset-0 crt-scanlines" />
      <div className="absolute inset-0 crt-vignette" />
      <div className="absolute inset-0 crt-flicker bg-white/[0.02]" />
    </div>
  );
}
