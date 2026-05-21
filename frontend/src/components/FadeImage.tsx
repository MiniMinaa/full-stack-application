import { useEffect, useState } from "react";

interface Props {
  src: string;
  alt?: string;
  className?: string;
  durationMs?: number;
}

const DEFAULT_TRANSITION_MS = 900;

export default function FadeImage({
  src,
  alt = "",
  className,
  durationMs,
}: Props) {
  const [current, setCurrent] = useState(src);
  const [prev, setPrev] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const TRANSITION_MS = durationMs ?? DEFAULT_TRANSITION_MS;

  useEffect(() => {
    if (src === current) return;
    setPrev(current);
    setCurrent(src);
    setShowNew(false);

    const img = new Image();
    img.src = src;
    img.onload = () => {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setShowNew(true)),
      );
      setTimeout(() => setPrev(null), TRANSITION_MS + 50);
    };
  }, [src, current, TRANSITION_MS]);

  return (
    <div
      className={className ?? ""}
      style={{ position: "relative", overflow: "hidden" }}
    >
      {prev && (
        <img
          src={prev}
          alt={alt}
          aria-hidden
          className="fade-img prev"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: `opacity ${TRANSITION_MS}ms ease-in-out`,
            opacity: showNew ? 0 : 1,
            pointerEvents: "none",
          }}
        />
      )}

      <img
        src={current}
        alt={alt}
        className="fade-img curr"
        style={{
          position: prev ? "absolute" : "relative",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: `opacity ${TRANSITION_MS}ms ease-in-out`,
          opacity: showNew || !prev ? 1 : 0,
          display: "block",
        }}
      />
    </div>
  );
}
