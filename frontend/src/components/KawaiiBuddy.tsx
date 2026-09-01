import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PixelArt, PixelSprite, KAWAII_CAT, CAT_PALETTE, HEART } from "@/components/PixelSprite";
import { sfx } from "@/lib/sfx";

const LINES = [
  "HI! I'M PIXEL ♥ ANKITA'S CAT",
  "SHE SHIPS CLEAN CODE. I SHED.",
  "SGPA 9.67 — NO CHEAT CODES USED",
  "RECRUITERS GET +100 LUCK HERE",
  "PSST... TRY ↑↑↓↓←→←→ B A",
  "HIRE HER. CATS DON'T LIE.",
];

export default function KawaiiBuddy() {
  const [i, setI] = useState(0);
  const [bursts, setBursts] = useState<number[]>([]);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % LINES.length), 4500);
    return () => clearInterval(t);
  }, []);

  const pet = () => {
    sfx.coin();
    const id = Date.now();
    setBursts((b) => [...b, id]);
    setTimeout(() => setBursts((b) => b.filter((x) => x !== id)), 1100);
  };

  return (
    <div className="fixed bottom-5 left-5 z-[70] hidden flex-col items-start gap-2 md:flex" data-testid="kawaii-buddy">
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="pixel-corners-sm bg-neon-pink p-[2px]"
          data-testid="kawaii-buddy-bubble"
        >
          <div className="pixel-corners-sm bg-void px-3 py-2 font-terminal text-base text-slate-200">{LINES[i]}</div>
        </motion.div>
      </AnimatePresence>

      <button
        data-testid="kawaii-buddy-pet-btn"
        onClick={pet}
        onMouseEnter={() => sfx.blip()}
        aria-label="Pet the pixel cat"
        className="relative cursor-pointer transition-transform duration-150 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-pink-400"
      >
        <PixelArt
          rows={KAWAII_CAT}
          palette={CAT_PALETTE}
          size={5}
          className="animate-float drop-shadow-[0_0_14px_rgba(251,113,133,0.45)]"
        />
        <AnimatePresence>
          {bursts.map((id) => (
            <motion.span
              key={id}
              initial={{ opacity: 1, y: 0, scale: 0.6 }}
              animate={{ opacity: 0, y: -44, scale: 1.15 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2"
            >
              <PixelSprite rows={HEART} size={3} color="#fb7185" />
            </motion.span>
          ))}
        </AnimatePresence>
      </button>
    </div>
  );
}
