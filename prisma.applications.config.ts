import { defineConfig } from "prisma/config";

// No fallback to the legacy/production DATABASE_URL and no automatic .env load.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/application-migrations" },
  datasource: { url: process.env.APPLICATION_DATABASE_URL },
});
