"use client";

import { useState } from "react";
import type { Locale } from "@/content/site";
import { sendGaEvent } from "@/lib/analytics-events";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

type ContactFormProps = {
  locale: Locale;
  submitLabel: string;
  successMessage: string;
  /** Optional GA page_type (e.g. contact | trial). */
  pageType?: string;
};

function pagePath(): string {
  if (typeof window === "undefined") return "";
  return window.location.pathname;
}

export default function ContactForm({
  locale,
  submitLabel,
  successMessage,
  pageType = "contact",
}: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [started, setStarted] = useState(false);

  const t =
    locale === "en"
      ? {
          name: "Name",
          email: "Email",
          phone: "Phone (optional)",
          message: "Tell us about the student",
          error: "Something went wrong. Please try again or email the studio directly.",
        }
      : {
          name: "姓名",
          email: "邮箱",
          phone: "电话（选填）",
          message: "简要说明学习需求",
          error: "出错了，请稍后重试，或直接发邮件联系工作室。",
        };

  function markFormStart() {
    if (started) return;
    setStarted(true);
    sendGaEvent("contact_form_start", {
      page_path: pagePath(),
      page_type: pageType,
      language: locale,
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const path = pagePath();

    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        message: formData.get("message"),
        locale,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      form.reset();
      setStatus("success");
      setStarted(false);
      sendGaEvent("contact_form_submit_success", {
        page_path: path,
        page_type: pageType,
        language: locale,
      });
      // Keep legacy event names for existing GA4 explorations.
      sendGaEvent("contact_submit", { placement: "contact_form", page_path: path });
      sendGaEvent("generate_lead", { source: "contact_form", page_path: path });
    } else {
      setStatus("error");
      sendGaEvent("contact_form_submit_error", {
        page_path: path,
        page_type: pageType,
        language: locale,
        status: response.status,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" onFocus={markFormStart}>
      <div className="grid gap-4 md:grid-cols-2">
        <Input id="cf-name" name="name" label={t.name} required />
        <Input id="cf-email" name="email" type="email" label={t.email} required />
      </div>
      <Input id="cf-phone" name="phone" type="tel" label={t.phone} />
      <Input id="cf-message" name="message" multiline label={t.message} />
      <div>
        <Button type="submit" variant="primary" size="lg">
          {submitLabel}
        </Button>
      </div>
      {status === "success" && (
        <p className="text-sm font-bold text-[color:var(--success)]">{successMessage}</p>
      )}
      {status === "error" && (
        <p className="text-sm font-bold text-[color:var(--error)]">{t.error}</p>
      )}
    </form>
  );
}
