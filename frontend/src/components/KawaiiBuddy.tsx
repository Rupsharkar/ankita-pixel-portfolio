import { useEffect, useRef, useState } from "react";
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
  const [cheer, setCheer] = useState<string | null>(null);
  const [bursts, setBursts] = useState<number[]>([]);
  const cheerTimer = useRef<number | undefined>(undefined);

  const burst = (n = 1) => {
    for (let k = 0; k < n; k++) {
      setTimeout(() => {
        const id = Date.now() + k;
        setBursts((b) => [...b, id]);
        setTimeout(() => setBursts((b) => b.filter((x) => x !== id)), 1100);
      }, k * 180);
    }
  };

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % LINES.length), 4500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onCheer = (e: Event) => {
      const msg = (e as CustomEvent<string>).detail;
      setCheer(msg);
      burst(3);
      window.clearTimeout(cheerTimer.current);
      cheerTimer.current = window.setTimeout(() => setCheer(null), 6000);
    };
    window.addEventListener("pixel-cheer", onCheer);
    return () => {
      window.removeEventListener("pixel-cheer", onCheer);
      window.clearTimeout(cheerTimer.current);
    };
  }, []);

  const pet = () => {
    sfx.coin();
    burst(1);
  };

  return (
    <div className="fixed bottom-4 left-4 z-[70] flex flex-col items-start gap-2" data-testid="kawaii-buddy">
      <AnimatePresence mode="wait">
        <motion.div
          key={cheer ?? `line-${i}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className={`pixel-corners-sm p-[2px] ${cheer ? "bg-arcade-green" : "bg-neon-pink"}`}
          data-testid="kawaii-buddy-bubble"
        >
          <div className="pixel-corners-sm max-w-[72vw] bg-void px-3 py-2 font-terminal text-base text-slate-200 sm:max-w-xs">
            {cheer ?? LINES[i]}
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        data-testid="kawaii-buddy-pet-btn"
        onClick={pet}
        onMouseEnter={() => sfx.blip()}
        aria-label="Pet the pixel cat"
        className="relative cursor-pointer transition-transform duration-150 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-pink-400"
      >
        <motion.div
          key={cheer ? "cheering" : "calm"}
          animate={cheer ? { y: [0, -16, 0, -10, 0, -6, 0] } : { y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          <PixelArt
            rows={KAWAII_CAT}
            palette={CAT_PALETTE}
            size={5}
            className="animate-float drop-shadow-[0_0_14px_rgba(251,113,133,0.45)]"
          />
        </motion.div>
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
