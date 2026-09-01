import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { getSfxEnabled, setSfxEnabled, sfx } from "@/lib/sfx";
import { scrollToId } from "@/lib/scroll";
import { profile } from "@/data/portfolio";

const LINKS = [
  { id: "about", label: "ABOUT" },
  { id: "skills", label: "SKILLS" },
  { id: "quests", label: "QUESTS" },
  { id: "contact", label: "CONTACT" },
];

export default function Navbar() {
  const [soundOn, setSoundOn] = useState(getSfxEnabled());

  const toggleSound = () => {
    const next = !soundOn;
    setSfxEnabled(next);
    setSoundOn(next);
    if (next) sfx.blip();
  };

  return (
    <header
      data-testid="navbar"
      className="fixed inset-x-0 top-0 z-[80] border-b-2 border-slate-800 bg-void/85 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8">
        <button
          data-testid="nav-logo-btn"
          onClick={() => scrollToId("hero-section")}
          className="flex cursor-pointer items-center gap-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <span className="h-2.5 w-2.5 animate-blink bg-arcade-green" />
          <span className="font-arcade text-xs text-neon-cyan sm:text-sm">{profile.handle}</span>
        </button>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              data-testid={`nav-link-${l.id}`}
              onClick={() => {
                sfx.blip();
                scrollToId(l.id);
              }}
              className="cursor-pointer font-terminal text-xl tracking-widest text-slate-400 transition-colors duration-150 hover:text-neon-cyan focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden font-terminal text-lg text-arcade-green sm:block">GUVI STATUS: ONLINE</span>
          <button
            data-testid="sound-toggle-btn"
            onClick={toggleSound}
            aria-label="Toggle sound effects"
            className="cursor-pointer border-2 border-slate-700 bg-panel p-2 text-slate-300 transition-colors duration-150 hover:border-neon-cyan hover:text-neon-cyan focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
