import { render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import Browse from "../pages/Browse";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "../contexts/ThemeContext";

vi.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    isAuthenticated: false,
    isLoading: false,
    loginWithRedirect: () => {},
  }),
}));

test("renders loading state when mounting", () => {
  render(
    <MemoryRouter>
      <ThemeProvider>
        <Browse />
      </ThemeProvider>
    </MemoryRouter>,
  );
  expect(screen.getByText(/Loading lamps/i)).toBeTruthy();
});
