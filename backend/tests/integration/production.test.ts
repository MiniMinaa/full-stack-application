import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../../src/app.js";

describe("Production-like behavior", () => {
  it("returns CORS header for allowed origin", async () => {
    const res = await request(app)
      .get("/lamps")
      .set("Origin", "http://localhost:5173");

    expect(res.headers["access-control-allow-origin"]).toBe(
      "http://localhost:5173",
    );
  });

  it("does not expose X-Powered-By header", async () => {
    const res = await request(app).get("/lamps");

    expect(res.headers["x-powered-by"]).toBeUndefined();
  });
});
