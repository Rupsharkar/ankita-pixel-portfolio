import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, GitBranch, X } from "lucide-react";
import { quests, type Quest } from "@/data/portfolio";
import { PixelPanel } from "@/components/PixelPanel";
import { sfx } from "@/lib/sfx";

export default function Quests() {
  const [active, setActive] = useState<Quest | null>(null);

  return (
    <section id="quests" data-testid="quests-section" className="px-6 py-24 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-terminal text-xl tracking-[0.3em] text-arcade-green">CHAPTER 03</p>
          <h2 className="mt-3 font-arcade text-2xl text-neon-pink drop-shadow-[0_0_12px_rgba(236,72,153,0.7)] sm:text-3xl">
            QUEST LOG — MCA PROJECTS
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {quests.map((q, i) => (
            <motion.div
              key={q.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 2) * 0.15 }}
            >
              <PixelPanel
                color={q.color}
                testId={`quest-card-${q.level}`}
                className="transition-transform duration-200 hover:-translate-y-1.5"
                innerClassName="h-full"
              >
                <div className="flex h-full flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-arcade text-[10px] text-slate-400">LEVEL {q.level}</span>
                    <span
                      className="pixel-corners-sm px-3 py-1 font-arcade text-[9px] text-void"
                      style={{ backgroundColor: q.color }}
                    >
                      {q.difficulty}
                    </span>
                  </div>
                  <h3 className="mt-4 font-pixel text-2xl font-semibold text-white">{q.title}</h3>
                  <p className="mt-2 flex-1 font-terminal text-xl leading-snug text-slate-300">{q.tagline}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {q.stack.map((t) => (
                      <span key={t} className="border border-slate-600 px-2 py-0.5 font-code text-[11px] text-slate-400">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="font-arcade text-[10px] text-arcade-green">{q.xp}</span>
                    <button
                      data-testid={`quest-view-btn-${q.level}`}
                      onClick={() => {
                        sfx.coin();
                        setActive(q);
                      }}
                      onMouseEnter={() => sfx.blip()}
                      className="pixel-corners-sm cursor-pointer p-[2px] transition-transform duration-150 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      style={{ backgroundColor: q.color }}
                    >
                      <span className="pixel-corners-sm block bg-void px-4 py-2 font-arcade text-[10px] text-white">
                        VIEW QUEST ▶
                      </span>
                    </button>
                  </div>
                </div>
              </PixelPanel>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            data-testid="quest-modal"
            className="fixed inset-0 z-[95] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/85" onClick={() => setActive(null)} />
            <motion.div
              initial={{ scale: 0.85, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl"
            >
              <PixelPanel color={active.color} testId="quest-modal-panel">
                <div className="p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-arcade text-[10px] text-slate-400">
                        LEVEL {active.level} — <span style={{ color: active.color }}>{active.difficulty}</span>
                      </p>
                      <h3 className="mt-3 font-pixel text-3xl font-semibold text-white">{active.title}</h3>
                    </div>
                    <button
                      data-testid="quest-modal-close-btn"
                      onClick={() => setActive(null)}
                      aria-label="Close quest details"
                      className="cursor-pointer border-2 border-slate-600 p-2 text-slate-300 transition-colors duration-150 hover:border-laser-red hover:text-laser-red focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <p className="mt-5 font-code text-sm leading-relaxed text-slate-300">{active.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {active.stack.map((t) => (
                      <span key={t} className="border border-slate-600 px-2 py-0.5 font-code text-[11px] text-slate-400">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <a
                      data-testid="quest-modal-demo-link"
                      href={active.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 border-2 border-neon-cyan px-4 py-2 font-arcade text-[10px] text-neon-cyan transition-colors duration-150 hover:bg-neon-cyan hover:text-void focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    >
                      <ExternalLink size={14} /> LIVE DEMO
                    </a>
                    <a
                      data-testid="quest-modal-repo-link"
                      href={active.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 border-2 border-slate-500 px-4 py-2 font-arcade text-[10px] text-slate-300 transition-colors duration-150 hover:bg-slate-300 hover:text-void focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    >
                      <GitBranch size={14} /> SOURCE
                    </a>
                    <span className="ml-auto font-arcade text-[10px] text-arcade-green">{active.xp}</span>
                  </div>
                </div>
              </PixelPanel>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
