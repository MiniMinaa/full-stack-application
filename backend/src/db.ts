import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL ?? "";
const isLocal = connectionString.includes("localhost") || connectionString.includes("host.docker.internal");

const adapter = new PrismaPg({
  connectionString,
  ssl: isLocal ? false : { rejectUnauthorized: false },
});

const prisma = new PrismaClient({ adapter });

export default prisma;
