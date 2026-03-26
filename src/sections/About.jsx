import { useEffect, useMemo, useState } from "react";
import SectionLabel from "../components/SectionLabel";
import useInView from "../hooks/useInView";
import { siteData } from "../config/siteData";
import pfp from "../assets/pfp.png";

export default function About() {
  const [ref, visible] = useInView();
  const [statsRef, statsVisible] = useInView(0.35);
  const { about } = siteData;
  const stats = about.stats;

  const statMeta = useMemo(() => {
    return stats.map(([raw]) => {
      const text = String(raw);
      const hasPlus = text.includes("+");
      const digits = text.replace(/[^0-9]/g, "");
      if (!digits) {
        return { kind: "static", raw: text };
      }
      const target = Number.parseInt(digits, 10);
      const padTo = digits.length;
      return { kind: "count", target, hasPlus, padTo };
    });
  }, [stats]);

  const [counts, setCounts] = useState(() => statMeta.map((m) => (m.kind === "count" ? 0 : null)));

  useEffect(() => {
    if (!statsVisible) return;
    if (statMeta.every((m) => m.kind !== "count")) return;

    let raf = 0;
    const start = performance.now();
    const duration = 900;

    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCounts(
        statMeta.map((m) => {
          if (m.kind !== "count") return null;
          return Math.round(m.target * eased);
        })
      );
      if (t >= 1) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [statMeta, statsVisible]);

  const formatStat = (index) => {
    const meta = statMeta[index];
    if (!meta) return "";
    if (meta.kind === "static") return meta.raw;
    const v = counts[index] ?? 0;
    const padded = String(v).padStart(meta.padTo, "0");
    return `${padded}${meta.hasPlus ? "+" : ""}`;
  };

  return (
    <section
      id="about"
      className="aboutSection"
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 0,
        padding: "120px 60px",
        alignItems: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        ref={ref}
        className="aboutContent"
        style={{
          paddingRight: 80,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(50px)",
          transition: "all 1.2s cubic-bezier(.25,.46,.45,.94)",
        }}
      >
        <SectionLabel>{about.label}</SectionLabel>
        <h2
          className="spaceHeading"
          style={{
            fontSize: "clamp(2.5rem,5vw,4.5rem)",
            fontWeight: 300,
            lineHeight: 1.08,
            letterSpacing: "-.01em",
            marginBottom: 28,
          }}
        >
          {about.heading[0]}
          <br />
          <em style={{ fontStyle: "italic", color: "var(--neon)" }}>{about.heading[1]}</em>
          <br />
          {about.heading[2]}
        </h2>
        <p
          style={{
            fontSize: "1.08rem",
            fontWeight: 300,
            lineHeight: 2.1,
            color: "var(--ink2)",
            marginBottom: 48,
            maxWidth: 480,
          }}
        >
          {about.bio}
        </p>
        <div
          ref={statsRef}
          className="aboutStats"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}
        >
          {stats.map(([n, l], i) => (
            <div
              key={l}
              style={{
                opacity: statsVisible ? 1 : 0,
                transform: statsVisible ? "translateY(0)" : "translateY(10px)",
                transition: `opacity .7s ease ${120 + i * 90}ms, transform .7s ease ${120 + i * 90}ms`,
              }}
            >
              <div
                style={{
                  fontSize: "2.8rem",
                  fontWeight: 300,
                  color: "var(--neon)",
                  fontStyle: "italic",
                  lineHeight: 1,
                  filter: "drop-shadow(0 0 10px rgba(0,212,255,.4))",
                }}
              >
                {statMeta[i]?.kind === "count" ? formatStat(i) : n}
              </div>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: ".58rem",
                  letterSpacing: ".2em",
                  color: "var(--ink2)",
                  textTransform: "uppercase",
                  marginTop: 6,
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Decorative frame */}
      <div
        className="aboutFrameWrap"
        style={{ position: "relative", height: 560, display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div className="aboutFrame" style={{ width: 360, height: 460, position: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg,var(--bg3),var(--bg2))",
              border: "1px solid rgba(200,160,80,.2)",
              overflow: "hidden",
            }}
          />
          <img
            src={pfp}
            alt="Profile"
            loading="lazy"
            style={{
              position: "absolute",
              inset: 14,
              width: "calc(100% - 28px)",
              height: "calc(100% - 28px)",
              objectFit: "cover",
              opacity: 0.82,
              filter: "saturate(.95) contrast(1.02)",
              border: "1px solid rgba(255,255,255,.06)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "8rem",
              fontWeight: 300,
              fontStyle: "italic",
              color: "rgba(200,160,80,.1)",
              pointerEvents: "none",
            }}
          >
            {about.frame.initials}
          </div>
          <div
            style={{
              position: "absolute",
              width: 180,
              height: 180,
              border: "1px solid rgba(200,160,80,.12)",
              bottom: -28,
              right: -28,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 40,
              right: -16,
              fontFamily: "var(--mono)",
              fontSize: ".55rem",
              letterSpacing: ".2em",
              color: "var(--ember)",
              writingMode: "vertical-rl",
              textTransform: "uppercase",
            }}
          >
            {about.frame.role}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 40,
              left: -16,
              fontFamily: "var(--mono)",
              fontSize: ".55rem",
              letterSpacing: ".2em",
              color: "var(--ember)",
              writingMode: "vertical-rl",
              textTransform: "uppercase",
            }}
          >
            {about.frame.location}
          </div>
          {/* animated dots */}
          {[{ top: "20%", left: "10%" }, { top: "60%", right: "8%" }, { bottom: "25%", left: "20%" }].map((s, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                ...s,
                width: 6,
                height: 6,
                background: "var(--gold)",
                borderRadius: "50%",
                opacity: 0.5,
                animation: `float ${2 + i * 0.6}s ease-in-out ${i * 0.4}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
