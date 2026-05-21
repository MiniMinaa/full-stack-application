import { render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import AddLamp from "../pages/AddLamp";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "../contexts/ThemeContext";

vi.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    isAuthenticated: false,
    isLoading: false,
    loginWithRedirect: () => {},
    getAccessTokenSilently: async () => "",
  }),
}));

test("shows redirecting message when not authenticated", () => {
  render(
    <MemoryRouter>
      <ThemeProvider>
        <AddLamp />
      </ThemeProvider>
    </MemoryRouter>,
  );
  expect(screen.getByText(/Redirecting to login/i)).toBeTruthy();
});
