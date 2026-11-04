import { NextResponse } from "next/server";
import { applicationInput } from "./validation";
import { submitApplication, SubmissionError } from "./submit";
import { applicationIntakeEnabled } from "./config";

const respond = (body: object, status: number, extra: Record<string, string> = {}) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...extra } });
async function readBody(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) throw new SubmissionError(415, "JSON_REQUIRED");
  if (Number(request.headers.get("content-length")) > 4096) throw new SubmissionError(413, "BODY_TOO_LARGE");
  const reader = request.body?.getReader();
  if (!reader) throw new SubmissionError(400, "INVALID_INPUT");
  let size = 0;
  const chunks: Uint8Array[] = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > 4096) { await reader.cancel(); throw new SubmissionError(413, "BODY_TOO_LARGE"); }
      chunks.push(value);
    }
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch (error) {
    if (error instanceof SubmissionError) throw error;
    throw new SubmissionError(400, "INVALID_INPUT");
  } finally { reader.releaseLock(); }
}
function validateOrigin(request: Request) {
  if (request.headers.get("sec-fetch-site") === "cross-site") throw new SubmissionError(403, "ORIGIN_REJECTED");
  const origin = request.headers.get("origin");
  if (!origin) return; // Non-browser clients still require JSON and persistent abuse limits.
  if (origin === "https://ulaskredi.com.tr") return;
  // Next may normalize request.url's hostname behind its local server adapter.
  // The explicit local-only mode still requires loopback Host + Origin and one port.
  if (process.env.APPLICATION_ALLOW_LOCAL === "true") {
    try {
      const supplied = new URL(origin);
      const host = new URL(`http://${request.headers.get("host") ?? new URL(request.url).host}`);
      const loopback = ["localhost", "127.0.0.1", "[::1]"];
      if (loopback.includes(host.hostname) && loopback.includes(supplied.hostname) && supplied.protocol === "http:" && supplied.port === host.port) return;
    } catch { /* Invalid Origin fails closed below. */ }
  }
  throw new SubmissionError(403, "ORIGIN_REJECTED");
}

export async function applicationPost(request: Request) {
  // Reject before reading personal data or reaching storage in this release.
  if (process.env.NODE_ENV === "production") {
    return respond({ ok: false, code: "APPLICATION_INTAKE_DISABLED", error: "Çevrimiçi başvuru kaydı kapalı. Telefon veya WhatsApp üzerinden iletişime geçebilirsiniz." }, 503);
  }
  try {
    validateOrigin(request);
    const raw = await readBody(request);
    if (raw && typeof raw === "object" && typeof raw.website === "string" && raw.website.trim()) {
      return respond({ ok: false, code: "SUBMISSION_REJECTED", error: "Gönderim işlenemedi." }, 202);
    }
    const parsed = applicationInput.safeParse(raw);
    const key = request.headers.get("idempotency-key");
    if (!parsed.success || !key || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(key)) {
      return respond({ ok: false, code: "INVALID_INPUT", error: "Alanları ve aydınlatma metnini okuduğunuza ilişkin seçimi kontrol edin. Not alanına kimlik, kart, şifre veya hassas bilgi yazmayın." }, 400);
    }
    if (!applicationIntakeEnabled()) throw new Error("APPLICATION_INTAKE_DISABLED");
    const result = await submitApplication(parsed.data, key, request);
    return respond({ ok: true, reference: result.reference, replayed: result.replayed, message: "Başvurunuz kaydedildi. Bu referans bir kredi onayı değildir." }, result.replayed ? 200 : 201);
  } catch (error) {
    if (error instanceof SubmissionError) {
      return respond({ ok: false, code: error.code, error: error.status === 429 ? "Çok sık gönderim yapıldı. Daha sonra tekrar deneyin." : "Gönderim tamamlanamadı. Bilgileri kontrol edin." }, error.status, error.status === 429 ? { "Retry-After": "60" } : {});
    }
    // Do not log bodies, connection errors, SQL, names, phone numbers or SMTP data.
    console.warn("application_submission_unavailable");
    return respond({ ok: false, code: "STORAGE_UNAVAILABLE", error: "Başvurunuzun kaydı doğrulanamadı. Aynı gönderimi tekrar deneyin." }, 503);
  }
}
