import React from "react";
import { BRAND } from "./tokens";

// Vektiss chevron mark — bold solid angular arrow pointing down-right
// with notch cut from left interior. Approximates the uploaded logo.
export const Chevron: React.FC<{
  size?: number;
  color?: string;
  glow?: boolean;
}> = ({ size = 120, color = BRAND.blue, glow = true }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ filter: glow ? `drop-shadow(0 0 24px ${color})` : undefined }}
    >
      <path
        d="M 20 28 L 78 16 L 86 30 L 52 54 L 66 90 L 52 94 L 30 58 Z"
        fill={color}
        strokeLinejoin="round"
        stroke={color}
        strokeWidth="3"
      />
    </svg>
  );
};
