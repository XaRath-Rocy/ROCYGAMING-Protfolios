import SectionLabel from "../components/SectionLabel";
import useInView from "../hooks/useInView";
import { siteData } from "../config/siteData";

const skillGroups = siteData.skills.groups;

function SkillBar({ name, pct, active }) {
  return (
    <div className="skillBarRow" style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <span className="skillBarName" style={{ fontSize: "1rem", fontWeight: 300, width: 180, flexShrink: 0 }}>{name}</span>
      <div style={{ flex: 1, height: 1, background: "rgba(200,160,80,.1)", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, height: 1, background: "linear-gradient(to right,var(--plasma),var(--neon))", width: active ? pct + "%" : "0%", transition: "width 1.6s cubic-bezier(.25,.46,.45,.94)", boxShadow: `0 0 6px var(--neon)` }} />
      </div>
      <span style={{ fontFamily: "var(--mono)", fontSize: ".52rem", letterSpacing: ".1em", color: "var(--ink2)", width: 32, textAlign: "right" }}>{pct}%</span>
    </div>
  );
}

export default function Skills() {
  const [ref, visible] = useInView(0.15);
  const [catRef, catVisible] = useInView(0.1);

  return (
    <section id="skills" className="skillsSection" style={{ padding: "120px 60px", minHeight: "80vh", position: "relative", zIndex: 1 }}>
      <div className="skillsWrap" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>
        <div ref={ref} className="skillsSticky" style={{ position: "sticky", top: 120, opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)", transition: "all 1.1s ease" }}>
          <SectionLabel>{siteData.skills.label}</SectionLabel>
          <h2 style={{ fontSize: "clamp(3rem,5.5vw,5.5rem)", fontWeight: 300, lineHeight: 1, letterSpacing: "-.02em" }}>
            {siteData.skills.heading[0]}<br />
            <em style={{ fontStyle: "italic", color: "var(--neon)", display: "block", filter: "drop-shadow(0 0 12px rgba(0,212,255,.4))" }}>{siteData.skills.heading[1]}</em>
          </h2>
          <p style={{ marginTop: 28, fontFamily: "var(--mono)", fontSize: ".62rem", letterSpacing: ".1em", color: "var(--ink2)", lineHeight: 2.1, maxWidth: 280 }}>{siteData.skills.subtext}</p>
        </div>
        <div ref={catRef}>
          {skillGroups.map((g, gi) => (
            <div key={g.cat} style={{ borderTop: "1px solid rgba(200,160,80,.12)", padding: "36px 0", opacity: catVisible ? 1 : 0, transform: catVisible ? "translateX(0)" : "translateX(40px)", transition: `opacity 1s ${gi * 0.18}s,transform 1s ${gi * 0.18}s ease` }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: ".58rem", letterSpacing: ".38em", color: "var(--ember)", textTransform: "uppercase", marginBottom: 24 }}>{g.cat}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>{g.skills.map(([n, p]) => <SkillBar key={n} name={n} pct={p} active={catVisible} />)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

