// A drawn solar roof. dirty = dusty look, otherwise clean and bright.
// Replace with real photos later: <img src="/photos/solar-before.jpg" alt="..." />
export default function SolarScene({ dirty = false }) {
  return (
    <div className={`solar ${dirty ? "solar-dirty" : "solar-clean"}`}>
      <div className="solar-grid">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="solar-panel" />
        ))}
      </div>
    </div>
  );
}
