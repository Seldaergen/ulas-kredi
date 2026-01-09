export const runtime = "nodejs";

export async function GET() {
  return Response.json({
    ok: true,
    service: "ulas-kredi",
    ts: new Date().toISOString(),
  });
}
