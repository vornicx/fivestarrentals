"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type VehicleGalleryProps = {
  primaryImage: string;
  vehicleName: string;
};

const galleryCandidates = [
  "main.webp",
  "front.webp",
  "front-three-quarter.webp",
  "front-quarter.webp",
  "front-detail.webp",
  "side.webp",
  "side-profile.webp",
  "rear-three-quarter.webp",
  "rear.webp",
  "rear-detail.webp",
  "interior.webp",
  "interior-cockpit.webp",
  "interior-dashboard.webp",
  "interior-seats.webp",
  "dashboard.webp",
  "cockpit.webp",
  "seats.webp",
  "engine.webp",
  "wheel.webp",
  "wheels.webp",
  "detail.webp",
  "detail-front.webp",
  "detail-rear.webp",
  "trunk.webp",
  "boot.webp",
  "roof.webp",
];

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

export default function VehicleGallery({ primaryImage, vehicleName }: VehicleGalleryProps) {
  const [images, setImages] = useState([primaryImage]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const candidates = useMemo(() => {
    const separator = primaryImage.lastIndexOf("/");
    if (separator === -1) return [primaryImage];
    const base = primaryImage.slice(0, separator);
    return unique([primaryImage, ...galleryCandidates.map((file) => `${base}/${file}`)]);
  }, [primaryImage]);

  useEffect(() => {
    let cancelled = false;

    const probe = (src: string) => new Promise<string | null>((resolve) => {
      if (src === primaryImage) {
        resolve(src);
        return;
      }

      const image = new window.Image();
      image.decoding = "async";
      image.onload = () => resolve(src);
      image.onerror = () => resolve(null);
      image.src = src;
    });

    Promise.all(candidates.map(probe)).then((results) => {
      if (cancelled) return;
      const available = unique(results.filter((src): src is string => Boolean(src)));
      if (available.length) {
        setImages(available);
        setActiveIndex((current) => Math.min(current, available.length - 1));
      }
    });

    return () => {
      cancelled = true;
    };
  }, [candidates, primaryImage]);

  const previous = useCallback(() => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setActiveIndex((current) => (current + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!fullscreen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFullscreen(false);
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [fullscreen, next, previous]);

  const activeImage = images[activeIndex] ?? primaryImage;
  const photoLabel = `${activeIndex + 1} / ${images.length}`;

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 45) return;
    if (delta > 0) previous();
    else next();
  };

  return (
    <section className="vehicle-gallery" aria-label={`${vehicleName} photo gallery`}>
      <div className="vehicle-gallery-heading">
        <div>
          <p>Every angle</p>
          <h2>Explore the {vehicleName}.</h2>
        </div>
        <div className="vehicle-gallery-meta">
          <span>{images.length} official photos</span>
          <button type="button" onClick={() => setFullscreen(true)}>View fullscreen</button>
        </div>
      </div>

      <div className="vehicle-gallery-stage">
        <button
          className="vehicle-gallery-main"
          type="button"
          onClick={() => setFullscreen(true)}
          aria-label={`Open ${vehicleName} photo ${activeIndex + 1} fullscreen`}
        >
          <img src={activeImage} alt={`${vehicleName} — photo ${activeIndex + 1}`} />
          <span className="vehicle-gallery-counter">{photoLabel}</span>
          <span className="vehicle-gallery-open">Open image</span>
        </button>

        <div className="vehicle-gallery-thumbs" aria-label="Choose photo">
          {images.map((src, index) => (
            <button
              className={index === activeIndex ? "is-active" : ""}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${vehicleName} photo ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              key={src}
            >
              <img src={src} alt="" loading="lazy" />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      </div>

      {fullscreen && (
        <div className="vehicle-lightbox" role="dialog" aria-modal="true" aria-label={`${vehicleName} fullscreen gallery`}>
          <button className="vehicle-lightbox-backdrop" type="button" onClick={() => setFullscreen(false)} aria-label="Close gallery" />
          <div className="vehicle-lightbox-topbar">
            <div><span>{vehicleName}</span><b>{photoLabel}</b></div>
            <button type="button" onClick={() => setFullscreen(false)} aria-label="Close fullscreen gallery">Close</button>
          </div>

          <div className="vehicle-lightbox-image" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <img src={activeImage} alt={`${vehicleName} — fullscreen photo ${activeIndex + 1}`} />
          </div>

          {images.length > 1 && (
            <>
              <button className="vehicle-lightbox-nav is-prev" type="button" onClick={previous} aria-label="Previous photo">‹</button>
              <button className="vehicle-lightbox-nav is-next" type="button" onClick={next} aria-label="Next photo">›</button>
            </>
          )}

          <div className="vehicle-lightbox-strip" aria-label="Fullscreen photo thumbnails">
            {images.map((src, index) => (
              <button
                className={index === activeIndex ? "is-active" : ""}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to photo ${index + 1}`}
                key={src}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
