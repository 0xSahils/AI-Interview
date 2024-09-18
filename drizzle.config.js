import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://neondb_owner:2vKTMl0QfLhp@ep-raspy-king-a5refmq9.us-east-2.aws.neon.tech/AI%20Interview%20Mocker?sslmode=require",
  },
});
