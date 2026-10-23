import { useState } from "react";
import { beforeAfterSets } from "../data/siteData";

// Tabbed before & after gallery: only the selected service is shown.
export default function BeforeAfterGallery() {
  const [activeId, setActiveId] = useState(beforeAfterSets[0].id);
  const active = beforeAfterSets.find((set) => set.id === activeId);

  const onKeyDown = (e) => {
    const i = beforeAfterSets.findIndex((set) => set.id === activeId);
    let target = null;
    if (e.key === "ArrowRight") target = beforeAfterSets[(i + 1) % beforeAfterSets.length];
    if (e.key === "ArrowLeft") target = beforeAfterSets[(i - 1 + beforeAfterSets.length) % beforeAfterSets.length];
    if (target) {
      e.preventDefault();
      setActiveId(target.id);
      document.getElementById(`ba-tab-${target.id}`)?.focus();
    }
  };

  return (
    <div className="ba-gallery">
      <div className="ba-tabs" role="tablist" aria-label="Before and after by service" onKeyDown={onKeyDown}>
        {beforeAfterSets.map((set) => (
          <button
            type="button"
            role="tab"
            id={`ba-tab-${set.id}`}
            key={set.id}
            className={`ba-tab ${set.id === activeId ? "is-active" : ""}`}
            aria-selected={set.id === activeId}
            aria-controls="ba-panel"
            tabIndex={set.id === activeId ? 0 : -1}
            onClick={() => setActiveId(set.id)}
          >
            {set.label}
          </button>
        ))}
      </div>

      <div className="ba-panel" id="ba-panel" role="tabpanel" aria-labelledby={`ba-tab-${active.id}`} key={active.id}>
        <figure className="ba-shot" style={{ aspectRatio: `${active.width} / ${active.height}` }}>
          <img src={active.before} alt={`${active.label}: before cleaning`} width={active.width} height={active.height} decoding="async" />
          <figcaption className="ba-caption ba-caption-before">Before</figcaption>
        </figure>
        <figure className="ba-shot" style={{ aspectRatio: `${active.width} / ${active.height}` }}>
          <img src={active.after} alt={`${active.label}: after cleaning`} width={active.width} height={active.height} decoding="async" />
          <figcaption className="ba-caption ba-caption-after">After</figcaption>
        </figure>
      </div>
    </div>
  );
}
