import { useState } from "react";
import { motion } from "motion/react";
import { aboutSpecs, characterClasses, missionBrief } from "@/data/portfolio";
import { PixelPanel } from "@/components/PixelPanel";
import { sfx } from "@/lib/sfx";

export default function About() {
  const [activeId, setActiveId] = useState(characterClasses[0].id);
  const active = characterClasses.find((c) => c.id === activeId) ?? characterClasses[0];

  return (
    <section id="about" data-testid="about-section" className="px-6 py-24 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-terminal text-xl tracking-[0.3em] text-arcade-green">CHAPTER 01</p>
          <h2 className="mt-3 font-arcade text-2xl text-neon-pink drop-shadow-[0_0_12px_rgba(236,72,153,0.7)] sm:text-3xl">
            SELECT YOUR CHARACTER
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex flex-col gap-4">
              {characterClasses.map((c) => {
                const isActive = c.id === activeId;
                return (
                  <button
                    key={c.id}
                    data-testid={`class-tab-${c.id}`}
                    onClick={() => {
                      sfx.blip();
                      setActiveId(c.id);
                    }}
                    className={`pixel-corners-sm cursor-pointer p-[3px] text-left transition-transform duration-150 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                      isActive ? "scale-[1.02]" : "opacity-70"
                    }`}
                    style={{ backgroundColor: isActive ? c.color : "#334155" }}
                  >
                    <span className="pixel-corners-sm flex items-center justify-between bg-void px-5 py-4">
                      <span className="font-arcade text-xs sm:text-sm" style={{ color: c.color }}>
                        {c.name}
                      </span>
                      {isActive && <span className="font-terminal text-lg text-white">◀ SELECTED</span>}
                    </span>
                  </button>
                );
              })}
            </div>

            <PixelPanel color={active.color} className="mt-6" testId="class-detail-panel">
              <div className="p-6">
                <p className="font-terminal text-xl text-slate-400">
                  WEAPON: <span className="text-white">{active.weapon}</span>
                </p>
                <p className="mt-1 font-terminal text-xl text-slate-400">
                  SPECIAL MOVE: <span style={{ color: active.color }}>{active.special}</span>
                </p>
                <p className="mt-4 font-code text-sm leading-relaxed text-slate-300">{active.lore}</p>
              </div>
            </PixelPanel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <PixelPanel color="#06b6d4" testId="about-specs-panel">
              <div className="p-6">
                <p className="font-arcade text-[10px] text-neon-cyan">CHARACTER SHEET</p>
                <dl className="mt-5 space-y-3.5">
                  {aboutSpecs.map((s) => (
                    <div key={s.label} className="flex flex-col gap-1 border-b border-slate-800 pb-3 sm:flex-row sm:gap-4">
                      <dt className="w-28 shrink-0 font-arcade text-[9px] leading-5 text-slate-500">{s.label}</dt>
                      <dd className="font-terminal text-lg leading-tight text-slate-200">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </PixelPanel>

            <PixelPanel color="#eab308" testId="mission-brief-panel">
              <div className="p-6">
                <p className="font-arcade text-[10px] text-pixel-yellow">! MISSION BRIEF — DEAR RECRUITER</p>
                <p className="mt-4 font-code text-sm leading-relaxed text-slate-300">{missionBrief}</p>
              </div>
            </PixelPanel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
