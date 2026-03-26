import { siteData } from "../config/siteData";

export default function Ticker() {
  const items = siteData.ticker;
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "1px solid rgba(200,160,80,.1)",
        borderBottom: "1px solid rgba(200,160,80,.1)",
        padding: "14px 0",
        background: "var(--bg2)",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 56,
          animation: "tickerMove 22s linear infinite",
          width: "max-content",
          whiteSpace: "nowrap",
        }}
      >
        {doubled.map((t, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--mono)",
              fontSize: ".62rem",
              letterSpacing: ".3em",
              color: "var(--ink2)",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <span style={{ color: "var(--gold)", fontSize: ".45rem" }}>✦</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
