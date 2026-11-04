import { createCipheriv, createDecipheriv, createHmac, randomBytes } from "node:crypto";
import { applicationConfig } from "./config";

export function fingerprint(value: string) {
  return createHmac("sha256", Buffer.from(applicationConfig().abuseKey, "hex")).update(value).digest("hex");
}
export function encryptPayload(reference: string, value: unknown) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", Buffer.from(applicationConfig().encryptionKey, "hex"), iv);
  cipher.setAAD(Buffer.from(reference));
  const body = Buffer.concat([cipher.update(JSON.stringify(value), "utf8"), cipher.final()]);
  return ["v1", iv.toString("base64"), cipher.getAuthTag().toString("base64"), body.toString("base64")].join(".");
}
export function decryptPayload(reference: string, value: string) {
  const [version, iv, tag, body] = value.split(".");
  if (version !== "v1") throw new Error("UNKNOWN_KEY_VERSION");
  const cipher = createDecipheriv("aes-256-gcm", Buffer.from(applicationConfig().encryptionKey, "hex"), Buffer.from(iv, "base64"));
  cipher.setAAD(Buffer.from(reference)); cipher.setAuthTag(Buffer.from(tag, "base64"));
  return JSON.parse(Buffer.concat([cipher.update(Buffer.from(body, "base64")), cipher.final()]).toString("utf8")) as { name: string; phone: string; note: string };
}
