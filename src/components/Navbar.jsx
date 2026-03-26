import { useEffect, useMemo, useRef, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState(null);
  const [hasNavigated, setHasNavigated] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const hasNavigatedRef = useRef(false);
  const scrollRafRef = useRef(0);

  const links = useMemo(
    () => [
      { label: "About", id: "about" },
      { label: "Works", id: "works" },
      { label: "Process", id: "process" },
      { label: "Skills", id: "skills" },
      { label: "Testimonials", id: "testimonials" },
      { label: "Contact", id: "contact" },
    ],
    []
  );

  useEffect(() => {
    let raf = 0;

    const compute = () => {
      raf = 0;

      setScrolled(window.scrollY > 60);

      const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, window.scrollY / max)));

      // Active section: pick the section whose top is closest to 0 but not too far below.
      let best = { id: null, score: Infinity };
      for (const link of links) {
        const el = document.getElementById(link.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const score = Math.abs(r.top);
        if (r.top <= window.innerHeight * 0.35 && score < best.score) {
          best = { id: link.id, score };
        }
      }
      if (!hasNavigatedRef.current) {
        setActiveId(null);
        return;
      }

      if (best.id) setActiveId((prev) => (best.id !== prev ? best.id : prev));
    };

    const onScroll = () => {
      if (!hasNavigatedRef.current && window.scrollY > 30) {
        hasNavigatedRef.current = true;
        setHasNavigated(true);
      }
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [links]);

  useEffect(() => {
    hasNavigatedRef.current = hasNavigated;
  }, [hasNavigated]);

  const smoothScrollTo = (targetTop) => {
    if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      window.scrollTo({ top: targetTop, left: 0, behavior: "auto" });
      return;
    }

    const startTop = window.scrollY || window.pageYOffset || 0;
    const delta = targetTop - startTop;
    let start = null;
    const duration = 650;

    const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const tick = (now) => {
      if (start === null) start = now;
      const t = Math.min(1, (now - start) / duration);
      const eased = easeInOutCubic(t);
      window.scrollTo({ top: Math.round(startTop + delta * eased), left: 0, behavior: "auto" });
      if (t < 1) {
        scrollRafRef.current = requestAnimationFrame(tick);
      } else {
        scrollRafRef.current = 0;
      }
    };

    scrollRafRef.current = requestAnimationFrame(tick);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const nav = document.querySelector(".siteNav");
    const navOffset = nav?.offsetHeight ? nav.offsetHeight + 10 : 90;
    const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
    smoothScrollTo(top);
  };

  const onNavClick = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    hasNavigatedRef.current = true;
    setHasNavigated(true);
    setActiveId(id);
    setMenuOpen(false);
    scrollToSection(id);
    if (typeof window !== "undefined" && window.history?.pushState) {
      window.history.pushState(null, "", `#${id}`);
    }
  };

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    return () => {
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <nav
      className="siteNav"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: scrolled ? "18px clamp(20px, 6vw, 60px)" : "26px clamp(20px, 6vw, 60px)",
        background: scrolled
          ? "rgba(9,8,6,.95)"
          : "linear-gradient(to bottom,rgba(9,8,6,.9),transparent)",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(200,160,80,.08)" : "none",
        transition: "all .4s",
      }}
    >
      {/* Scroll progress */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: -1,
          height: 1,
          opacity: scrolled ? 1 : 0,
          transition: "opacity .35s",
          background: "rgba(200,160,80,.10)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${Math.round(progress * 1000) / 10}%`,
            background: "linear-gradient(90deg, var(--neon), var(--ember))",
          }}
        />
      </div>

      <div
        style={{
          fontFamily: "var(--serif)",
          fontSize: "1rem",
          fontWeight: 300,
          letterSpacing: ".35em",
          color: "var(--neon)",
          textTransform: "uppercase",
          filter: "drop-shadow(0 0 8px rgba(0,212,255,.6))",
        }}
      >
        ROCYGAMING
      </div>
      <ul className="siteNavLinks hidden lg:flex" style={{ gap: "clamp(14px, 3vw, 36px)", listStyle: "none" }}>
        {links.map((l, i) => {
          const isActive = activeId === l.id;
          const isHover = hovered === l.id;
          const color = isActive || isHover ? "var(--gold)" : "var(--ink2)";
          return (
            <li
              key={l.id}
              className="siteNavItem"
              style={{
                "--d": `${120 + i * 70}ms`,
              }}
            >
              <a
                href={`#${l.id}`}
                data-hover
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "clamp(.56rem, 1.8vw, .6rem)",
                  letterSpacing: ".2em",
                  color,
                  textTransform: "uppercase",
                  position: "relative",
                  paddingBottom: 4,
                  transition: "color .3s",
                  display: "inline-block",
                }}
                aria-current={isActive ? "page" : undefined}
                onMouseEnter={() => setHovered(l.id)}
                onMouseLeave={() => setHovered(null)}
                onClickCapture={(e) => onNavClick(e, l.id)}
              >
                {l.label}
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 1,
                    background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
                    opacity: isActive ? 0.9 : 0,
                    transform: isActive ? "translateY(0)" : "translateY(3px)",
                    transition: "all .35s",
                  }}
                />
              </a>
            </li>
          );
        })}
      </ul>
      {/* Hamburger */}
      <button
        type="button"
        className="siteNavHamburger"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav"
        onClick={() => setMenuOpen((v) => !v)}
        style={{
          width: 30,
          height: 22,
          flexDirection: "column",
          justifyContent: "space-between",
          cursor: "pointer",
          zIndex: 200,
          background: "transparent",
          border: "none",
          padding: 0,
        }}
      >
        <span
          style={{
            height: 2,
            background: "white",
            borderRadius: 999,
            transformOrigin: "left center",
            transform: menuOpen ? "translateY(10px) rotate(45deg)" : "translateY(0) rotate(0)",
            transition: "transform .3s ease",
          }}
        />
        <span
          style={{
            height: 2,
            background: "white",
            borderRadius: 999,
            opacity: menuOpen ? 0 : 1,
            transform: menuOpen ? "scaleX(0.2)" : "scaleX(1)",
            transformOrigin: "left center",
            transition: "opacity .25s ease, transform .3s ease",
          }}
        />
        <span
          style={{
            height: 2,
            background: "white",
            borderRadius: 999,
            transformOrigin: "left center",
            transform: menuOpen ? "translateY(-10px) rotate(-45deg)" : "translateY(0) rotate(0)",
            transition: "transform .3s ease",
          }}
        />
      </button>
      {/* Mobile Menu */}
      <div
        id="mobile-nav"
        className="siteNavMobileMenu"
        aria-hidden={!menuOpen}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          background: "rgba(9,8,6,.98)",
          backdropFilter: "blur(12px)",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "30px",
          transform: menuOpen ? "translateY(0)" : "translateY(-105%)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "transform .5s ease, opacity .35s ease",
          zIndex: 150,
          willChange: "transform, opacity",
        }}
      >
        {links.map((l, i) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            onClickCapture={(e) => onNavClick(e, l.id)}
            style={{
              fontSize: "1.2rem",
              letterSpacing: ".2em",
              color: "var(--gold)",
              textTransform: "uppercase",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0) scale(1)" : "translateY(-10px) scale(.98)",
              transition: "transform .35s ease, opacity .35s ease",
              transitionDelay: menuOpen ? `${120 + i * 55}ms` : "0ms",
            }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
