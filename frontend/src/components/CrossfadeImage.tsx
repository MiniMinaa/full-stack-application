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

  // preload both
  useEffect(() => {
    const a = new Image();
    a.src = lightSrc;
    a.onload = () => setLoadedLight(true);
    const b = new Image();
    b.src = darkSrc;
    b.onload = () => setLoadedDark(true);
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
    <div
      className={className ?? ""}
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Light image */}
      <img
        src={lightSrc}
        alt={alt}
        style={{
          ...styleImg(theme === "light"),
          opacity: theme === "light" ? 1 : 0,
          visibility: loadedLight ? "visible" : "hidden",
        }}
      />

      {/* Dark image */}
      <img
        src={darkSrc}
        alt={alt}
        style={{
          ...styleImg(theme === "dark"),
          opacity: theme === "dark" ? 1 : 0,
          visibility: loadedDark ? "visible" : "hidden",
        }}
      />
    </div>
  );
}
