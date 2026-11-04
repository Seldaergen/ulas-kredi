// Explicit operational approval; configuration presence alone must not open intake.
export function applicationIntakeEnabled() {
  // This release is contact-only. Runtime flags cannot enable production intake.
  if (process.env.NODE_ENV === "production") return false;
  return process.env.APPLICATION_ALLOW_LOCAL === "true" || process.env.APPLICATION_ACCEPTING_SUBMISSIONS === "true";
}

export function applicationConfig() {
  if (typeof window !== "undefined") throw new Error("Server-only configuration");
  const url = process.env.APPLICATION_DATABASE_URL;
  const encryptionKey = process.env.APPLICATION_ENCRYPTION_KEY;
  const abuseKey = process.env.APPLICATION_ABUSE_KEY;
  const retentionDays = Number(process.env.APPLICATION_RETENTION_DAYS);
  const owner = process.env.APPLICATION_DATA_OWNER;
  if (owner && /^(sentetik|fixture|example|örnek)(?:\s|$)/iu.test(owner.trim()) && process.env.APPLICATION_ALLOW_LOCAL !== "true") throw new Error("PRODUCTION_CONTROLLER_REQUIRED");
  if (!url || !encryptionKey || !abuseKey || !/^[a-f0-9]{64}$/i.test(encryptionKey) ||
      !/^[a-f0-9]{64}$/i.test(abuseKey) || encryptionKey === abuseKey ||
      !Number.isInteger(retentionDays) || retentionDays < 1 || retentionDays > 365 || !owner?.trim() || owner.trim().length < 3 || owner.length > 160 || /[\r\n]/.test(owner)) {
    throw new Error("APPLICATION_CONFIGURATION_REQUIRED");
  }
  const parsed = new URL(url);
  if (!["postgresql:", "postgres:"].includes(parsed.protocol)) throw new Error("APPLICATION_DATABASE_REQUIRED");
  return { url, encryptionKey, abuseKey, retentionDays, owner };
}
