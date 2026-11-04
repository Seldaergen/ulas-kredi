import { z } from "zod";

export const APPLICATION_PRIVACY_VERSION = "application-v1-2026-11";
export const TOPICS = {
  NEED_CREDIT: "İhtiyaç Kredisi", MORTGAGE: "Konut Kredisi", VEHICLE: "Taşıt Kredisi",
  BUSINESS: "Esnaf / KOBİ Kredisi", CREDIT_SCORE: "Kredi Notu", LIMIT: "Limit",
  REJECTION_REVIEW: "Red Analizi", RESTRUCTURING: "Yapılandırma", OTHER: "Diğer",
} as const;

export function normalizePhone(value: string) {
  let digits = value.replace(/[\s()+-]/g, "");
  if (digits.startsWith("90") && digits.length === 12) digits = digits.slice(2);
  if (digits.startsWith("0") && digits.length === 11) digits = digits.slice(1);
  return /^5\d{9}$/.test(digits) ? `+90${digits}` : "";
}
const tidy = (value: string) => value.trim().replace(/\s+/g, " ");
export const applicationInput = z.object({
  name: z.string().max(80).transform(tidy).pipe(z.string().min(2).regex(/^[\p{L}\p{M} '\-]+$/u).refine(value => (value.match(/\p{L}/gu)?.length ?? 0) >= 2)),
  phone: z.string().max(30).transform(normalizePhone).pipe(z.string().min(1)),
  topic: z.enum(Object.keys(TOPICS) as [keyof typeof TOPICS, ...(keyof typeof TOPICS)[]]),
  note: z.string().max(400).default("").transform(tidy).refine(value => !/[<>\x00-\x1f]|\d[\d\s-]{9,}\d|\bTR\d{2}|\b(cvv|cvc|iban|parola|sifre)\b|şifre/i.test(value)),
  channel: z.enum(["HERO_FORM", "CONTACT_FORM"]),
  privacyAcknowledged: z.literal(true),
  privacyVersion: z.literal(APPLICATION_PRIVACY_VERSION),
  website: z.string().max(100).default(""),
}).strict();

export type ApplicationInput = z.output<typeof applicationInput>;
