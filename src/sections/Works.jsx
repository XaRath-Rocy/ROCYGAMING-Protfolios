import { useState } from "react";

import useInView from "../hooks/useInView";

const projects = [
  {
    num: "01",
    title: "Noir Botanicals",
    tags: ["Brand Identity", "Visual System"],
    desc: "Complete brand overhaul for a luxury skincare line — logo, packaging, art direction & campaign visuals.",
    color: "#1a0f08",
    accent: "#c8a050",
    large: true,
  },
  {
    num: "02",
    title: "Epoch Films",
    tags: ["Motion", "3D Art"],
    desc: "Cinematic title sequences and motion graphics for an independent film studio.",
    color: "#080d14",
    accent: "#6eb4d4",
  },
  {
    num: "03",
    title: "Terra Collective",
    tags: ["Art Direction", "Campaign"],
    desc: "Editorial art direction & photography curation for a sustainable fashion collective.",
    color: "#0c100a",
    accent: "#8ac870",
  },
  {
    num: "04",
    title: "Vesper Studio",
    tags: ["Branding", "Strategy"],
    desc: "Full brand strategy & identity design for a boutique creative agency launch.",
    color: "#12080e",
    accent: "#c86eb4",
  },
];

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
