import React from "react";
import { Img, staticFile } from "remotion";

// The Vektiss logo mark — replaces the placeholder blue dot used in
// HUD bug, hero hooks, the reveal scene, and the close card.
export const VektissMark: React.FC<{
  size?: number;
  style?: React.CSSProperties;
}> = ({ size = 24, style }) => {
  return (
    <Img
      src={staticFile("images/vektiss-mark.png")}
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        display: "block",
        ...style,
      }}
    />
  );
};
