import { motion } from "motion/react";
import { combos, skillTrees } from "@/data/portfolio";
import { PixelPanel } from "@/components/PixelPanel";

export default function Skills() {
  return (
    <section id="skills" data-testid="skills-section" className="px-6 py-24 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-terminal text-xl tracking-[0.3em] text-arcade-green">CHAPTER 02</p>
          <h2 className="mt-3 font-arcade text-2xl text-neon-pink drop-shadow-[0_0_12px_rgba(236,72,153,0.7)] sm:text-3xl">
            SKILL TREES &amp; XP STATS
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {skillTrees.map((tree, ti) => (
            <motion.div
              key={tree.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: ti * 0.15 }}
            >
              <PixelPanel color={tree.color} testId={`skill-tree-${ti}`} innerClassName="h-full">
                <div className="flex h-full flex-col p-6">
                  <p className="font-arcade text-xs" style={{ color: tree.color }}>
                    {tree.title}
                  </p>
                  <div className="mt-6 flex flex-1 flex-col gap-6">
                    {tree.skills.map((skill, si) => (
                      <div key={skill.name} data-testid={`skill-${ti}-${si}`}>
                        <div className="flex items-end justify-between gap-2">
                          <p className="font-terminal text-lg leading-tight text-slate-200">{skill.name}</p>
                          <p className="font-arcade text-[9px]" style={{ color: tree.color }}>
                            {skill.xp}%
                          </p>
                        </div>
                        <div className="mt-2 h-4 border-2 border-slate-700 bg-black p-[2px]">
                          <motion.div
                            className="relative h-full"
                            style={{ backgroundColor: tree.color }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.xp}%` }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 1, delay: 0.2 + si * 0.12, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <span
                              className="absolute inset-0"
                              style={{
                                backgroundImage:
                                  "repeating-linear-gradient(90deg, rgba(0,0,0,0.55) 0 2px, transparent 2px 12px)",
                              }}
                            />
                          </motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </PixelPanel>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex flex-wrap gap-4"
          data-testid="combos-row"
        >
          {combos.map((combo) => (
            <span
              key={combo}
              className="pixel-corners-sm border-0 bg-electric-purple/20 px-4 py-2.5 font-terminal text-lg text-electric-purple outline-2 outline-electric-purple/60"
            >
              ★ {combo}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
