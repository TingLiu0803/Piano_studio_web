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
};

export default function ContactForm({
  locale,
  submitLabel,
  successMessage,
}: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const t =
    locale === "en"
      ? {
          name: "Name",
          email: "Email",
          phone: "Phone (optional)",
          message: "Tell us about the student",
          error: "Something went wrong. Please try again.",
        }
      : {
          name: "姓名",
          email: "邮箱",
          phone: "电话（选填）",
          message: "简要说明学习需求",
          error: "出错了，请稍后重试。",
        };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");
    const form = event.currentTarget;
    const formData = new FormData(form);

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
      sendGaEvent("contact_submit", { placement: "contact_form" });
      sendGaEvent("generate_lead", { source: "contact_form" });
    } else {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
