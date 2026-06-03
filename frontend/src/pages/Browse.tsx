import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLamps } from "../services/api";
import type { Lamp } from "../types";
import { useTheme } from "../contexts/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import FadeImage from "../components/FadeImage";
import CrossfadeImage from "../components/CrossfadeImage";
import { MapPin, Star } from "lucide-react";

function avgRating(lamp: Lamp): string | null {
  if (!lamp.reviews.length) return null;
  const sum = lamp.reviews.reduce((acc, r) => acc + r.rating, 0);
  return (sum / lamp.reviews.length).toFixed(1);
}

export default function Browse() {
  const [lamps, setLamps] = useState<Lamp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getLamps()
      .then(setLamps)
      .catch(() => setError("Failed to load lamps. Is the backend running?"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="status">Loading lamps...</div>;
  if (error) return <div className="status error">{error}</div>;

  const { theme } = useTheme();

  return (
    <div className="page">
      <div
        className="page-header"
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <h1 className="browse-title">All Lamps</h1>
        <div style={{ marginLeft: "1rem" }}>
          <ThemeToggle />
        </div>
      </div>

      {lamps.length === 0 ? (
        <div className="status">
          No lamps yet — log in and add the first one!
        </div>
      ) : (
        <div className="lamp-grid">
          {lamps.map((lamp) => {
            const avg = avgRating(lamp);
            return (
              <Link
                to={`/lamps/${lamp.id}`}
                key={lamp.id}
                className="lamp-card"
              >
                {lamp.imageUrl &&
                  (() => {
                    const light = lamp.imageUrl!;
                    const dark = light.includes("_light")
                      ? light.replace("_light", "_dark")
                      : light;
                    // if we have distinct light/dark variants use crossfade
                    if (light !== dark) {
                      return (
                        <CrossfadeImage
                          lightSrc={light}
                          darkSrc={dark}
                          theme={theme}
                          alt={lamp.name}
                          className="lamp-card-img"
                          durationMs={1200}
                        />
                      );
                    }
                    return (
                      <FadeImage
                        src={lamp.imageUrl}
                        alt={lamp.name}
                        className="lamp-card-img"
                        durationMs={1200}
                      />
                    );
                  })()}
                <h2 className="lamp-card-name">{lamp.name}</h2>
                <p className="lamp-card-location"><MapPin size={13} strokeWidth={2} /> {lamp.location}</p>
                {lamp.description && (
                  <p className="lamp-card-desc">{lamp.description}</p>
                )}
                <div className="lamp-card-footer">
                  {avg ? (
                    <span className="rating"><Star size={13} strokeWidth={2} fill="currentColor" /> {avg}</span>
                  ) : (
                    <span className="no-reviews">No reviews yet</span>
                  )}
                  <span className="review-count">
                    {lamp.reviews.length}{" "}
                    {lamp.reviews.length === 1 ? "review" : "reviews"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
