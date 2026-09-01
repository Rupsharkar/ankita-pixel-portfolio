import { useMemo, type CSSProperties } from "react";

interface PixelSpriteProps {
  rows: string[];
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
  testId?: string;
}

export const PixelSprite = ({ rows, size = 8, color = "#06b6d4", className = "", style, testId }: PixelSpriteProps) => {
  const shadow = useMemo(() => {
    const parts: string[] = [];
    rows.forEach((row, y) => {
      row.split("").forEach((cell, x) => {
        if (cell !== ".") parts.push(`${x * size}px ${y * size}px 0 0 ${color}`);
      });
    });
    return parts.join(", ");
  }, [rows, size, color]);

  return (
    <div
      data-testid={testId}
      className={className}
      style={{ width: rows[0].length * size, height: rows.length * size, ...style }}
    >
      <div style={{ width: size, height: size, boxShadow: shadow }} />
    </div>
  );
};

export const INVADER = [
  "..X.....X..",
  "...X...X...",
  "..XXXXXXX..",
  ".XX.XXX.XX.",
  "XXXXXXXXXXX",
  "X.XXXXXXX.X",
  "X.X.....X.X",
  "...XX.XX...",
];

interface PixelArtProps {
  rows: string[];
  palette: Record<string, string>;
  size?: number;
  className?: string;
  style?: CSSProperties;
  testId?: string;
}

export const PixelArt = ({ rows, palette, size = 8, className = "", style, testId }: PixelArtProps) => {
  const shadow = useMemo(() => {
    const parts: string[] = [];
    rows.forEach((row, y) => {
      row.split("").forEach((cell, x) => {
        const c = palette[cell];
        if (c) parts.push(`${x * size}px ${y * size}px 0 0 ${c}`);
      });
    });
    return parts.join(", ");
  }, [rows, palette, size]);

  return (
    <div
      data-testid={testId}
      className={className}
      style={{ width: rows[0].length * size, height: rows.length * size, ...style }}
    >
      <div style={{ width: size, height: size, boxShadow: shadow }} />
    </div>
  );
};

export const KAWAII_CAT = [
  ".X.......X.",
  "XiX.....XiX",
  "XXXXXXXXXXX",
  "XXXXXXXXXXX",
  "XXeXXXXXeXX",
  "XXXXXmXXXXX",
  "XbXXmXmXXbX",
  ".XXXXXXXXX.",
  "..XXXXXXX..",
];

export const CAT_PALETTE: Record<string, string> = {
  X: "#f1f5f9",
  i: "#67e8f9",
  e: "#0f172a",
  m: "#0f172a",
  b: "#fb7185",
};

export const HEART = [
  ".XX.XX.",
  "XXXXXXX",
  "XXXXXXX",
  ".XXXXX.",
  "..XXX..",
  "...X...",
];

export const STAR = [
  "...X...",
  "..XXX..",
  "XXXXXXX",
  ".XXXXX.",
  "..X.X..",
  ".X...X.",
];

export const COIN = [
  ".XXXX.",
  "XXXXXX",
  "XX..XX",
  "XX..XX",
  "XXXXXX",
  ".XXXX.",
];
