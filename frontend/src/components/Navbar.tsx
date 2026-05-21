import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { isAuthenticated, isLoading, loginWithRedirect, logout, user } =
    useAuth0();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Lightning
      </Link>
      <div className="navbar-actions">
        {!isLoading &&
          (isAuthenticated ? (
            <>
              <Link to="/add" className="btn btn-nav-add">
                + Add Gym
              </Link>
              <span className="navbar-user">{user?.name}</span>
              <button
                className="btn btn-primary"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Log out
              </button>
            </>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => loginWithRedirect()}
            >
              Log in
            </button>
          ))}
      </div>
    </nav>
  );
}
