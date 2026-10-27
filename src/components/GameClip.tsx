"use client";

import { useEffect, useRef, useState } from "react";

/** Real gameplay recorded from the engine. Pauses for reduced-motion users; always has a pause control. */
export function GameClip() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) ref.current?.pause();
  }, []);

  function toggle() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  }

  return (
    <figure className="clip">
      <video
        ref={ref}
        autoPlay
        muted
        loop
        playsInline
        poster="/work/galaga-poster.webp"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-label="Gameplay: enemies fly in on curved paths, form up, and dive while the player's ship shoots back"
      >
        <source src="/work/galaga-loop.webm" type="video/webm" />
        <source src="/work/galaga-loop.mp4" type="video/mp4" />
      </video>
      <figcaption>
        <span>Recorded from the running game</span>
        <button type="button" className="btn-quiet" onClick={toggle}>
          {playing ? "Pause" : "Play"}
        </button>
      </figcaption>
    </figure>
  );
}
