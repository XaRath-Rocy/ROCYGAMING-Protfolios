const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Space+Mono:ital,wght@0,400;1,400&display=swap');
    *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
    :root {
      --bg:#020308; --bg2:#06080f; --bg3:#0d1020;
      --ink:#e8f0ff; --ink2:#7090c0; --ink3:#3a5070;
      --gold:#c8a050; --ember:#d4532a; --neon:#00d4ff; --plasma:#bf5fff;
      --serif:'Cormorant Garamond',serif; --mono:'Space Mono',monospace;
    }
    html { scroll-behavior:smooth; }
    body { background:var(--bg); color:var(--ink); font-family:var(--serif); overflow-x:hidden; cursor:none; }
    * { cursor:none !important; }
    @media (pointer: coarse) {
      body { cursor:auto; }
      * { cursor:auto !important; }
    }

    /* Readability veil over active 3D background */
    body::before {
      content: "";
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      background:
        radial-gradient(900px 520px at 18% 22%, var(--neon), transparent 60%),
        radial-gradient(900px 520px at 82% 64%, var(--ember), transparent 62%),
        linear-gradient(to bottom, var(--bg), var(--bg2));
      opacity: 0.18;
      mix-blend-mode: multiply;
    }

    /* CSS Parallax Star Background (3 layers) */
    body::after {
      content: "";
      position: fixed;
      inset: -40vh -40vw;
      z-index: -1;
      pointer-events: none;
      opacity: 0.55;
      background-repeat: repeat;
      background-size: 900px 900px, 1200px 1200px, 1600px 1600px;
      background-image:
        radial-gradient(1px 1px at 12% 22%, rgba(232,240,255,0.90) 50%, transparent 52%),
        radial-gradient(1px 1px at 62% 38%, rgba(0,212,255,0.65) 50%, transparent 52%),
        radial-gradient(1px 1px at 88% 72%, rgba(212,83,42,0.55) 50%, transparent 52%),
        radial-gradient(1px 1px at 28% 84%, rgba(232,240,255,0.75) 50%, transparent 52%),
        radial-gradient(1px 1px at 44% 12%, rgba(232,240,255,0.55) 50%, transparent 52%),
        radial-gradient(1px 1px at 76% 56%, rgba(232,240,255,0.65) 50%, transparent 52%),
        radial-gradient(1.6px 1.6px at 18% 18%, rgba(232,240,255,0.55) 50%, transparent 52%),
        radial-gradient(1.6px 1.6px at 54% 64%, rgba(0,212,255,0.35) 50%, transparent 52%),
        radial-gradient(1.6px 1.6px at 82% 32%, rgba(232,240,255,0.40) 50%, transparent 52%),
        radial-gradient(2.2px 2.2px at 26% 46%, rgba(232,240,255,0.32) 50%, transparent 52%),
        radial-gradient(2.2px 2.2px at 74% 78%, rgba(212,83,42,0.22) 50%, transparent 52%),
        radial-gradient(2.2px 2.2px at 92% 14%, rgba(232,240,255,0.26) 50%, transparent 52%);
      animation: starDrift 28s linear infinite;
      transform: translate3d(0, 0, 0);
    }

    @keyframes starDrift {
      0% {
        background-position:
          0 0,
          0 0,
          0 0;
        filter: drop-shadow(0 0 0 rgba(0,212,255,0));
      }
      50% {
        background-position:
          420px 560px,
          -240px 360px,
          120px -280px;
        filter: drop-shadow(0 0 10px rgba(0,212,255,0.10));
      }
      100% {
        background-position:
          840px 1120px,
          -480px 720px,
          240px -560px;
        filter: drop-shadow(0 0 0 rgba(0,212,255,0));
      }
    }

    @media (prefers-reduced-motion: reduce) {
      html { scroll-behavior: auto; }
      body::after { animation: none !important; }
    }
    ::-webkit-scrollbar { width:3px; }
    ::-webkit-scrollbar-track { background:var(--bg); }
    ::-webkit-scrollbar-thumb { background:var(--neon); }
    a { text-decoration:none; color:inherit; }

    /* Typography: premium gradient headings + subtle glow */
    .spaceHeading {
      background: linear-gradient(90deg, var(--ink) 0%, var(--neon) 42%, var(--ember) 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      text-shadow: 0 0 18px rgba(0, 212, 255, 0.12), 0 0 28px rgba(212, 83, 42, 0.08);
    }
    .spaceGlow {
      text-shadow: 0 0 18px rgba(0, 212, 255, 0.18);
    }

    @keyframes tickerMove { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    @keyframes scrollPulse { 0%,100%{transform:scaleY(1);opacity:1} 50%{transform:scaleY(.4);opacity:.3} }
    @keyframes fadeUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
    @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes float { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-18px)} }
    @keyframes pulseRing { 0%,100%{transform:translate(-50%,-50%) scale(1);opacity:.5} 50%{transform:translate(-50%,-50%) scale(1.2);opacity:.1} }
    @keyframes neonPulse { 0%,100%{opacity:1;filter:drop-shadow(0 0 8px #00d4ff)} 50%{opacity:.6;filter:drop-shadow(0 0 20px #00d4ff)} }
    @keyframes warpFlash { 0%{opacity:0} 10%{opacity:.15} 100%{opacity:0} }

    /* Navbar animations */
    @keyframes navEnter { from { opacity: 0; transform: translateY(-14px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes navLinkIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    .siteNav { animation: navEnter 900ms cubic-bezier(.25,.46,.45,.94) both; }
    .siteNavLinks { display: flex; flex-wrap: wrap; align-items: center; justify-content: flex-end; }
    .siteNavItem { animation: navLinkIn 700ms cubic-bezier(.25,.46,.45,.94) both; animation-delay: var(--d, 0ms); }
    .siteNavHamburger { display: none; }
    .siteNavMobileMenu { display: none; }

    /* Responsive layout (mobile + tablet) */
    @media (max-width: 1024px) {
      .siteNav { gap: 14px !important; }
      .siteNavLinks { display: none !important; }
      .siteNavHamburger { display: flex !important; }
      .siteNavMobileMenu { display: flex !important; }

      .aboutSection {
        grid-template-columns: 1fr !important;
        padding: 96px 20px !important;
        align-items: start !important;
      }
      .aboutContent { padding-right: 0 !important; }
      .aboutFrameWrap { height: auto !important; padding-top: 38px !important; }
      .aboutFrame { width: min(360px, 92vw) !important; height: min(460px, 112vw) !important; }
      .aboutStats { gap: 18px !important; }

      .worksSection { padding: 96px 20px !important; }
      .worksHeader { flex-direction: column !important; align-items: flex-start !important; gap: 18px !important; margin-bottom: 48px !important; }
      .worksGrid { grid-template-columns: 1fr !important; gap: 14px !important; }

      .processSection { padding: 96px 20px !important; }
      .processGrid { grid-template-columns: 1fr !important; gap: 28px !important; }
      .processLine { display: none !important; }

      .skillsSection { padding: 96px 20px !important; }
      .skillsWrap { grid-template-columns: 1fr !important; gap: 44px !important; }
      .skillsSticky { position: relative !important; top: auto !important; }
      .skillsSticky h2 { font-size: clamp(2.2rem, 10vw, 3.6rem) !important; line-height: 1.05 !important; }
      .skillBarRow { gap: 12px !important; }
      .skillBarName { width: 120px !important; font-size: .95rem !important; }
    }
    @media (max-width: 640px) {
      .siteNav { align-items: center !important; }
      .siteNavLinks { display: none !important; }

      .aboutSection { padding: 86px 18px !important; }
      .aboutFrame { width: min(340px, 92vw) !important; height: min(420px, 112vw) !important; }

      .skillsSection { padding: 86px 18px !important; }
      .skillsSticky h2 { font-size: clamp(2rem, 11vw, 3.1rem) !important; }
      .skillBarName { width: 96px !important; font-size: .9rem !important; }
    }
  `}</style>
);

export default GlobalStyle;
