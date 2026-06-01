import React from "react";
import { Img, staticFile } from "remotion";
import { BRAND } from "./tokens";

// Real Vektiss icon (electric blue chevron-arrow) from official source files
export const Chevron: React.FC<{
  size?: number;
  glow?: boolean;
  color?: string; // accepted for back-compat, unused
}> = ({ size = 120, glow = true }) => {
  return (
    <Img
      src={staticFile("brand/vektiss-icon.png")}
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        filter: glow ? `drop-shadow(0 0 22px ${BRAND.blue})` : undefined,
      }}
    />
  );
};
