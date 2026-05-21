import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { createNewLamp } from "../services/api";
import FadeImage from "../components/FadeImage";

export default function AddLamp() {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    loginWithRedirect,
  } = useAuth0();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImageUrl(result);
      setImagePreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (!imageUrl) return;
    setSubmitting(true);
    setError(null);
    try {
      const token = await getAccessTokenSilently();
      const lamp = await createNewLamp(
        { name, location, description, imageUrl },
        token,
      );
      navigate(`/lamps/${lamp.id}`);
    } catch {
      setError("Failed to create lamp. Please try again.");
      setSubmitting(false);
    }
  };

  if (isLoading || !isAuthenticated) {
    return <div className="status">Redirecting to login...</div>;
  }

  return (
    <div className="page page-narrow">
      <button className="btn-back" onClick={() => navigate("/")}>
        ← Back to lamps
      </button>
      <h1>Add a lamp</h1>
      <form onSubmit={handleSubmit} className="lamp-form">
        <div className="form-group">
          <label htmlFor="name">Lamp Name *</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="The name of the lamp"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location *</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Where the lamp is located"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell people what makes this lamp special..."
            rows={4}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Lamp Image *</label>
          <label htmlFor="image" className="image-upload-label">
            {imagePreview ? (
              <FadeImage
                src={imagePreview}
                alt="Preview"
                className="image-upload-preview"
                durationMs={600}
              />
            ) : (
              <span className="image-upload-placeholder">
                Click to upload an image
              </span>
            )}
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="image-upload-input"
          />
        </div>
        {error && <p className="form-error">{error}</p>}
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-cancel"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-dark"
            disabled={submitting || !name || !location || !imageUrl}
          >
            {submitting ? "Adding..." : "Add Lamp"}
          </button>
        </div>
      </form>
    </div>
  );
}
