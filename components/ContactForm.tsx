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
          className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm dark:border-zinc-800 dark:bg-zinc-900"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email / 邮箱"
          className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm dark:border-zinc-800 dark:bg-zinc-900"
        />
      </div>
      <input
        name="phone"
        placeholder="Phone (optional) / 电话"
        className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm dark:border-zinc-800 dark:bg-zinc-900"
      />
      <textarea
        name="message"
        rows={5}
        placeholder="Tell us about the student / 简要说明学习需求"
        className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm dark:border-zinc-800 dark:bg-zinc-900"
      />
      <button
        type="submit"
        className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
      >
        {submitLabel}
      </button>
      {status === "success" && (
        <p className="text-sm text-emerald-600">{successMessage}</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
