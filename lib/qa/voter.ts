import crypto from "crypto";
import { headers } from "next/headers";

export async function getVoterHash() {
  const h = await headers();

  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "0.0.0.0";

  const ua = h.get("user-agent") || "ua:none";
  const secret = process.env.QA_VOTER_SECRET || "";

  if (!secret) throw new Error("QA_VOTER_SECRET missing");

  // raw ip saklamıyoruz; HMAC ile anon hash üretiyoruz
  return crypto
    .createHmac("sha256", secret)
    .update(`${ip}|${ua}`)
    .digest("hex");
}
