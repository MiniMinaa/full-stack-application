import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLamps } from "../services/api";
import type { Gym } from "../types";

function avgRating(gym: Gym): string | null {
  if (!gym.reviews.length) return null;
  const sum = gym.reviews.reduce((acc, r) => acc + r.rating, 0);
  return (sum / gym.reviews.length).toFixed(1);
}

export default function Browse() {
  const [gyms, setGyms] = useState<Gym[]>([]);
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

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="browse-title">Browse Lamps</h1>
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
              <Link to={`/gyms/${gym.id}`} key={gym.id} className="gym-card">
                {gym.imageUrl && (
                  <img
                    src={gym.imageUrl}
                    alt={gym.name}
                    className="gym-card-img"
                  />
                )}
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
