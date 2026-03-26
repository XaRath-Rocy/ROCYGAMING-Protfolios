const SectionLabel = ({ children }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 14,
      fontFamily: "var(--mono)",
      fontSize: ".58rem",
      letterSpacing: ".4em",
      color: "var(--neon)",
      textTransform: "uppercase",
      marginBottom: 44,
    }}
  >
    <span
      style={{
        width: 36,
        height: 1,
        background: "var(--neon)",
        display: "block",
        boxShadow: "0 0 8px var(--neon)",
      }}
    />
    {children}
  </div>
);

export default SectionLabel;
