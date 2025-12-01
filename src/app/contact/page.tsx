// src/app/contact/page.tsx
"use client";

import PageSection from "@/components/layout/PageSection";
import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
  consent: boolean;
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
    consent: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Please enter a valid email.";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "Message must be at least 10 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(null);
    if (!validate()) return;
    setSubmitting(true);

    // Simulate network: save message to localStorage (demo)
    await new Promise((r) => setTimeout(r, 700));
    try {
      const storage = JSON.parse(localStorage.getItem("ua_messages" ) || "[]");
      storage.unshift({
        id: Date.now(),
        name: form.name,
        email: form.email,
        message: form.message,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem("ua_messages", JSON.stringify(storage));
      setSuccess("Thanks — your message has been received. We'll reply soon.");
      setForm({ name: "", email: "", message: "", consent: true });
      setErrors({});
    } catch (err) {
      setSuccess("Unable to save message locally — try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <PageSection title="Contact" subtitle="We'd love to hear from you">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-surface p-4">
              <h3 className="mb-2 text-sm font-semibold">Customer support</h3>
              <p className="text-sm text-muted">Email <strong>hello@urbanarc.example</strong> for order help, returns, and product questions.</p>
            </div>

            <div className="rounded-lg border border-border bg-surface p-4">
              <h3 className="mb-2 text-sm font-semibold">Physical / Press enquiries</h3>
              <p className="text-sm text-muted">collabs@urbanarc.example</p>
            </div>

            <div className="rounded-lg border border-border bg-surface p-4">
              <h3 className="mb-2 text-sm font-semibold">Visit</h3>
              <p className="text-sm text-muted">We are an online-first studio, but we hold occasional pop-ups and events — subscribe for updates.</p>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-border bg-surface p-4">
              {success && <div className="rounded bg-green-600/20 p-3 text-sm text-green-200">{success}</div>}

              <div>
                <label className="mb-1 block text-xs font-semibold">Your name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm(s => ({ ...s, name: e.target.value }))}
                  className="w-full rounded border border-border bg-bg px-3 py-2 text-sm"
                  placeholder="Jane Doe"
                />
                {errors.name && <div className="mt-1 text-xs text-red-400">{errors.name}</div>}
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold">Email</label>
                <input
                  value={form.email}
                  onChange={(e) => setForm(s => ({ ...s, email: e.target.value }))}
                  className="w-full rounded border border-border bg-bg px-3 py-2 text-sm"
                  placeholder="you@example.com"
                  type="email"
                />
                {errors.email && <div className="mt-1 text-xs text-red-400">{errors.email}</div>}
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm(s => ({ ...s, message: e.target.value }))}
                  className="w-full min-h-[120px] rounded border border-border bg-bg px-3 py-2 text-sm"
                  placeholder="Tell us about your enquiry..."
                />
                {errors.message && <div className="mt-1 text-xs text-red-400">{errors.message}</div>}
              </div>

              <div className="flex items-start gap-2">
                <input
                  id="consent"
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => setForm(s => ({ ...s, consent: e.target.checked }))}
                  className="mt-1 h-4 w-4 rounded border border-border bg-bg"
                />
                <label htmlFor="consent" className="text-sm text-muted">I agree to be contacted regarding my inquiry.</label>
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  type="submit"
                  className="rounded bg-primary px-4 py-2 text-sm font-semibold text-black disabled:opacity-60"
                  disabled={submitting}
                >
                  {submitting ? "Sending…" : "Send message"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    // quick-help: open mail client if they prefer
                    window.location.href = `mailto:hello@urbanarc.example?subject=Contact%20from%20site&body=${encodeURIComponent(form.message || "")}`;
                  }}
                  className="rounded border border-border px-3 py-2 text-sm text-muted"
                >
                  Send by email
                </button>
              </div>

              <div className="text-xs text-muted">
                By sending you agree to our <a href="/privacy" className="underline text-muted">privacy policy</a>.
              </div>
            </form>
          </div>
        </div>
      </PageSection>
    </div>
  );
}
