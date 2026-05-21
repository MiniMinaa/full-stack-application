import { useEffect, useState } from "react";

interface Props {
  lightSrc: string;
  darkSrc: string;
  theme: "light" | "dark";
  alt?: string;
  className?: string;
  durationMs?: number;
}

export default function CrossfadeImage({
  lightSrc,
  darkSrc,
  theme,
  alt = "",
  className,
  durationMs = 1200,
}: Props) {
  const [loadedLight, setLoadedLight] = useState(false);
  const [loadedDark, setLoadedDark] = useState(false);

  // preload both images (set handlers before src to catch cached images)
  useEffect(() => {
    const a = new Image();
    a.onload = () => setLoadedLight(true);
    a.onerror = () => setLoadedLight(false);
    a.src = lightSrc;

    const b = new Image();
    b.onload = () => setLoadedDark(true);
    b.onerror = () => setLoadedDark(false);
    b.src = darkSrc;
  }, [lightSrc, darkSrc]);

  const styleImg = (isTop: boolean) => ({
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    transition: `opacity ${durationMs}ms ease-in-out`,
    opacity: isTop ? 1 : 0,
  });

  return (
    <div style={{ position: "relative", overflow: "hidden", width: "100%", height: "100%" }}>
      {/* Light image (base) */}
      <img
        src={lightSrc}
        alt={alt}
        className={className ?? undefined}
        style={{
          ...styleImg(theme === "light"),
          opacity: theme === "light" ? 1 : 0,
          visibility: loadedLight ? "visible" : "hidden",
        }}
      />

      {/* Dark image (either real dark variant or filtered fallback) */}
      <img
        src={loadedDark ? darkSrc : lightSrc}
        alt={alt}
        className={className ?? undefined}
        style={{
          ...styleImg(theme === "dark"),
          opacity: theme === "dark" ? 1 : 0,
          visibility: loadedDark || loadedLight ? "visible" : "hidden",
          filter: loadedDark ? undefined : "brightness(0.5) saturate(0.7) contrast(0.9)",
        }}
      />
    </div>
  );
}
