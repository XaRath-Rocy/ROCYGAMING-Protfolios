import { siteData } from "../config/siteData";

export default function Hero() {
  const { hero } = siteData;
  return (
    <section
      id="hero"
      style={{
        height: "100vh",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "clamp(84px, 10vh, 110px) clamp(18px, 6vw, 60px) clamp(64px, 9vh, 90px)",
        position: "relative",
        zIndex: 1,
        overflow: "hidden",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: "clamp(.52rem, 1.05vw, .64rem)",
          letterSpacing: ".35em",
          color: "var(--neon)",
          textTransform: "uppercase",
          marginBottom: 16,
          animation: "fadeUp 1s .3s both",
          filter: "drop-shadow(0 0 6px var(--neon))",
          position: "relative",
          zIndex: 2,
        }}
      >
        {hero.subtitle}
      </div>
      <h1
        className="spaceHeading"
        style={{
          fontSize: "clamp(2.2rem, 8.8vw, 8.2rem)",
          fontWeight: 300,
          lineHeight: 1.02,
          letterSpacing: "-.02em",
          animation: "fadeUp 1.3s .5s both",
          margin: 0,
          maxWidth: "min(1100px, 100%)",
          overflowWrap: "anywhere",
          position: "relative",
          zIndex: 2,
        }}
      >
        {hero.title}
        <br />
        <em
          style={{
            fontStyle: "italic",
            color: "var(--neon)",
            display: "block",
            filter: "drop-shadow(0 0 20px rgba(0,212,255,.5))",
            lineHeight: 1,
            fontSize: "0.92em",
            animation: "neonPulse 2.8s ease-in-out infinite",
          }}
        >
          {hero.titleHighlight}
        </em>
      </h1>
      <p
        style={{
          marginTop: 18,
          fontFamily: "var(--mono)",
          fontSize: "clamp(.66rem, 1.05vw, .84rem)",
          letterSpacing: ".16em",
          color: "var(--ink2)",
          maxWidth: 760,
          lineHeight: 1.6,
          animation: "fadeUp 1.1s .8s both",
          position: "relative",
          zIndex: 2,
        }}
      >
        {hero.body.map((line, i) => (
          <span key={i}>
            {line}
            {i < hero.body.length - 1 && <br />}
          </span>
        ))}
      </p>

      <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", animation: "fadeUp 1.1s .9s both", position: "relative", zIndex: 2 }}>
        {["React", "Three.js", "Vite", "UI Engineering"].map((chip) => (
          <span
            key={chip}
            style={{
              fontFamily: "var(--mono)",
              fontSize: "clamp(.52rem, .95vw, .62rem)",
              letterSpacing: ".16em",
              textTransform: "uppercase",
              color: "var(--ink)",
              border: "1px solid rgba(255,255,255,.14)",
              background: "rgba(2,8,20,.45)",
              padding: "6px 10px",
              borderRadius: 999,
              position: "relative",
              zIndex: 2,
            }}
          >
            {chip}
          </span>
        ))}
      </div>
      {/* Below text (CTA row) */}
      <div
        style={{
          marginTop: 18,
          display: "flex",
          gap: 14,
          flexWrap: "wrap",
          justifyContent: "center",
          animation: "fadeUp 1.1s 1s both",
          position: "relative",
          zIndex: 2,
        }}
      >
        <a
          href={hero.ctaPrimary.href}
          data-hover
          style={{
            fontFamily: "var(--mono)",
            fontSize: ".58rem",
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: "var(--bg)",
            padding: "11px 14px",
            borderRadius: 999,
            background: "linear-gradient(90deg,var(--neon),var(--plasma))",
            boxShadow: "0 0 0 1px rgba(0,212,255,.22)",
          }}
        >
          {hero.ctaPrimary.label}
        </a>
        <a
          href={hero.ctaSecondary.href}
          data-hover
          style={{
            fontFamily: "var(--mono)",
            fontSize: ".58rem",
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: "var(--ink)",
            padding: "11px 14px",
            borderRadius: 999,
            border: "1px solid rgba(200,160,80,.22)",
            background: "linear-gradient(135deg, rgba(9,8,6,.35), rgba(9,8,6,.1))",
            backdropFilter: "blur(10px)",
          }}
        >
          {hero.ctaSecondary.label}
        </a>
      </div>
      {/* Ghost letter */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "clamp(10rem,22vw,24rem)",
          fontWeight: 300,
          fontStyle: "italic",
          color: "rgba(200,160,80,.03)",
          pointerEvents: "none",
          lineHeight: 1,
          zIndex: 0,
        }}
      >
        {hero.ghostLetter}
      </div>
      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(16px, 4vh, 40px)",
          right: "clamp(14px, 3vw, 34px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          animation: "fadeUp 1s 1.5s both",
          pointerEvents: "none",
          zIndex: 1,
          padding: "10px 12px",
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,.08)",
          background: "linear-gradient(180deg, rgba(9,8,6,.55), rgba(9,8,6,.15))",
          backdropFilter: "blur(10px)",
          opacity: 0.75,
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: "clamp(.46rem, .9vw, .56rem)",
            letterSpacing: ".3em",
            color: "var(--ink3)",
            writingMode: "vertical-rl",
            textTransform: "uppercase",
          }}
        >
          {hero.scrollLabel}
        </span>
        <div
          style={{
            width: 1,
            height: 44,
            background: "linear-gradient(to bottom,var(--gold),transparent)",
            animation: "scrollPulse 2s ease-in-out infinite",
          }}
        />
      </div>
      {/* Orbiting ring decoration */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(56px, 7vh, 80px)",
          left: "50%",
          transform: "translateX(-50%)",
          width: 150,
          height: 150,
          opacity: 0.06,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <svg
          viewBox="0 0 200 200"
          style={{ width: "100%", height: "100%", animation: "spin 30s linear infinite" }}
        >
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="var(--gold)"
            strokeWidth=".5"
            strokeDasharray="4 8"
          />
          <circle cx="100" cy="100" r="60" fill="none" stroke="var(--gold)" strokeWidth=".5" />
          <circle cx="100" cy="10" r="4" fill="var(--gold)" />
        </svg>
      </div>
    </section>
  );
}
