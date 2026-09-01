import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";
import { trackVisit, type VisitStats } from "@/lib/visitors";

export default function Footer() {
  const [stats, setStats] = useState<VisitStats | null>(null);

  useEffect(() => {
    trackVisit().then(setStats).catch(() => {});
  }, []);

  return (
    <footer data-testid="footer" className="border-t-2 border-slate-800 px-6 py-10 text-center">
      <p className="font-arcade text-[10px] text-slate-500">GAME OVER? NO — GAME START.</p>
      {stats && (
        <p data-testid="footer-player-count" className="mt-4 font-terminal text-lg text-neon-cyan">
          PLAYER COUNT: {String(stats.total).padStart(6, "0")} · {stats.online} EXPLORING RIGHT NOW
        </p>
      )}
      <p className="mt-4 font-terminal text-lg text-slate-500">
        © 2026 {profile.name} · BUILT WITH 8-BIT LOVE ·{" "}
        <span className="text-arcade-green">OPEN TO WORK</span> · TRY THE KONAMI CODE: ↑↑↓↓←→←→BA
      </p>
    </footer>
  );
}
