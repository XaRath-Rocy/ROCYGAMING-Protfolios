import SectionLabel from "../components/SectionLabel";
import useInView from "../hooks/useInView";
import { siteData } from "../config/siteData";

export default function Contact() {
  const [ref, visible] = useInView();
  const { contact } = siteData;

  return (
    <section id="contact" style={{ padding: "120px 60px 80px", textAlign: "center", position: "relative", zIndex: 1, overflow: "hidden", minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "absolute", fontSize: "clamp(5rem,18vw,18rem)", fontWeight: 300, fontStyle: "italic", color: "rgba(200,160,80,.025)", whiteSpace: "nowrap", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }}>{contact.heading[0]}</div>
      <div ref={ref} style={{ position: "relative", zIndex: 1, opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(50px)", transition: "all 1.3s cubic-bezier(.25,.46,.45,.94)" }}>
        <SectionLabel>{contact.label}</SectionLabel>
        <h2 style={{ fontSize: "clamp(3rem,8vw,8rem)", fontWeight: 300, lineHeight: 0.95, letterSpacing: "-.02em", marginBottom: 16 }}>
          {contact.heading[0]}<br /><em style={{ fontStyle: "italic", color: "var(--neon)", filter: "drop-shadow(0 0 20px rgba(0,212,255,.5))" }}>{contact.heading[1]}</em><br />{contact.heading[2]}
        </h2>
        <p style={{ fontFamily: "var(--mono)", fontSize: ".64rem", letterSpacing: ".15em", color: "var(--ink2)", margin: "28px auto 52px", lineHeight: 2, maxWidth: 340 }}>
          {contact.subtext[0]}<br />{contact.subtext[1]}
        </p>
        <a href={`mailto:${contact.email}`} data-hover style={{ display: "inline-flex", alignItems: "center", gap: 16, fontSize: "clamp(1.2rem,2.8vw,2.4rem)", fontWeight: 300, fontStyle: "italic", color: "var(--neon)", borderBottom: "1px solid rgba(0,212,255,.4)", paddingBottom: 8, marginBottom: 52, transition: "color .3s,border-color .3s,filter .3s", filter: "drop-shadow(0 0 8px rgba(0,212,255,.4))" }}>{contact.email} ?</a>
        
        {/* social media */}
        <div style={{ display: "flex", gap: 28, justifyContent: "center", flexWrap: "wrap", marginTop: 48 }}>
          {contact.socials.map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              style={{
                fontSize: "0.7rem",
                fontFamily: "var(--mono)",
                letterSpacing: ".1em",
                color: "var(--ink2)",
                textDecoration: "none",
                position: "relative",
                transition: "color .3s, filter .3s",
                paddingBottom: 4,
                borderBottom: "1px solid rgba(0,212,255,0.2)",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "var(--neon)";
                e.target.style.filter = "drop-shadow(0 0 8px rgba(0,212,255,.3))";
                e.target.style.borderBottomColor = "rgba(0,212,255,.6)";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "var(--ink2)";
                e.target.style.filter = "none";
                e.target.style.borderBottomColor = "rgba(0,212,255,0.2)";
              }}
            >
              {social.name}
            </a>
          ))}
        </div>
        
        <div style={{ width: "60px", height: "1px", background: "rgba(0,212,255,.15)", margin: "48px auto", transition: "all .3s" }} />
      </div>
    </section>
  );
}

