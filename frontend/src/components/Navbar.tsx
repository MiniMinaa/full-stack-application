import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

export default function Navbar() {
  const { isAuthenticated, isLoading, loginWithRedirect, logout, user } =
    useAuth0();
  // theme toggle moved to Browse header

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Bulb
      </Link>
      <div className="navbar-actions">
        {/* theme toggle moved to Browse header */}
        {!isLoading &&
          (isAuthenticated ? (
            <>
              <Link to="/add" className="btn btn-nav-add">
                + Lamp
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
