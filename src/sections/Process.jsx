import SectionLabel from "../components/SectionLabel";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    n: "01",
    t: "Deep Listening",
    b: "Every project starts with understanding your brand, audience, and the space between where you are and where you want to be.",
  },
  {
    n: "02",
    t: "Finding the Idea",
    b: "From research to concept — the single powerful idea that becomes the spine of everything created.",
  },
  {
    n: "03",
    t: "Making it Real",
    b: "Where craft meets vision. Every pixel, every word, every detail is deliberate. Nothing here is accidental.",
  },
  {
    n: "04",
    t: "Launch & Beyond",
    b: "Delivering work that stands on its own — with systems that scale and results that last.",
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let raf = 0;

    const clamp01 = (v) => Math.min(1, Math.max(0, v));

    const compute = () => {
      raf = 0;
      const node = containerRef.current;
      if (!node) return;

      const vh = window.innerHeight || 1;
      const rect = node.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const bottom = top + rect.height;

      // Progress 0→1 while the grid scrolls through the viewport.
      const start = top - vh * 0.6;
      const end = bottom - vh * 0.4;
      const denom = Math.max(1, end - start);
      const progress = clamp01((window.scrollY - start) / denom);

      const idx = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      setActiveStep((prev) => (prev !== idx ? idx : prev));
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="process"
      className="processSection"
      style={{
        padding: "120px 60px",
        background: "var(--bg2)",
        overflow: "hidden",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 560, marginBottom: 96 }}>
        <SectionLabel>How I Work</SectionLabel>
        <h2 style={{ fontSize: "clamp(2.5rem,5vw,5rem)", fontWeight: 300, lineHeight: 1.1 }}>
          The art of
          <br />
          <em style={{ fontStyle: "italic", color: "var(--neon)" }}>making things</em>
          <br />
          matter.
        </h2>
      </div>
      <div
        ref={containerRef}
        className="processGrid"
        style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 40, position: "relative" }}
      >
        <div
          className="processLine"
          style={{
            position: "absolute",
            top: 18,
            left: 0,
            right: 0,
            height: 1,
            background: "linear-gradient(to right,var(--gold),rgba(200,160,80,.08))",
          }}
        />
        {steps.map((s, i) => (
          (() => {
            const isActive = i <= activeStep;
            const delay = i * 0.15;

            return (
          <div
            key={s.n}
            style={{
              paddingTop: 48,
              opacity: isActive ? 1 : 0.2,
              transform: isActive ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
              transition: `opacity 900ms ${delay}s cubic-bezier(.25,.46,.45,.94),transform 900ms ${delay}s cubic-bezier(.25,.46,.45,.94)`,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 10,
                width: 16,
                height: 16,
                border: "1px solid var(--gold)",
                background: "var(--bg2)",
                transform: isActive ? "rotate(45deg) scale(1)" : "rotate(0deg) scale(0.6)",
                opacity: isActive ? 1 : 0.3,
                transition: `transform 900ms ${delay + 0.1}s cubic-bezier(.25,.46,.45,.94), opacity 900ms ${delay + 0.1}s cubic-bezier(.25,.46,.45,.94)`,
              }}
            />
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: ".58rem",
                letterSpacing: ".3em",
                color: "var(--ember)",
                marginBottom: 18,
                transform: isActive ? "translateY(0)" : "translateY(8px)",
                opacity: isActive ? 1 : 0.2,
                transition: `transform 900ms ${delay + 0.12}s cubic-bezier(.25,.46,.45,.94), opacity 900ms ${delay + 0.12}s cubic-bezier(.25,.46,.45,.94)`,
              }}
            >
              {s.n} —
            </div>
            <div style={{ fontSize: "1.4rem", fontWeight: 300, marginBottom: 14 }}>{s.t}</div>
            <p
              style={{
                fontFamily: "var(--mono)",
                fontSize: ".62rem",
                letterSpacing: ".06em",
                color: "var(--ink2)",
                lineHeight: 2,
              }}
            >
              {s.b}
            </p>
          </div>
            );
          })()
        ))}
      </div>
    </section>
  );
}
