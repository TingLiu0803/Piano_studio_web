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
        <Input id="cf-name" name="name" label="Name / 姓名" required />
        <Input id="cf-email" name="email" type="email" label="Email / 邮箱" required />
      </div>
      <Input id="cf-phone" name="phone" type="tel" label="Phone (optional) / 电话" />
      <Input
        id="cf-message"
        name="message"
        multiline
        label="Tell us about the student / 简要说明学习需求"
      />
      <div>
        <Button type="submit" variant="primary" size="lg">
          {submitLabel}
        </Button>
      </div>
      {status === "success" && (
        <p className="text-sm font-bold text-[color:var(--success)]">{successMessage}</p>
      )}
      {status === "error" && (
        <p className="text-sm font-bold text-[color:var(--error)]">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
