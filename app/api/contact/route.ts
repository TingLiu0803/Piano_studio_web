import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { insertLead } from "@/lib/db";
import { siteConfig } from "@/content/site";

export const runtime = "nodejs";

const emailRegex = /.+@.+\..+/;

async function sendLeadEmail(details: {
  name: string;
  email: string;
  phone: string;
  message: string;
  locale: string;
}) {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpUser || !smtpPass) {
    console.warn("SMTP credentials missing; skipping email notification.");
    return;
  }

  const host = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT ?? "465");
  const secure = port === 465;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? smtpUser;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const text = [
    "New piano lesson inquiry",
    "",
    `Name: ${details.name}`,
    `Email: ${details.email}`,
    `Phone: ${details.phone || "Not provided"}`,
    `Locale: ${details.locale}`,
    "",
    "Message:",
    details.message || "Not provided",
  ].join("\n");

  await transporter.sendMail({
    from: fromEmail,
    to: toEmail,
    replyTo: details.email,
    subject: `New inquiry from ${details.name}`,
    text,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const message = String(body.message || "").trim();
    const locale = String(body.locale || "en").trim();

    if (!name || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid name or email" },
        { status: 400 }
      );
    }

    try {
      insertLead({ name, email, phone, message, locale });
    } catch (dbError) {
      console.warn("Lead database write failed; continuing", dbError);
    }
    await sendLeadEmail({ name, email, phone, message, locale });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error", error);
    return NextResponse.json(
      { error: "Failed to submit" },
      { status: 500 }
    );
  }
}
