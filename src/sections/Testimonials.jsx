import { useEffect, useState } from "react";
import SectionLabel from "../components/SectionLabel";
import useInView from "../hooks/useInView";
import { siteData } from "../config/siteData";

const testimonials = siteData.testimonials;

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [ref, visible] = useInView();

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % testimonials.length), 4500);
    return () => clearInterval(t);
  }, []);

  const t = testimonials[active];

  return (
    <section id="testimonials" style={{ padding: "120px 60px", background: "var(--bg2)", position: "relative", zIndex: 1, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, border: "1px solid rgba(200,160,80,.04)", borderRadius: "50%", animation: "pulseRing 6s ease-in-out infinite", pointerEvents: "none" }} />
      <div ref={ref} style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", opacity: visible ? 1 : 0, transition: "opacity 1s ease" }}>
        <SectionLabel style={{ justifyContent: "center" }}>Kind Words</SectionLabel>
        <div style={{ position: "relative", minHeight: 180 }}>
          <div key={active} style={{ animation: "fadeUp .8s ease both" }}>
            <p style={{ fontSize: "clamp(1.4rem,3vw,2.4rem)", fontWeight: 300, fontStyle: "italic", lineHeight: 1.5, color: "var(--ink)", marginBottom: 40, letterSpacing: "-.01em" }}>
              "{t.quote}"
            </p>
            <div style={{ width: 40, height: 1, background: "var(--neon)", margin: "0 auto 20px", boxShadow: "0 0 8px var(--neon)" }} />
            <div style={{ fontFamily: "var(--mono)", fontSize: ".62rem", letterSpacing: ".25em", color: "var(--neon)", textTransform: "uppercase", marginBottom: 6 }}>{t.name}</div>
            <div style={{ fontFamily: "var(--mono)", fontSize: ".55rem", letterSpacing: ".2em", color: "var(--ink2)", textTransform: "uppercase" }}>{t.role}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

