import { siteData } from "../config/siteData";

export default function Footer() {
  return (
    <footer style={{ padding: "36px 60px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(200,160,80,.1)", position: "relative", zIndex: 1 }}>
      <div style={{ fontFamily: "var(--mono)", fontSize: ".52rem", letterSpacing: ".2em", color: "var(--ink2)" }}>{siteData.footer.copyright}</div>
      <div style={{ fontFamily: "var(--mono)", fontSize: ".52rem", letterSpacing: ".2em", color: "rgba(0,212,255,.3)" }}>{siteData.footer.tagline}</div>
    </footer>
  );
}

