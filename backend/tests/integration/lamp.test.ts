import request from "supertest";
import { describe, it, expect } from "vitest";

import app from "../../src/app.js";

describe("Lamps API", () => {
  it("GET /lamps should return all lamps", async () => {
    const response = await request(app).get("/lamps");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("GET /lamps/:id should return a single lamp", async () => {
    const response = await request(app).get("/lamps/1");

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
  });

  it("GET /lamps/:id should return 404 for invalid lamp", async () => {
    const response = await request(app).get("/lamps/999");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Lamp not found");
  });
});
