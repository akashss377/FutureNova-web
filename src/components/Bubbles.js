// Soap bubbles drifting upward. Put inside any section that has position: relative.
// tone="light" for white backgrounds, tone="dark" for navy backgrounds.
const bubbles = [
  { left: 4, size: 22, dur: 15, delay: 0 },
  { left: 12, size: 12, dur: 11, delay: 3 },
  { left: 21, size: 30, dur: 18, delay: 6 },
  { left: 33, size: 14, dur: 12, delay: 1 },
  { left: 44, size: 24, dur: 16, delay: 8 },
  { left: 53, size: 10, dur: 10, delay: 4 },
  { left: 63, size: 28, dur: 19, delay: 2 },
  { left: 72, size: 16, dur: 13, delay: 7 },
  { left: 81, size: 34, dur: 20, delay: 5 },
  { left: 89, size: 12, dur: 11, delay: 9 },
  { left: 95, size: 20, dur: 15, delay: 3 },
];

export default function Bubbles({ tone = "light" }) {
  return (
    <div className={`bubbles bubbles-${tone}`} aria-hidden="true">
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="bubble"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            animationDuration: `${b.dur}s`,
            animationDelay: `-${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
