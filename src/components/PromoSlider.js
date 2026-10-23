import { useCallback, useEffect, useRef, useState } from "react";

const AUTOPLAY_MS = 4500;
const SWIPE_PX = 50;

// Auto-sliding promo carousel: one image at a time, always moves right to left,
// loops forever (a clone of the first slide sits at the end so the loop has no rewind).
export default function PromoSlider({ slides }) {
  const count = slides.length;
  const [pos, setPos] = useState(0); // 0..count (count = clone of slide 0)
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [dragX, setDragX] = useState(0);
  const dragStart = useRef(null);
  const viewportRef = useRef(null);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const next = useCallback(() => {
    if (reduceMotion.current) {
      setAnimate(false);
      setPos((p) => (p + 1) % count);
      return;
    }
    setAnimate(true);
    setPos((p) => (p >= count ? p : p + 1));
  }, [count]);

  const prev = useCallback(() => {
    if (reduceMotion.current) {
      setAnimate(false);
      setPos((p) => (p - 1 + count) % count);
      return;
    }
    if (pos === 0) {
      // jump (invisibly) to the clone, then slide back one step
      setAnimate(false);
      setPos(count);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimate(true);
          setPos(count - 1);
        })
      );
    } else {
      setAnimate(true);
      setPos(pos - 1);
    }
  }, [pos, count]);

  const goTo = (i) => {
    setAnimate(true);
    setPos(i);
  };

  // when the slide reaches the clone, snap back to the real first slide
  const handleTransitionEnd = (e) => {
    if (e.target !== e.currentTarget) return;
    if (pos === count) {
      setAnimate(false);
      setPos(0);
    }
  };

  // autoplay (restarts after every change, pauses on hover/focus/drag and in a hidden tab)
  useEffect(() => {
    if (paused) return undefined;
    const id = setTimeout(() => {
      if (!document.hidden) next();
    }, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [pos, paused, next]);

  // swipe support
  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragStart.current = e.clientX;
    setPaused(true);
  };
  const onPointerMove = (e) => {
    if (dragStart.current === null) return;
    setDragX(e.clientX - dragStart.current);
  };
  const endDrag = (e) => {
    if (dragStart.current === null) return;
    const dx = e.clientX - dragStart.current;
    dragStart.current = null;
    setDragX(0);
    setPaused(false);
    if (dx <= -SWIPE_PX) next();
    else if (dx >= SWIPE_PX) prev();
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  const active = pos % count;
  const dragging = dragStart.current !== null && dragX !== 0;

  return (
    <section
      className="promo-slider"
      aria-roledescription="carousel"
      aria-label="FutureNova service promotions"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => dragStart.current === null && setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKeyDown}
    >
      <div className="container">
        <div className="promo-frame">
          <div
            className="promo-viewport"
            ref={viewportRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerLeave={endDrag}
          >
            <div
              className={`promo-track ${animate && !dragging ? "is-animated" : ""}`}
              style={{ transform: `translateX(calc(${-pos * 100}% + ${dragX}px))` }}
              onTransitionEnd={handleTransitionEnd}
            >
              {[...slides, slides[0]].map((slide, i) => {
                const isClone = i === count;
                return (
                  <div
                    className="promo-slide"
                    key={`${slide.src}-${i}`}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={isClone ? undefined : `${i + 1} of ${count}`}
                    aria-hidden={isClone || i !== active ? "true" : undefined}
                  >
                    <img
                      src={slide.src}
                      alt={isClone ? "" : slide.alt}
                      width={slide.width}
                      height={slide.height}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      draggable="false"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <button type="button" className="promo-arrow promo-arrow-prev" onClick={prev} aria-label="Previous image">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <button type="button" className="promo-arrow promo-arrow-next" onClick={next} aria-label="Next image">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        <div className="promo-dots" role="tablist" aria-label="Choose image">
          {slides.map((slide, i) => (
            <button
              type="button"
              role="tab"
              key={slide.src}
              className={i === active ? "is-active" : ""}
              aria-selected={i === active}
              aria-label={`Show image ${i + 1} of ${count}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
