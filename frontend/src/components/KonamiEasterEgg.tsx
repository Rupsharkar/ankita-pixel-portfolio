import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { sfx } from "@/lib/sfx";

const SEQ = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export default function KonamiEasterEgg() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let i = 0;
    const handler = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      i = key === SEQ[i] ? i + 1 : key === SEQ[0] ? 1 : 0;
      if (i === SEQ.length) {
        i = 0;
        sfx.powerup();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          data-testid="konami-modal"
          className="fixed inset-0 z-[96] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/90" onClick={() => setOpen(false)} />
          <motion.div
            initial={{ scale: 0.6, rotate: -3 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="animate-rainbow-border pixel-corners relative border-4 bg-void px-8 py-10 text-center sm:px-14"
          >
            <p className="font-terminal text-xl tracking-[0.3em] text-arcade-green">CHEAT CODE ACCEPTED</p>
            <h3 className="mt-4 font-arcade text-xl text-pixel-yellow drop-shadow-[0_0_14px_rgba(234,179,8,0.8)] sm:text-2xl">
              GOD MODE UNLOCKED
            </h3>
            <p className="mt-6 font-terminal text-2xl text-slate-300">
              SECRET RECRUITER CODE: <span className="text-neon-pink">HIRE-AARAV-2026</span>
            </p>
            <p className="mt-3 font-code text-xs text-slate-500">
              ↑ ↑ ↓ ↓ ← → ← → B A — you found it. This candidate hides easter eggs in production too.
            </p>
            <button
              data-testid="konami-close-btn"
              onClick={() => setOpen(false)}
              className="pixel-corners-sm mt-8 cursor-pointer bg-neon-cyan p-[3px] transition-transform duration-150 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            >
              <span className="pixel-corners-sm block bg-void px-6 py-3 font-arcade text-[10px] text-neon-cyan">
                CONTINUE ▶
              </span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
