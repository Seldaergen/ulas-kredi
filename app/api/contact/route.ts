// app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safe(s: unknown, max = 500) {
  return String(s ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const name = safe(body?.name, 80);
    const phone = safe(body?.phone, 40);
    const creditType = safe(body?.creditType, 60);
    const note = safe(body?.note, 1200);

    // Honeypot (istersen formda gizli inputla doldurtacağız)
    const website = safe(body?.website, 80);
    if (website) return NextResponse.json({ ok: true }, { status: 200 });

    if (!name || !phone || !creditType) {
      return NextResponse.json(
        { ok: false, error: "Eksik alan var (ad/telefon/kredi türü)." },
        { status: 400 }
      );
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      CONTACT_TO_EMAIL,
      CONTACT_FROM_EMAIL,
    } = process.env;

    if (
      !SMTP_HOST ||
      !SMTP_PORT ||
      !SMTP_USER ||
      !SMTP_PASS ||
      !CONTACT_TO_EMAIL ||
      !CONTACT_FROM_EMAIL
    ) {
      return NextResponse.json(
        { ok: false, error: "Server mail ENV ayarları eksik." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const subject = `Ulaş Kredi | Yeni Ön Başvuru: ${name}`;

    const text =
      `Yeni ön başvuru\n\n` +
      `Ad Soyad: ${name}\n` +
      `Telefon: ${phone}\n` +
      `Kredi Türü: ${creditType}\n` +
      (note ? `Not: ${note}\n` : "");

    const html =
      `<h2>Yeni Ön Başvuru</h2>` +
      `<p><b>Ad Soyad:</b> ${escapeHtml(name)}</p>` +
      `<p><b>Telefon:</b> ${escapeHtml(phone)}</p>` +
      `<p><b>Kredi Türü:</b> ${escapeHtml(creditType)}</p>` +
      (note
        ? `<p><b>Not:</b><br/>${escapeHtml(note).replaceAll("\n", "<br/>")}</p>`
        : "");

    await transporter.sendMail({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Mail gönderilemedi." },
      { status: 500 }
    );
  }
}
