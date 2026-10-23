import { useEffect, useRef, useState } from "react";

// Drag-to-compare slider. When it scrolls into view it wipes itself clean once,
// like a squeegee, then the visitor can drag it.
// Pass anything as `before` and `after` (an <img> or a Scene component).
export default function BeforeAfter({ before, after, beforeLabel = "Before", afterLabel = "After" }) {
  const wrapRef = useRef(null);
  const touched = useRef(false);
  const [position, setPosition] = useState(100);
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const el = wrapRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || reduce || !("IntersectionObserver" in window)) {
      setPosition(50);
      return;
    }
    let frame;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now) => {
          if (touched.current) return;
          const t = Math.min((now - start) / 1800, 1);
          setPosition(100 - 50 * (1 - Math.pow(1 - t, 3)));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  const handleChange = (e) => {
    touched.current = true;
    setHint(false);
    setPosition(Number(e.target.value));
  };

  return (
    <div className="ba" ref={wrapRef}>
      <div className="ba-layer">{after}</div>
      <div className="ba-layer" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        {before}
      </div>
      <span className="ba-tag ba-tag-left">{beforeLabel}</span>
      <span className="ba-tag ba-tag-right">{afterLabel}</span>
      <div className="ba-line" style={{ left: `${position}%` }}>
        <span className={`ba-knob ${hint ? "has-hint" : ""}`}>&#8596;</span>
      </div>
      <input
        className="ba-range"
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={handleChange}
        aria-label="Drag to compare before and after cleaning"
      />
    </div>
  );
}
