import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { BRAND } from "./tokens";
import { Chevron } from "./Chevron";
import { SectionTag } from "./Scene3Intelligence";

// 300 frames — Sites: desktop browser assembles, mobile slides in
export const Scene5Sites: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const desktopAppear = spring({ frame: frame - 8, fps, config: { damping: 18, stiffness: 90 } });
  const heroLoad = interpolate(frame, [30, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const gridLoad = interpolate(frame, [70, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const priceLoad = interpolate(frame, [110, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const mobileStart = 160;
  const mobileAppear = spring({ frame: frame - mobileStart, fps, config: { damping: 20, stiffness: 100 } });

  // gentle 3D tilt after assembly
  const tilt = interpolate(frame, [180, 280], [0, 8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.bg }}>
      <BgGrid />
      <SectionTag num="03" label="SITES" />

      {/* Desktop browser */}
      <div style={{
        position: "absolute", left: 140, top: 150,
        width: 1180, height: 760,
        opacity: desktopAppear,
        transform: `perspective(2400px) rotateY(-${tilt}deg) rotateX(${tilt / 4}deg) scale(${0.92 + desktopAppear * 0.08})`,
        transformOrigin: "center center",
      }}>
        <BrowserFrame>
          {/* Hero */}
          <div style={{
            padding: "60px 50px 40px", opacity: heroLoad,
            transform: `translateY(${(1 - heroLoad) * 20}px)`,
          }}>
            <div style={{
              fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 52,
              color: "#fff", lineHeight: 1.05, letterSpacing: -0.5, maxWidth: 850,
            }}>
              Your Business Answers<br />Every Call.
            </div>
            <div style={{
              marginTop: 30, display: "inline-block",
              background: BRAND.blue, color: "#fff",
              padding: "16px 32px", borderRadius: 8,
              fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 16, letterSpacing: 1,
              boxShadow: `0 0 30px ${BRAND.blue}99`,
            }}>
              Get Started →
            </div>
          </div>

          {/* Service grid */}
          <div style={{
            padding: "10px 50px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16,
            opacity: gridLoad, transform: `translateY(${(1 - gridLoad) * 20}px)`,
          }}>
            {[
              { name: "Voice", desc: "AI receptionist on duty 24/7." },
              { name: "Sites", desc: "Premium sites that convert." },
              { name: "Media", desc: "Content built to scale." },
            ].map((s) => (
              <div key={s.name} style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${BRAND.blueSoft}`, borderRadius: 10,
                padding: 22,
              }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: BRAND.blue, marginBottom: 14, boxShadow: `0 0 14px ${BRAND.blue}` }} />
                <div style={{ fontFamily: "Inter, sans-serif", color: "#fff", fontWeight: 700, fontSize: 20, marginBottom: 6 }}>{s.name}</div>
                <div style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.55)", fontSize: 14 }}>{s.desc}</div>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div style={{
            padding: "20px 50px 40px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16,
            opacity: priceLoad, transform: `translateY(${(1 - priceLoad) * 20}px)`,
          }}>
            {[
              { tier: "STARTER", price: "$499", popular: false },
              { tier: "GROWTH", price: "$1,499", popular: true },
              { tier: "SCALE", price: "$3,999", popular: false },
            ].map((p) => (
              <div key={p.tier} style={{
                background: p.popular ? "rgba(37,99,235,0.12)" : "rgba(255,255,255,0.03)",
                border: p.popular ? `1.5px solid ${BRAND.blue}` : `1px solid ${BRAND.blueSoft}`,
                borderRadius: 10, padding: 22, position: "relative",
                boxShadow: p.popular ? `0 0 30px rgba(37,99,235,0.25)` : "none",
              }}>
                {p.popular && (
                  <div style={{
                    position: "absolute", top: -10, right: 16,
                    background: BRAND.blue, color: "#fff", fontSize: 10, fontWeight: 700,
                    letterSpacing: 2, padding: "4px 10px", borderRadius: 4,
                    fontFamily: "Inter, sans-serif",
                  }}>MOST POPULAR</div>
                )}
                <div style={{ fontFamily: "Inter, sans-serif", color: p.popular ? BRAND.blue : "rgba(255,255,255,0.55)", fontSize: 11, letterSpacing: 3, marginBottom: 10 }}>{p.tier}</div>
                <div style={{ fontFamily: "Inter, sans-serif", color: "#fff", fontWeight: 800, fontSize: 36 }}>{p.price}<span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>/mo</span></div>
              </div>
            ))}
          </div>
        </BrowserFrame>
      </div>

      {/* Mobile frame slides in from right */}
      <div style={{
        position: "absolute",
        right: interpolate(mobileAppear, [0, 1], [-400, 120]),
        top: 240, width: 280, height: 580,
        opacity: mobileAppear,
        transform: `perspective(2400px) rotateY(${tilt}deg) rotateX(${tilt / 4}deg)`,
      }}>
        <div style={{
          width: "100%", height: "100%",
          background: BRAND.bg,
          border: `8px solid #1a2236`, borderRadius: 36,
          boxShadow: `0 30px 60px rgba(0,0,0,0.6), 0 0 40px rgba(37,99,235,0.3)`,
          overflow: "hidden", position: "relative",
        }}>
          <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 90, height: 18, background: "#0a0f1e", borderRadius: 12 }} />
          <div style={{ padding: "60px 22px 0" }}>
            <div style={{ fontFamily: "Inter, sans-serif", color: "#fff", fontWeight: 800, fontSize: 22, lineHeight: 1.1 }}>
              Your Business Answers Every Call.
            </div>
            <div style={{
              marginTop: 18, background: BRAND.blue, color: "#fff",
              padding: "10px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600,
              textAlign: "center", fontFamily: "Inter, sans-serif",
            }}>Get Started →</div>
            <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
              {["Voice", "Sites", "Media"].map((n) => (
                <div key={n} style={{
                  background: "rgba(255,255,255,0.04)", border: `1px solid ${BRAND.blueSoft}`,
                  borderRadius: 8, padding: 12,
                }}>
                  <div style={{ width: 18, height: 18, borderRadius: 4, background: BRAND.blue, marginBottom: 6 }} />
                  <div style={{ fontFamily: "Inter, sans-serif", color: "#fff", fontSize: 13, fontWeight: 600 }}>{n}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const BrowserFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{
    width: "100%", height: "100%",
    background: "#0d1424",
    border: `1px solid ${BRAND.blueSoft}`, borderRadius: 14,
    overflow: "hidden",
    boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(37,99,235,0.2)`,
  }}>
    {/* chrome */}
    <div style={{
      height: 40, background: "#0a0f1e",
      display: "flex", alignItems: "center", gap: 8, padding: "0 16px",
      borderBottom: `1px solid ${BRAND.blueSoft}`,
    }}>
      <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444" }} />
      <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#eab308" }} />
      <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#22c55e" }} />
      <div style={{
        marginLeft: 20, padding: "6px 14px", background: "#141c30",
        borderRadius: 6, color: "#fff", fontSize: 12, fontFamily: "Inter, sans-serif",
        letterSpacing: 1, minWidth: 200,
      }}>
        🔒  vektiss.com
      </div>
    </div>
    {children}
  </div>
);

const BgGrid: React.FC = () => (
  <AbsoluteFill style={{
    backgroundImage:
      `linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px),
       linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)`,
    backgroundSize: "80px 80px",
  }} />
);
