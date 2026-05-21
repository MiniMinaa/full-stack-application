import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLamps } from "../services/api";
import type { Lamp } from "../types";
import { useTheme } from "../contexts/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import FadeImage from "../components/FadeImage";
import CrossfadeImage from "../components/CrossfadeImage";

function avgRating(gym: Lamp): string | null {
  if (!gym.reviews.length) return null;
  const sum = gym.reviews.reduce((acc, r) => acc + r.rating, 0);
  return (sum / gym.reviews.length).toFixed(1);
}

export default function Browse() {
  const [gyms, setGyms] = useState<Lamp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getLamps()
      .then(setGyms)
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
        <h1 className="browse-title">Browse Lamps</h1>
        <div style={{ marginLeft: "1rem" }}>
          <ThemeToggle />
        </div>
      </div>

      {gyms.length === 0 ? (
        <div className="status">
          No lamps yet — log in and add the first one!
        </div>
      ) : (
        <div className="gym-grid">
          {gyms.map((gym) => {
            const avg = avgRating(gym);
            return (
              <Link to={`/lamps/${gym.id}`} key={gym.id} className="gym-card">
                {gym.imageUrl &&
                  (() => {
                    const light = gym.imageUrl!;
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
                          alt={gym.name}
                          className="gym-card-img"
                          durationMs={1200}
                        />
                      );
                    }
                    return (
                      <FadeImage
                        src={gym.imageUrl}
                        alt={gym.name}
                        className="gym-card-img"
                        durationMs={1200}
                      />
                    );
                  })()}
                <h2 className="gym-card-name">{gym.name}</h2>
                <p className="gym-card-location">📍 {gym.location}</p>
                {gym.description && (
                  <p className="gym-card-desc">{gym.description}</p>
                )}
                <div className="gym-card-footer">
                  {avg ? (
                    <span className="rating">⭐ {avg}</span>
                  ) : (
                    <span className="no-reviews">No reviews yet</span>
                  )}
                  <span className="review-count">
                    {gym.reviews.length}{" "}
                    {gym.reviews.length === 1 ? "review" : "reviews"}
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
