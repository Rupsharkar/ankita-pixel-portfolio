import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { PixelPanel } from "@/components/PixelPanel";
import { sfx } from "@/lib/sfx";

const W = 640;
const H = 420;
const ROWS = [
  { label: "C++", color: "#ef4444" },
  { label: "PYTHON", color: "#eab308" },
  { label: "JAVA", color: "#10b981" },
  { label: "SQL", color: "#06b6d4" },
  { label: "DSA", color: "#a855f7" },
];
const COLS = 8;
const PADDLE_W = 96;
const PADDLE_H = 12;
const BALL = 9;

type Phase = "idle" | "playing" | "over" | "win";

interface Brick {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  label: string;
  alive: boolean;
}

interface GameState {
  bricks: Brick[];
  paddleX: number;
  ball: { x: number; y: number; vx: number; vy: number };
  score: number;
  lives: number;
}

const makeBricks = (): Brick[] => {
  const bricks: Brick[] = [];
  const gap = 6;
  const bw = (W - gap * (COLS + 1)) / COLS;
  const bh = 20;
  ROWS.forEach((row, r) => {
    for (let c = 0; c < COLS; c++) {
      bricks.push({
        x: gap + c * (bw + gap),
        y: 48 + r * (bh + gap),
        w: bw,
        h: bh,
        color: row.color,
        label: row.label,
        alive: true,
      });
    }
  });
  return bricks;
};

