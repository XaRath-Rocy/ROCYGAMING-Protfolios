import { useMemo } from "react";

export default function StarBackground({ density = 1 }) {
  const layers = useMemo(() => {
    const d = Math.max(0.25, Math.min(2, Number(density) || 1));

    const mkLayer = (sizePx, opacity, blurPx) => {
      const size = Math.max(120, Math.round(sizePx / d));
      const alpha = Math.max(0, Math.min(1, opacity));
      const color = `rgba(232, 240, 255, ${alpha})`; // uses existing --ink tone

      const dots = [
        `radial-gradient(${color} 1px, transparent 1px)`,
        `radial-gradient(${color} 1px, transparent 1px)`,
      ].join(",");

      return {
        backgroundImage: dots,
        backgroundSize: `${size}px ${size}px, ${Math.round(size * 1.7)}px ${Math.round(size * 1.7)}px`,
        backgroundPosition: `0 0, ${Math.round(size * 0.45)}px ${Math.round(size * 0.3)}px`,
        filter: blurPx ? `blur(${blurPx}px)` : "none",
        opacity: 1,
      };
    };

    return [
      mkLayer(260, 0.12, 0),
      mkLayer(420, 0.09, 0.2),
      mkLayer(700, 0.07, 0.35),
    ];
  }, [density]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        mixBlendMode: "screen",
        background: "transparent",
      }}
    >
      {layers.map((style, idx) => (
        <div
          key={`stars-${idx}`}
          style={{
            position: "absolute",
            inset: 0,
            ...style,
          }}
        />
      ))}
    </div>
  );
}
