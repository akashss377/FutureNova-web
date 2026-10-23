// Decorative cleaning-themed background for the About section.
// Soap bubbles, tiny particles, sparkles, flowing water, waves and foam.
// Purely visual: aria-hidden, pointer-events none, sits behind all content.
// Styles live in src/about-premium.css (all scoped under .about-premium).

const bubbles = [
  { x: 3, y: 18, s: 54, d: 22, t: 0, dx: 26 },
  { x: 9, y: 62, s: 20, d: 15, t: 4, dx: -18 },
  { x: 16, y: 38, s: 34, d: 19, t: 9, dx: 22 },
  { x: 27, y: 80, s: 14, d: 13, t: 2, dx: -12 },
  { x: 38, y: 12, s: 26, d: 17, t: 6, dx: 16 },
  { x: 47, y: 70, s: 44, d: 24, t: 11, dx: -24 },
  { x: 58, y: 28, s: 16, d: 14, t: 3, dx: 14 },
  { x: 66, y: 86, s: 30, d: 18, t: 8, dx: -20 },
  { x: 74, y: 8, s: 62, d: 26, t: 5, dx: 28 },
  { x: 83, y: 52, s: 22, d: 16, t: 12, dx: -16 },
  { x: 90, y: 74, s: 38, d: 21, t: 1, dx: 20 },
  { x: 95, y: 30, s: 18, d: 14, t: 7, dx: -14 },
];

const dots = [
  { x: 6, y: 30, s: 4, d: 9, t: 0 },
  { x: 14, y: 84, s: 3, d: 11, t: 3 },
  { x: 24, y: 52, s: 5, d: 10, t: 6 },
  { x: 35, y: 24, s: 3, d: 12, t: 2 },
  { x: 44, y: 90, s: 4, d: 9, t: 5 },
  { x: 55, y: 46, s: 3, d: 13, t: 8 },
  { x: 68, y: 66, s: 5, d: 10, t: 1 },
  { x: 78, y: 34, s: 3, d: 12, t: 4 },
  { x: 88, y: 88, s: 4, d: 11, t: 7 },
  { x: 97, y: 58, s: 3, d: 9, t: 9 },
];

const sparkles = [
  { x: 7, y: 12, s: 20, t: 0 },
  { x: 31, y: 6, s: 14, t: 1.2 },
  { x: 52, y: 58, s: 12, t: 2.1 },
  { x: 71, y: 20, s: 18, t: 0.6 },
  { x: 93, y: 12, s: 22, t: 1.8 },
  { x: 12, y: 74, s: 16, t: 2.6 },
  { x: 86, y: 80, s: 14, t: 0.9 },
];

const foam = [
  { x: 2, s: 26, t: 0 },
  { x: 9, s: 16, t: 1.4 },
  { x: 17, s: 34, t: 0.6 },
  { x: 29, s: 18, t: 2.2 },
  { x: 41, s: 28, t: 1 },
  { x: 53, s: 14, t: 2.8 },
  { x: 64, s: 32, t: 0.3 },
  { x: 76, s: 20, t: 1.8 },
  { x: 87, s: 30, t: 0.9 },
  { x: 96, s: 18, t: 2.4 },
];

export default function AboutBackdrop() {
  return (
    <div className="ap-backdrop" aria-hidden="true">
      <span className="ap-glow ap-glow-1" />
      <span className="ap-glow ap-glow-2" />
      <span className="ap-glow ap-glow-3" />
      <span className="ap-pattern" />
      <span className="ap-flow" />

      {bubbles.map((b, i) => (
        <span
          key={`b${i}`}
          className="ap-bubble"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: b.s,
            height: b.s,
            "--dx": `${b.dx}px`,
            animationDuration: `${b.d}s`,
            animationDelay: `-${b.t}s`,
          }}
        />
      ))}

      {dots.map((p, i) => (
        <span
          key={`d${i}`}
          className="ap-dot"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            animationDuration: `${p.d}s`,
            animationDelay: `-${p.t}s`,
          }}
        />
      ))}

      {sparkles.map((p, i) => (
        <span
          key={`s${i}`}
          className="ap-spark"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            animationDelay: `-${p.t}s`,
          }}
        />
      ))}

      <div className="ap-waves">
        <div className="ap-wave ap-wave-back" />
        <div className="ap-wave ap-wave-mid" />
        <div className="ap-wave ap-wave-front" />
        {foam.map((f, i) => (
          <span
            key={`f${i}`}
            className="ap-foam"
            style={{
              left: `${f.x}%`,
              width: f.s,
              height: f.s,
              animationDelay: `-${f.t}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
