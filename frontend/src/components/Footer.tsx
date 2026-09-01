import { profile } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer data-testid="footer" className="border-t-2 border-slate-800 px-6 py-10 text-center">
      <p className="font-arcade text-[10px] text-slate-500">GAME OVER? NO — GAME START.</p>
      <p className="mt-4 font-terminal text-lg text-slate-500">
        © 2026 {profile.name} · BUILT WITH 8-BIT LOVE ·{" "}
        <span className="text-arcade-green">OPEN TO WORK</span> · TRY THE KONAMI CODE: ↑↑↓↓←→←→BA
      </p>
    </footer>
  );
}
