let ctx: AudioContext | null = null;
let enabled = true;

export const setSfxEnabled = (v: boolean) => {
  enabled = v;
};
export const getSfxEnabled = () => enabled;

const ac = () => {
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
};

const beep = (freq: number, dur: number, type: OscillatorType = "square", delay = 0, vol = 0.06) => {
  if (!enabled) return;
  try {
    const c = ac();
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.value = freq;
    const t = c.currentTime + delay;
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g);
    g.connect(c.destination);
    o.start(t);
    o.stop(t + dur);
  } catch {
    /* audio unavailable */
  }
};

export const sfx = {
  blip: () => beep(520, 0.06),
  coin: () => {
    beep(988, 0.09);
    beep(1319, 0.3, "square", 0.09);
  },
  start: () => [523, 659, 784, 1047].forEach((f, i) => beep(f, 0.1, "square", i * 0.09)),
  powerup: () => [392, 523, 659, 784, 1047, 1319, 1568].forEach((f, i) => beep(f, 0.09, "square", i * 0.07)),
  hit: () => beep(140, 0.18, "sawtooth", 0, 0.09),
};
