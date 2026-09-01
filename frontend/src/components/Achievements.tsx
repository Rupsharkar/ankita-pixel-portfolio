import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { trophies, type Trophy } from "@/data/portfolio";
import { PixelPanel } from "@/components/PixelPanel";
import { PixelSprite, TROPHY } from "@/components/PixelSprite";
import { sfx } from "@/lib/sfx";

function TrophyCard({ t, index }: { t: Trophy; index: number }) {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.12 }}
      onViewportEnter={() => {
        if (!unlocked) {
          setTimeout(() => {
            setUnlocked(true);
            sfx.coin();
          }, 500 + index * 260);
        }
      }}
    >
      <PixelPanel
        color={unlocked ? t.color : "#334155"}
        testId={`trophy-card-${t.id}`}
        className="transition-transform duration-200 hover:-translate-y-1"
        innerClassName="h-full"
      >
        <div className="flex h-full min-h-[190px] flex-col items-center justify-center p-6 text-center">
          <AnimatePresence mode="wait">
            {unlocked ? (
              <motion.div
                key="unlocked"
                initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center"
              >
                <PixelSprite
                  rows={TROPHY}
                  size={5}
                  color={t.color}
                  className="drop-shadow-[0_0_14px_rgba(234,179,8,0.5)]"
                />
                <span
                  className="pixel-corners-sm mt-4 px-3 py-1 font-arcade text-[8px] text-void"
                  style={{ backgroundColor: t.color }}
                >
                  {t.rarity}
                </span>
                <p className="mt-3 font-arcade text-[10px] leading-5 text-white">{t.title}</p>
                <p className="mt-2 font-terminal text-lg leading-tight text-slate-400">{t.desc}</p>
              </motion.div>
            ) : (
              <motion.div key="locked" exit={{ opacity: 0, scale: 0.7 }} className="flex flex-col items-center">
                <p className="font-arcade text-4xl text-slate-600">?</p>
                <p className="mt-4 font-arcade text-[9px] tracking-widest text-slate-600">LOCKED</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </PixelPanel>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <section id="trophies" data-testid="trophies-section" className="px-6 py-24 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-terminal text-xl tracking-[0.3em] text-arcade-green">CHAPTER 04</p>
          <h2 className="mt-3 font-arcade text-2xl text-neon-pink drop-shadow-[0_0_12px_rgba(236,72,153,0.7)] sm:text-3xl">
            TROPHY ROOM — ACHIEVEMENTS
          </h2>
          <p className="mt-4 font-terminal text-xl text-slate-400">
            SCROLL TO UNLOCK. ALL EARNED THE HARD WAY — NO CHEAT CODES.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {trophies.map((t, i) => (
            <TrophyCard key={t.id} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
