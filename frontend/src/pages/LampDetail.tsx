import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getSinglelamp, createReview } from "../services/api";
import type { Lamp } from "../types";
import { useTheme } from "../contexts/ThemeContext";
import FadeImage from "../components/FadeImage";
import CrossfadeImage from "../components/CrossfadeImage";

export default function LampDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, getAccessTokenSilently, loginWithRedirect, user } =
    useAuth0();
  const { theme } = useTheme();

  const [lamp, setLamp] = useState<Lamp | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getSinglelamp(Number(id))
      .then(setLamp)
      .catch(() => setError("Lamp not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleReview = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (!lamp || !user) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const token = await getAccessTokenSilently();
      const review = await createReview(
        lamp.id,
        {
          author: user.name ?? user.email ?? "Anonymous",
          rating,
          comment: comment.trim() || undefined,
        },
        token,
      );
      setLamp((prev) =>
        prev ? { ...prev, reviews: [...prev.reviews, review] } : prev,
      );
      setComment("");
      setRating(5);
    } catch {
      setSubmitError("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="status">Loading...</div>;
  if (error || !lamp)
    return <div className="status error">{error ?? "Lamp not found"}</div>;

  const avg = lamp.reviews.length
    ? (
        lamp.reviews.reduce((a, r) => a + r.rating, 0) / lamp.reviews.length
      ).toFixed(1)
    : null;

  const imageSrc =
    theme === "dark" && lamp.imageUrl?.includes("_light")
      ? lamp.imageUrl.replace("_light", "_dark")
      : lamp.imageUrl;

  return (
    <div className="page">
      <button className="btn-back" onClick={() => navigate("/")}>
        ← Back to lamps
      </button>

      <div className="lamp-detail-card">
        {lamp.imageUrl &&
          (() => {
            const light = lamp.imageUrl!;
            const dark = light.includes("_light")
              ? light.replace("_light", "_dark")
              : light;
            return (
              <CrossfadeImage
                lightSrc={light}
                darkSrc={dark}
                theme={theme}
                alt={lamp.name}
                className="lamp-detail-img"
                durationMs={1200}
              />
            );
          })()}

        <div className="lamp-detail-body">
          <div className="lamp-detail-header">
            <div>
              ← Back to lamps
              <p className="lamp-location">📍 {lamp.location}</p>
              {lamp.description && (
                <p className="lamp-description">{lamp.description}</p>
              )}
            </div>
            {avg && <div className="rating-badge">⭐ {avg}</div>}
          </div>

          <section className="reviews-section">
            <h2>Reviews ({lamp.reviews.length})</h2>
            {lamp.reviews.length === 0 ? (
              <p className="status">No reviews yet — be the first!</p>
            ) : (
              <div className="reviews-list">
                {lamp.reviews.map((review: import("../types").Review) => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <span className="review-author">{review.author}</span>
                      <span className="review-rating">
                        {"⭐".repeat(review.rating)}
                      </span>
                    </div>
                    {review.comment && (
                      <p className="review-comment">{review.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="add-review-section">
            <h2>Leave a review</h2>
            {isAuthenticated ? (
              <form onSubmit={handleReview} className="review-form">
                <div className="form-group">
                  <label>Rating</label>
                  <div className="star-selector">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        className={`star ${n <= rating ? "active" : ""}`}
                        onClick={() => setRating(n)}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="comment">Comment (optional)</label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience..."
                    rows={4}
                  />
                </div>
                {submitError && <p className="form-error">{submitError}</p>}
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit review"}
                </button>
              </form>
            ) : (
              <div className="auth-prompt">
                <p>
                  <button
                    className="link-btn"
                    onClick={() => loginWithRedirect()}
                  >
                    Log in
                  </button>{" "}
                  to leave a review
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
