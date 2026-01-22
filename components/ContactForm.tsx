"use client";

import { useState } from "react";
import type { Locale } from "@/content/site";

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
    } else {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <input
          name="name"
          required
          placeholder="Name / 姓名"
          className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--foreground)] placeholder:text-[color:var(--muted-foreground)]"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email / 邮箱"
          className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--foreground)] placeholder:text-[color:var(--muted-foreground)]"
        />
      </div>
      <input
        name="phone"
        placeholder="Phone (optional) / 电话"
        className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--foreground)] placeholder:text-[color:var(--muted-foreground)]"
      />
      <textarea
        name="message"
        rows={5}
        placeholder="Tell us about the student / 简要说明学习需求"
        className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--foreground)] placeholder:text-[color:var(--muted-foreground)]"
      />
      <button
        type="submit"
        className="rounded-full bg-[color:var(--primary)] px-6 py-3 text-sm font-semibold text-[color:var(--primary-foreground)] transition hover:bg-[color:var(--primary-hover)]"
      >
        {submitLabel}
      </button>
      {status === "success" && (
        <p className="text-sm text-[color:var(--success)]">{successMessage}</p>
      )}
      {status === "error" && (
        <p className="text-sm text-[color:var(--error)]">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
