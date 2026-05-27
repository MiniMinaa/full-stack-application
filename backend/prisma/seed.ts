import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.lamp.createMany({
    data: [
      {
        name: "Murano Glass Orb Pendant",
        location: "Italy",
        description:
          "A daringly simple silhouette, served with a dose of extraordinary detail.",
        imageUrl: "/lamp_blue_light.png",
      },
      {
        name: "Brass Calla Sconce",
        location: "Spain",
        description:
          "Rendered in hand-spun brass, each sconce features a bell-shaped shade and Calla's signature fin embellishments in a range of finishes to mix and match.",
        imageUrl: "/lamp_brown_light.png",
      },
      {
        name: "Calla Pendant",
        location: "Spain",
        description:
          "A hand-blown glass pendant that pairs a graceful silhouette with eye-catching embellishment.",
        imageUrl: "/lamp_red_light.png",
      },
    ],
    skipDuplicates: true,
  });

  console.log("Database seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
