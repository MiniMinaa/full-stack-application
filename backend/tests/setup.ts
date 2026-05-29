import { vi } from "vitest";

vi.mock("../src/db.js", () => ({
  default: {
    lamp: {
      findMany: vi.fn().mockResolvedValue([
        {
          id: 1,
          name: "Murano Glass Orb Pendant",
          location: "Italy",
          description: null,
          imageUrl: "/lamp_blue_light.png",
          reviews: [],
        },
      ]),
      findUnique: vi.fn().mockImplementation(
        async ({ where }: { where: { id: number } }) => {
          if (where.id === 1) {
            return {
              id: 1,
              name: "Murano Glass Orb Pendant",
              location: "Italy",
              description: null,
              imageUrl: "/lamp_blue_light.png",
              reviews: [],
            };
          }
          return null;
        },
      ),
      create: vi.fn().mockResolvedValue({
        id: 2,
        name: "New Lamp",
        location: "New Location",
        description: null,
        imageUrl: "/new.png",
        reviews: [],
      }),
    },
    review: {
      create: vi.fn().mockResolvedValue({
        id: 1,
        author: "Test User",
        rating: 5,
        comment: null,
        lampId: 1,
      }),
    },
    $disconnect: vi.fn(),
  },
}));
