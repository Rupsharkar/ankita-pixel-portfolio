import { useMemo } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { toast } from "sonner";
import { Download, Gamepad2 } from "lucide-react";
import { heroLines, hudStats, profile } from "@/data/portfolio";
import { PixelSprite, INVADER } from "@/components/PixelSprite";
import { scrollToId } from "@/lib/scroll";
import { sfx } from "@/lib/sfx";

interface HeroProps {
  booted: boolean;
}

export default function Hero({ booted }: HeroProps) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const farX = useTransform(mx, [-0.5, 0.5], [-14, 14]);
  const farY = useTransform(my, [-0.5, 0.5], [-10, 10]);
  const nearX = useTransform(mx, [-0.5, 0.5], [-34, 34]);
  const nearY = useTransform(my, [-0.5, 0.5], [-24, 24]);

  const stars = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        left: (i * 37 + 13) % 100,
        top: (i * 53 + 29) % 100,
        size: (i % 3) + 1,
        delay: (i % 7) * 0.4,
        near: i % 2 === 0,
      })),
    []
  );

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const handleResume = () => {
    sfx.blip();
    if (profile.resumeUrl === "#") {
      toast.info("RESUME SLOT EMPTY", {
        description: "Drop your PDF link into src/data/portfolio.ts",
      });
    } else {
      window.open(profile.resumeUrl, "_blank");
    }
  };

  return (
    <section
      data-testid="hero-section"
      onMouseMove={onMouseMove}
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 pb-16 sm:px-10 lg:px-20"
    >
      <motion.div style={{ x: farX, y: farY }} className="pointer-events-none absolute inset-0">
        {stars.filter((s) => !s.near).map((s, i) => (
          <motion.span
            key={`far-${i}`}
            className="absolute bg-slate-500"
            style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
            animate={{ opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: s.delay }}
          />
        ))}
      </motion.div>
      <motion.div style={{ x: nearX, y: nearY }} className="pointer-events-none absolute inset-0">
        {stars.filter((s) => s.near).map((s, i) => (
          <motion.span
            key={`near-${i}`}
            className="absolute bg-neon-cyan"
            style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size + 1, height: s.size + 1 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: s.delay }}
          />
        ))}
      </motion.div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1fr_auto]">
        <div>
          {booted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-6 font-terminal text-xl tracking-[0.3em] text-arcade-green"
              data-testid="hero-kicker"
            >
              ▸ PLAYER 1 HAS ENTERED THE GAME
            </motion.p>
          )}

          <h1 className="space-y-4">
            {heroLines.map((line, i) => (
              <span key={line.text} className="block overflow-hidden pb-1">
                <motion.span
                  data-testid={`hero-line-${i}`}
                  className={`block font-arcade text-3xl leading-relaxed sm:text-4xl sm:leading-relaxed lg:text-5xl lg:leading-relaxed ${line.color} ${line.glow}`}
                  initial={{ y: "115%" }}
                  animate={booted ? { y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.22, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={booted ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="mt-8 max-w-xl font-terminal text-xl leading-snug text-slate-300 sm:text-2xl"
            data-testid="hero-subtitle"
          >
            MCA student at <span className="text-neon-cyan">SRM IST</span> (SGPA 9.67) applying to{" "}
            <span className="text-neon-cyan">HCL GUVI</span> via <span className="text-pixel-yellow">Haveloc</span>.
            I turn C++, Python and ML into experiences that feel like games.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={booted ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-10 flex flex-wrap gap-5"
          >
            <button
              data-testid="hero-start-quest-btn"
              onClick={() => {
                sfx.coin();
                scrollToId("quests");
              }}
              onMouseEnter={() => sfx.blip()}
              className="pixel-corners-sm cursor-pointer bg-neon-cyan p-[3px] transition-transform duration-150 hover:-translate-y-0.5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            >
              <span className="pixel-corners-sm flex items-center gap-3 bg-void px-6 py-3.5 font-arcade text-xs text-neon-cyan sm:text-sm">
                <Gamepad2 size={18} /> START QUEST
              </span>
            </button>
            <button
              data-testid="hero-download-resume-btn"
              onClick={handleResume}
              onMouseEnter={() => sfx.blip()}
              className="pixel-corners-sm cursor-pointer bg-pixel-yellow p-[3px] transition-transform duration-150 hover:-translate-y-0.5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              <span className="pixel-corners-sm flex items-center gap-3 bg-void px-6 py-3.5 font-arcade text-xs text-pixel-yellow sm:text-sm">
                <Download size={18} /> RESUME.PDF
              </span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={booted ? { opacity: 1 } : {}}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mt-12 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
            data-testid="hero-hud"
          >
            {hudStats.map((s) => (
              <div key={s.label} className="border-2 border-slate-700 bg-panel/80 px-3 py-2">
                <p className="font-arcade text-[9px] text-slate-500">{s.label}</p>
                <p className="mt-1.5 font-terminal text-base leading-tight text-slate-200">{s.value}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={booted ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="hidden flex-col items-center gap-6 lg:flex"
        >
          <div className="animate-float drop-shadow-[0_0_24px_rgba(6,182,212,0.5)]">
            <PixelSprite rows={INVADER} size={14} color="#06b6d4" testId="hero-invader-sprite" />
          </div>
          <div className="pixel-corners-sm bg-neon-pink p-[3px]">
            <div className="pixel-corners-sm bg-void px-5 py-3 text-center">
              <p className="font-arcade text-xs text-neon-pink">P1</p>
              <p className="mt-1 font-terminal text-sm text-slate-400">READY!</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.p
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-terminal text-lg tracking-widest text-slate-500"
      >
        ▼ SCROLL TO CONTINUE
      </motion.p>
    </section>
  );
}
