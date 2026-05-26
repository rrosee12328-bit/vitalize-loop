import React from "react";
import { BRAND } from "./brand";
import { FONT_SANS } from "../fonts";

// Vektiss logo bug — top right corner. Per spec, visible from 0:31 onward.
// Not used in POC (scenes 1-5 end at 0:21.8), but provided for full build.
export const LogoBug: React.FC = () => (
  <div
    style={{
      position: "absolute",
      top: 24,
      right: 28,
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontFamily: FONT_SANS,
      fontWeight: 700,
      fontSize: 16,
      letterSpacing: "0.04em",
      color: BRAND.white,
      zIndex: 50,
    }}
  >
    <div style={{ width: 10, height: 10, borderRadius: 999, background: BRAND.blue, boxShadow: `0 0 10px ${BRAND.blue}` }} />
    VEKTISS
  </div>
);
