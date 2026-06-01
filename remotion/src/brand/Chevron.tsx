import React from "react";
import { BRAND } from "./tokens";

// Stylized angular chevron-arrow mark matching the brand intro.
export const Chevron: React.FC<{
  size?: number;
  color?: string;
  glow?: boolean;
  strokeWidth?: number;
}> = ({ size = 120, color = BRAND.blue, glow = true, strokeWidth = 14 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ filter: glow ? `drop-shadow(0 0 24px ${color})` : undefined }}
    >
      <polyline
        points="22,20 62,50 22,80"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <polyline
        points="50,20 90,50 50,80"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        strokeLinejoin="miter"
        opacity={0.45}
      />
    </svg>
  );
};
