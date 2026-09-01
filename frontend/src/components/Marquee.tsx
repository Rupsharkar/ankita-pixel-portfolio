import { marqueeItems } from "@/data/portfolio";

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div data-testid="marquee" className="overflow-hidden border-y-4 border-pixel-yellow bg-black py-4">
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-10 font-arcade text-xs text-pixel-yellow sm:text-sm">
            {item}
            <span className="text-neon-pink">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
