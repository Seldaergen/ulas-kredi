import { NextResponse } from "next/server";
import { applicationConfig, applicationIntakeEnabled } from "@/lib/applications/config";
import { APPLICATION_PRIVACY_VERSION } from "@/lib/applications/validation";

export const dynamic = "force-dynamic";
export async function GET() {
  try {
    if (!applicationIntakeEnabled()) throw new Error("APPLICATION_INTAKE_DISABLED");
    const { retentionDays, owner } = applicationConfig();
    return NextResponse.json({ enabled: true, privacyVersion: APPLICATION_PRIVACY_VERSION, retentionDays, controllerLabel: owner, testEnvironment: process.env.APPLICATION_ALLOW_LOCAL === "true" }, { headers: { "Cache-Control": "no-store" } });
  } catch { return NextResponse.json({ enabled: false }, { status: 503, headers: { "Cache-Control": "no-store" } }); }
}
