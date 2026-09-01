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

export const COIN = [
  ".XXXX.",
  "XXXXXX",
  "XX..XX",
  "XX..XX",
  "XXXXXX",
  ".XXXX.",
];
