import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { applicationConfig } from "./config";

let client: PrismaClient | undefined;
let pool: Pool | undefined;
export function applicationDb() {
  if (!client) {
    const { url } = applicationConfig();
    pool = new Pool({ connectionString: url, max: 5, connectionTimeoutMillis: 5000, idleTimeoutMillis: 10000 });
    pool.on("error", () => { console.warn("application_database_pool_unavailable"); });
    client = new PrismaClient({ adapter: new PrismaPg(pool), log: [] });
  }
  return client;
}
export async function closeApplicationDb() {
  if (client) await client.$disconnect();
  if (pool) await pool.end();
  client = undefined; pool = undefined;
}
