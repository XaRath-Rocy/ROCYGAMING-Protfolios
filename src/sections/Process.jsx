import { useState } from "react";

import useInView from "../hooks/useInView";
import { siteData } from "../config/siteData";

const { projects } = siteData.works;
import SectionLabel from "../components/SectionLabel";
import { useEffect, useRef, useState } from "react";
import { siteData } from "../config/siteData";

const { steps } = siteData.process;

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
            transition: "background 0.8s ease, box-shadow 0.8s ease",
            boxShadow: activeStep > 0 ? "0 0 12px rgba(0, 212, 255, 0.4)" : "none",
          }}
        />
        {steps.map((s, i) => (
          (() => {
            const isCurrent = i === activeStep;
            const isPast = i < activeStep;
            const isFuture = i > activeStep;
            const delay = 0;

            // Current step: full animation
            // Past steps: faded
            // Future steps: hidden
            let opacity = 0;
            let transform = "translateY(40px) scale(0.95)";

            if (isCurrent) {
              opacity = 1;
              transform = "translateY(0) scale(1)";
            } else if (isPast) {
              opacity = 0.4;
              transform = "translateY(0) scale(1)";
            } else if (isFuture) {
              opacity = 0;
              transform = "translateY(60px) scale(0.9)";
            }

            return (
          <div
            key={s.n}
            style={{
              paddingTop: 48,
              opacity: opacity,
              transform: transform,
              transition: `opacity 1.2s ${delay}s cubic-bezier(.25,.46,.45,.94),
                          transform 1.3s ${delay}s cubic-bezier(.25,.46,.45,.94)`,
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
                transform: isCurrent ? "rotate(45deg) scale(1)" : isPast ? "rotate(45deg) scale(1)" : "rotate(0deg) scale(0.6)",
                opacity: isCurrent ? 1 : isPast ? 0.4 : 0,
                boxShadow: isCurrent ? "0 0 10px rgba(224, 155, 54, 0.5)" : "none",
                transition: `transform 1.1s ${delay}s cubic-bezier(.25,.46,.45,.94), 
                            opacity 1.1s ${delay}s cubic-bezier(.25,.46,.45,.94),
                            box-shadow 0.8s ${delay}s ease`,
              }}
            />
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: ".58rem",
                letterSpacing: ".3em",
                color: "var(--ember)",
                marginBottom: 18,
                transform: isCurrent ? "translateY(0)" : isPast ? "translateY(0)" : "translateY(8px)",
                opacity: isCurrent ? 1 : isPast ? 0.4 : 0,
                transition: `transform 1.1s ${delay}s cubic-bezier(.25,.46,.45,.94), 
                            opacity 1.1s ${delay}s cubic-bezier(.25,.46,.45,.94)`,
              }}
            >
              {s.n} —
            </div>
            <div style={{ 
              fontSize: "1.4rem", 
              fontWeight: 300, 
              marginBottom: 14,
              transform: isCurrent ? "translateY(0)" : isPast ? "translateY(0)" : "translateY(6px)",
              opacity: isCurrent ? 1 : isPast ? 0.4 : 0,
              transition: `transform 1.2s ${delay}s cubic-bezier(.25,.46,.45,.94), 
                          opacity 1.2s ${delay}s cubic-bezier(.25,.46,.45,.94)`,
            }}>{s.t}</div>
            <p
              style={{
                fontFamily: "var(--mono)",
                fontSize: ".62rem",
                letterSpacing: ".06em",
                color: "var(--ink2)",
                lineHeight: 2,
                transform: isCurrent ? "translateY(0)" : isPast ? "translateY(0)" : "translateY(8px)",
                opacity: isCurrent ? 0.95 : isPast ? 0.35 : 0,
                transition: `transform 1.3s ${delay}s cubic-bezier(.25,.46,.45,.94), 
                            opacity 1.3s ${delay}s cubic-bezier(.25,.46,.45,.94)`,
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

function ProjectCard({ p, i }) {
  const [hovered, setHovered] = useState(false);
  const [ref, visible] = useInView(0.1);

  return (
    <div
      ref={ref}
      data-hover
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        height: p.large ? 500 : 400,
        overflow: "hidden",
        background: p.color,
        gridColumn: p.large ? "1/-1" : "auto",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(60px)",
        transition: `opacity 1s ${i * 0.12}s,transform 1s ${i * 0.12}s cubic-bezier(.25,.46,.45,.94)`,
      }}
    >
      {/* Decorative SVG */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: hovered ? 0.22 : 0.12,
          transition: "opacity .5s",
        }}
        viewBox="0 0 600 400"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle cx={p.large ? 900 : 480} cy="200" r="280" fill="none" stroke={p.accent} strokeWidth=".6" />
        <circle cx={p.large ? 900 : 480} cy="200" r="180" fill="none" stroke={p.accent} strokeWidth=".6" />
        <circle cx={p.large ? 900 : 480} cy="200" r="100" fill="none" stroke={p.accent} strokeWidth=".6" />
        <line x1="0" y1="200" x2="600" y2="200" stroke={p.accent} strokeWidth=".4" />
        <line x1="300" y1="0" x2="300" y2="400" stroke={p.accent} strokeWidth=".4" />
      </svg>

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 40,
          background: "linear-gradient(to top,rgba(9,8,6,.96) 0%,rgba(9,8,6,.15) 60%,transparent 100%)",
          transform: hovered ? "translateY(0)" : "translateY(12px)",
          transition: "transform .5s ease",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 32,
            right: 40,
            fontFamily: "var(--mono)",
            fontSize: ".58rem",
            letterSpacing: ".3em",
            color: p.accent,
          }}
        >
          {p.num}
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
          {p.tags.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "var(--mono)",
                fontSize: ".52rem",
                letterSpacing: ".18em",
                color: p.accent,
                border: `1px solid ${p.accent}44`,
                padding: "4px 10px",
                textTransform: "uppercase",
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <h3
          style={{
            fontSize: p.large ? "clamp(2rem,4vw,3.5rem)" : "clamp(1.6rem,2.5vw,2.2rem)",
            fontWeight: 300,
            letterSpacing: "-.01em",
            marginBottom: 10,
          }}
        >
          {p.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--mono)",
            fontSize: ".62rem",
            letterSpacing: ".08em",
            color: "var(--ink2)",
            lineHeight: 1.9,
            maxWidth: 500,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(10px)",
            transition: "opacity .4s .1s,transform .4s .1s",
          }}
        >
          {p.desc}
        </p>
      </div>

      {/* Arrow */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          width: 44,
          height: 44,
          border: `1px solid ${p.accent}44`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.1rem",
          color: p.accent,
          opacity: hovered ? 1 : 0,
          background: hovered ? p.accent + "22" : "transparent",
          transition: "all .3s",
        }}
      >
        →
      </div>
    </div>
  );
}

export default function Works() {
  const [ref, visible] = useInView();

  return (
    <section
      id="works"
      className="worksSection"
      style={{ padding: "120px 60px", minHeight: "80vh", position: "relative", zIndex: 1 }}
    >
      <div
        ref={ref}
        className="worksHeader"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 72,
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(40px)",
          transition: "all 1.1s ease",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(3rem,7vw,7rem)",
            fontWeight: 300,
            lineHeight: 1,
            letterSpacing: "-.02em",
          }}
        >
          Selected
          <br />
          <em
            style={{
              fontStyle: "italic",
              color: "var(--neon)",
              filter: "drop-shadow(0 0 15px rgba(0,212,255,.4))",
            }}
          >
            Works
          </em>
        </h2>
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: ".62rem",
            letterSpacing: ".3em",
            color: "var(--ink2)",
            textTransform: "uppercase",
            paddingBottom: 12,
          }}
        >
          04 Projects
        </div>
      </div>
      <div className="worksGrid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        {projects.map((p, i) => (
          <ProjectCard key={p.num} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}
