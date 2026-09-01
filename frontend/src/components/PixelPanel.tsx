import type { ReactNode } from "react";

interface PixelPanelProps {
  color?: string;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
  testId?: string;
}

export const PixelPanel = ({
  color = "#06b6d4",
  className = "",
  innerClassName = "",
  children,
  testId,
}: PixelPanelProps) => (
  <div data-testid={testId} className={`pixel-corners p-[3px] ${className}`} style={{ backgroundColor: color }}>
    <div className={`pixel-corners bg-panel h-full ${innerClassName}`}>{children}</div>
  </div>
);
