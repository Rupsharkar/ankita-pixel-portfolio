import { motion } from "motion/react";
import { sfx } from "@/lib/sfx";
import { profile } from "@/data/portfolio";
import { PixelSprite, COIN } from "@/components/PixelSprite";

export default function BootScreen({ onStart }: { onStart: () => void }) {
  const handleStart = () => {
    sfx.coin();
    sfx.start();
    onStart();
  };

  return (
    <motion.div
      data-testid="boot-screen"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void px-6"
      exit={{ y: "-100%", transition: { duration: 0.6, ease: [0.83, 0, 0.17, 1] } }}
    >
      <p className="font-terminal text-lg text-slate-500">© 2026 {profile.name} ARCADE CO.</p>

      <h1 className="mt-10 text-center font-arcade text-2xl leading-relaxed text-neon-cyan drop-shadow-[0_0_16px_rgba(6,182,212,0.8)] sm:text-4xl">
        PORTFOLIO.EXE
      </h1>
      <p className="mt-4 font-terminal text-xl tracking-widest text-slate-400 sm:text-2xl">
        MCA QUEST // HCL GUVI EDITION
      </p>

      <div className="mt-14 flex flex-col items-center gap-5">
        <PixelSprite rows={COIN} size={7} color="#eab308" className="animate-float" testId="boot-coin-sprite" />
        <motion.button
          data-testid="press-start-button"
          onClick={handleStart}
          onMouseEnter={() => sfx.blip()}
          animate={{ opacity: [1, 0.35, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="pixel-corners-sm cursor-pointer bg-neon-pink p-[3px] transition-transform duration-150 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <span className="pixel-corners-sm block bg-void px-8 py-4 font-arcade text-sm text-white sm:text-base">
            ▶ PRESS START
          </span>
        </motion.button>
        <p className="font-terminal text-lg text-pixel-yellow">1 CREDIT · INSERT COIN</p>
      </div>

      <p className="absolute bottom-8 px-4 text-center font-terminal text-base text-slate-500 sm:text-lg">
        HAVELOC PROFILE: <span className="text-arcade-green">ACTIVE</span> · HCL GUVI:{" "}
        <span className="text-neon-cyan">LOCKED ON</span>
      </p>
    </motion.div>
  );
}
