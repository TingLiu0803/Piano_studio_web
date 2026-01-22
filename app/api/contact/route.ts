import { NextResponse } from "next/server";
import { insertLead } from "@/lib/db";

export const runtime = "nodejs";

const emailRegex = /.+@.+\..+/;

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

    insertLead({ name, email, phone, message, locale });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error", error);
    return NextResponse.json(
      { error: "Failed to submit" },
      { status: 500 }
    );
  }
}
