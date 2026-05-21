import { render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import Navbar from "../components/Navbar";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "../contexts/ThemeContext";

vi.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    isAuthenticated: false,
    isLoading: false,
    loginWithRedirect: () => {},
    logout: () => {},
    user: null,
  }),
}));

test("shows Log in when not authenticated", () => {
  render(
    <MemoryRouter>
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    </MemoryRouter>,
  );
  expect(screen.getByText(/Log in/i)).toBeTruthy();
});