export default function MiniGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [lastHit, setLastHit] = useState("—");
  const game = useRef<GameState | null>(null);
  const keys = useRef({ left: false, right: false });

  const start = () => {
    game.current = {
      bricks: makeBricks(),
      paddleX: W / 2 - PADDLE_W / 2,
      ball: { x: W / 2, y: H - 60, vx: 3.4, vy: -3.4 },
      score: 0,
      lives: 3,
    };
    setScore(0);
    setLives(3);
    setLastHit("—");
    sfx.start();
    setPhase("playing");
  };

  useEffect(() => {
    if (phase !== "playing") return;
    const onDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") (keys.current.left = true), e.preventDefault();
      if (e.key === "ArrowRight") (keys.current.right = true), e.preventDefault();
    };
    const onUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") keys.current.left = false;
      if (e.key === "ArrowRight") keys.current.right = false;
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "playing") return;
    const canvas = canvasRef.current;
    const g = game.current;
    if (!canvas || !g) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;

    const step = () => {
      if (keys.current.left) g.paddleX -= 8;
      if (keys.current.right) g.paddleX += 8;
      g.paddleX = Math.max(0, Math.min(W - PADDLE_W, g.paddleX));

      const b = g.ball;
      b.x += b.vx;
      b.y += b.vy;
      if (b.x <= 0 || b.x + BALL >= W) b.vx *= -1;
      if (b.y <= 0) b.vy *= -1;

      const py = H - 28;
      if (b.vy > 0 && b.y + BALL >= py && b.y + BALL <= py + PADDLE_H + 6 && b.x + BALL >= g.paddleX && b.x <= g.paddleX + PADDLE_W) {
        b.vy = -Math.abs(b.vy);
        const hitPos = (b.x + BALL / 2 - g.paddleX) / PADDLE_W - 0.5;
        b.vx = hitPos * 8;
        sfx.blip();
      }

      for (const brick of g.bricks) {
        if (!brick.alive) continue;
        if (b.x + BALL > brick.x && b.x < brick.x + brick.w && b.y + BALL > brick.y && b.y < brick.y + brick.h) {
          brick.alive = false;
          b.vy *= -1;
          g.score += 100;
          setScore(g.score);
          setLastHit(brick.label);
          sfx.coin();
          break;
        }
      }

      if (g.bricks.every((br) => !br.alive)) {
        sfx.powerup();
        window.dispatchEvent(new CustomEvent("pixel-cheer", { detail: "STAGE CLEAR!! SHE'S HIRE-READY ★" }));
        setPhase("win");
        return;
      }

      if (b.y > H) {
        g.lives -= 1;
        setLives(g.lives);
        sfx.hit();
        if (g.lives <= 0) {
          window.dispatchEvent(new CustomEvent("pixel-cheer", { detail: "OUCH! INSERT COIN — TRY AGAIN!" }));
          setPhase("over");
          return;
        }
        g.ball = { x: g.paddleX + PADDLE_W / 2, y: H - 70, vx: 3.4 * (Math.random() > 0.5 ? 1 : -1), vy: -3.4 };
      }

      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, W, H);
      for (const brick of g.bricks) {
        if (!brick.alive) continue;
        ctx.fillStyle = brick.color;
        ctx.fillRect(brick.x, brick.y, brick.w, brick.h);
        ctx.fillStyle = "rgba(0,0,0,0.35)";
        ctx.fillRect(brick.x, brick.y + brick.h - 4, brick.w, 4);
      }
      ctx.fillStyle = "#06b6d4";
      ctx.fillRect(g.paddleX, py, PADDLE_W, PADDLE_H);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(Math.round(g.ball.x), Math.round(g.ball.y), BALL, BALL);

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const movePaddle = (clientX: number) => {
    const canvas = canvasRef.current;
    const g = game.current;
    if (!canvas || !g) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * W;
    g.paddleX = Math.max(0, Math.min(W - PADDLE_W, x - PADDLE_W / 2));
  };

  return (
    <section id="minigame" data-testid="minigame-section" className="px-6 py-24 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-terminal text-xl tracking-[0.3em] text-arcade-green">BONUS STAGE</p>
          <h2 className="mt-3 font-arcade text-2xl text-neon-pink drop-shadow-[0_0_12px_rgba(236,72,153,0.7)] sm:text-3xl">
            BREAKOUT.EXE — SMASH THE SKILL STACK
          </h2>
          <p className="mt-4 font-terminal text-xl text-slate-400">
            EVERY BRICK IS A SKILL FROM THE RESUME. MOUSE OR ← → TO MOVE. CLEAR THE STACK, THEN HIRE THE PLAYER.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10"
        >
          <PixelPanel color="#10b981" testId="minigame-panel">
            <div className="p-4 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 px-1 pb-4 font-arcade text-[10px]">
                <span className="text-neon-cyan" data-testid="minigame-score">SCORE: {String(score).padStart(6, "0")}</span>
                <span className="text-pixel-yellow" data-testid="minigame-lastclear">LAST CLEAR: {lastHit}</span>
                <span className="text-laser-red" data-testid="minigame-lives">LIVES: {"♥".repeat(Math.max(0, lives))}{"·".repeat(3 - Math.max(0, lives))}</span>
              </div>

              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={W}
                  height={H}
                  data-testid="minigame-canvas"
                  onMouseMove={(e) => movePaddle(e.clientX)}
                  onTouchMove={(e) => movePaddle(e.touches[0].clientX)}
                  className="w-full border-2 border-slate-800 bg-void [image-rendering:pixelated] [touch-action:none]"
                />

                {phase !== "playing" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-black/80">
                    {phase === "over" && (
                      <>
                        <p className="font-arcade text-xl text-laser-red drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]">GAME OVER</p>
                        <p className="font-terminal text-2xl text-slate-300">FINAL SCORE: {score}</p>
                      </>
                    )}
                    {phase === "win" && (
                      <>
                        <p className="font-arcade text-xl text-arcade-green drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]">STAGE CLEAR!</p>
                        <p className="font-terminal text-2xl text-pixel-yellow">ACHIEVEMENT UNLOCKED: HIRE-READY CANDIDATE</p>
                        <p className="font-terminal text-2xl text-slate-300">SCORE: {score} +9999 BONUS XP</p>
                      </>
                    )}
                    <button
                      data-testid="minigame-start-btn"
                      onClick={start}
                      onMouseEnter={() => sfx.blip()}
                      className="pixel-corners-sm cursor-pointer bg-arcade-green p-[3px] transition-transform duration-150 hover:-translate-y-0.5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                    >
                      <span className="pixel-corners-sm block bg-void px-8 py-4 font-arcade text-xs text-arcade-green">
                        {phase === "idle" ? "▶ INSERT COIN TO PLAY" : "▶ PLAY AGAIN"}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </PixelPanel>
        </motion.div>
      </div>
    </section>
  );
}
