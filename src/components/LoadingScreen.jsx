import { useEffect, useState } from "react";
import { siteData } from "../config/siteData";

export default function LoadingScreen({ progress = 0, isVisible = true }) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const id = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 400);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      role="status"
      aria-label="Loading"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg, #020308)",
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? "visible" : "hidden",
        pointerEvents: isVisible ? "auto" : "none",
        transition: "opacity 0.6s ease, visibility 0.6s ease",
      }}
    >
      {/* Centered text */}
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <h1
          style={{
            fontFamily: "var(--serif, 'Cormorant Garamond', serif)",
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            fontWeight: 300,
            letterSpacing: "-.02em",
            color: "var(--ink, #e8f0ff)",
          }}
        >
          {siteData.brand.name}
        </h1>
        <p
          style={{
            fontFamily: "var(--mono, 'Space Mono', monospace)",
            fontSize: ".62rem",
            letterSpacing: ".3em",
            color: "var(--ink2, #7090c0)",
            textTransform: "uppercase",
          }}
        >
          Loading{dots}
        </p>
      </div>

      {/* Below text: progress bar */}
      <div
        style={{
          marginTop: 48,
          width: "min(280px, 80vw)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: "100%",
            height: 2,
            background: "rgba(200,160,80,.12)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${Math.min(100, progress)}%`,
              background: "linear-gradient(90deg, var(--neon, #00d4ff), var(--ember, #d4532a))",
              transition: "width 0.3s ease",
              borderRadius: 2,
            }}
          />
        </div>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: ".52rem",
            letterSpacing: ".2em",
            color: "var(--ink3, #3a5070)",
          }}
        >
          Entering the void
        </span>
      </div>

      {/* Optional: subtle Three.js-style ring (CSS only) */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 240,
          height: 240,
          border: "1px solid rgba(0,212,255,.08)",
          borderRadius: "50%",
          animation: "spin 20s linear infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 180,
          height: 180,
          border: "1px dashed rgba(200,160,80,.06)",
          borderRadius: "50%",
          animation: "spin 15s linear infinite reverse",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
