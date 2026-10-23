export default function SectionTitle({ title, subtitle, center = false }) {
  return (
    <div className={`section-title ${center ? "text-center" : ""}`}>
      <h2>{title}</h2>
      {subtitle && <p className="lead-text">{subtitle}</p>}
    </div>
  );
}
