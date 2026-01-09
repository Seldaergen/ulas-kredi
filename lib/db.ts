import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

declare global {
  // eslint-disable-next-line no-var
  var __pgPool: Pool | undefined;
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

// ✅ Render External DB için SSL gerekir (çoğu durumda)
// sslmode=require varsa rejectUnauthorized false ile güvenli bağlan (CA yoksa kopmayı engeller)
const needsSsl = connectionString.includes("sslmode=require");

const pool =
  global.__pgPool ??
  new Pool({
    connectionString,
    ssl: needsSsl ? { rejectUnauthorized: false } : undefined,
    max: 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
    keepAlive: true,
  });

global.__pgPool = pool;

const adapter = new PrismaPg(pool);

export const prisma =
  global.__prisma ??
  new PrismaClient({
    adapter,
  });

global.__prisma = prisma;
