import React from "react";
import { BRAND } from "./tokens";

// Vektiss chevron mark — bold solid angular arrow pointing down-right
// with a triangular notch cut from the left interior.
// Matches the uploaded source logo.
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
        d="
          M 18 28
          L 82 18
          Q 86 17.5 85 22
          L 79 40
          L 60 55
          L 65 88
          Q 65.5 92 62 92
          L 54 92
          L 35 60
          L 24 50
          L 18 32
          Z
        "
        fill={color}
      />
    </svg>
  );
};
