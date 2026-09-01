import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Briefcase, GitBranch, Mail, Phone } from "lucide-react";
import { highScores, profile } from "@/data/portfolio";
import { PixelPanel } from "@/components/PixelPanel";
import { PixelSprite, COIN } from "@/components/PixelSprite";
import { apiPost } from "@/lib/api";
import { sfx } from "@/lib/sfx";

const EMPTY = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    try {
      await apiPost("/contact", form);
      sfx.powerup();
      window.dispatchEvent(new CustomEvent("pixel-cheer", { detail: "MESSAGE SENT! ♥ ANKITA WILL REPLY SOON" }));
      toast.success("NEW HIGH SCORE! MESSAGE TRANSMITTED", {
        description: "I'll respawn in your inbox within 24 hours.",
      });
      setForm(EMPTY);
    } catch {
      sfx.hit();
      toast.error("TRANSMISSION FAILED", { description: "The arcade ate your coin. Try again." });
    } finally {
      setSending(false);
    }
  };

  const inputCls =
    "w-full border-2 border-slate-700 bg-black/70 px-4 py-3 font-terminal text-xl text-slate-100 placeholder:text-slate-600 transition-colors duration-150 focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-cyan-400/40";

  return (
    <section id="contact" data-testid="contact-section" className="px-6 py-24 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-terminal text-xl tracking-[0.3em] text-arcade-green">FINAL STAGE</p>
          <h2 className="mt-3 font-arcade text-2xl text-neon-pink drop-shadow-[0_0_12px_rgba(236,72,153,0.7)] sm:text-3xl">
            INSERT COIN TO CONNECT
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <PixelPanel color="#ec4899" testId="contact-form-panel">
              <form onSubmit={submit} className="p-7">
                <div className="flex items-center gap-4">
                  <PixelSprite rows={COIN} size={5} color="#eab308" testId="contact-coin-sprite" />
                  <p className="font-arcade text-xs text-pixel-yellow">SEND A MESSAGE</p>
                </div>

                <label className="mt-7 block">
                  <span className="font-arcade text-[9px] text-slate-500">PLAYER NAME</span>
                  <input
                    data-testid="contact-name-input"
                    required
                    maxLength={120}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="RECRUITER @ DREAM COMPANY"
                    className={`mt-2 ${inputCls}`}
                  />
                </label>
                <label className="mt-5 block">
                  <span className="font-arcade text-[9px] text-slate-500">EMAIL ADDRESS</span>
                  <input
                    data-testid="contact-email-input"
                    required
                    type="email"
                    maxLength={200}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@yourcompany.com"
                    className={`mt-2 ${inputCls}`}
                  />
                </label>
                <label className="mt-5 block">
                  <span className="font-arcade text-[9px] text-slate-500">MESSAGE</span>
                  <textarea
                    data-testid="contact-message-input"
                    required
                    maxLength={2000}
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Let's talk about the role..."
                    className={`mt-2 resize-none ${inputCls}`}
                  />
                </label>

                <button
                  data-testid="contact-submit-btn"
                  type="submit"
                  disabled={sending}
                  onMouseEnter={() => sfx.blip()}
                  className="pixel-corners-sm mt-7 w-full cursor-pointer bg-arcade-green p-[3px] transition-transform duration-150 hover:-translate-y-0.5 hover:scale-[1.01] disabled:cursor-wait disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                >
                  <span className="pixel-corners-sm block bg-void px-6 py-4 font-arcade text-xs text-arcade-green sm:text-sm">
                    {sending ? "TRANSMITTING..." : "▶ TRANSMIT MESSAGE"}
                  </span>
                </button>
              </form>
            </PixelPanel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <PixelPanel color="#eab308" testId="high-scores-panel">
              <div className="p-6">
                <p className="text-center font-arcade text-xs text-pixel-yellow">— HIGH SCORES —</p>
                <div className="mt-6 space-y-4">
                  {highScores.map((h) => (
                    <div key={h.rank} className="flex items-baseline justify-between gap-3 font-terminal text-xl">
                      <span className="text-slate-500">{h.rank}</span>
                      <span className="flex-1 truncate text-slate-300">{h.name}</span>
                      <span className="text-neon-cyan">{h.score}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-center font-terminal text-lg text-slate-500">
                  BEAT THE HIGH SCORE — <span className="animate-blink text-arcade-green">HIRE THIS PLAYER</span>
                </p>
              </div>
            </PixelPanel>

            <div className="flex flex-col gap-4" data-testid="social-links">
              <a
                data-testid="social-github-link"
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => sfx.blip()}
                className="flex items-center gap-4 border-2 border-slate-700 bg-panel px-5 py-4 transition-colors duration-150 hover:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <GitBranch size={20} className="text-neon-cyan" />
                <span className="font-terminal text-xl text-slate-200">GITHUB — SEE THE SOURCE CODE</span>
              </a>
              <a
                data-testid="social-linkedin-link"
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => sfx.blip()}
                className="flex items-center gap-4 border-2 border-slate-700 bg-panel px-5 py-4 transition-colors duration-150 hover:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <Briefcase size={20} className="text-neon-cyan" />
                <span className="font-terminal text-xl text-slate-200">LINKEDIN — FULL PLAYER PROFILE</span>
              </a>
              <a
                data-testid="social-email-link"
                href={`mailto:${profile.email}`}
                onMouseEnter={() => sfx.blip()}
                className="flex items-center gap-4 border-2 border-slate-700 bg-panel px-5 py-4 transition-colors duration-150 hover:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <Mail size={20} className="text-neon-cyan" />
                <span className="font-terminal text-xl text-slate-200">{profile.email.toUpperCase()}</span>
              </a>
              <a
                data-testid="social-phone-link"
                href={profile.phoneHref}
                onMouseEnter={() => sfx.blip()}
                className="flex items-center gap-4 border-2 border-slate-700 bg-panel px-5 py-4 transition-colors duration-150 hover:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <Phone size={20} className="text-neon-cyan" />
                <span className="font-terminal text-xl text-slate-200">{profile.phone} — DIRECT LINE</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
