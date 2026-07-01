import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/lib/leads.functions";
import { toast } from "sonner";

interface Props {
  source?: string;
  buildConfig?: Record<string, unknown>;
  compact?: boolean;
}

function makeCaptcha() {
  return {
    a: Math.floor(Math.random() * 8) + 2,
    b: Math.floor(Math.random() * 8) + 2,
  };
}

export function ContactForm({ source = "contact_form", buildConfig, compact }: Props) {
  const { t, i18n } = useTranslation();
  const submit = useServerFn(submitLead);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [captcha, setCaptcha] = useState({ a: 3, b: 4 }); // deterministic for SSR
  const [captchaAnswer, setCaptchaAnswer] = useState("");

  // Randomize on client after mount to avoid hydration mismatch
  useEffect(() => {
    setCaptcha(makeCaptcha());
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    if (parseInt(captchaAnswer, 10) !== captcha.a + captcha.b) {
      toast.error(t("contacts.captchaError"));
      setCaptcha(makeCaptcha());
      setCaptchaAnswer("");
      return;
    }
    setLoading(true);
    try {
      await submit({
        data: {
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim() || undefined,
          message: form.message.trim() || undefined,
          source,
          language: (i18n.resolvedLanguage?.slice(0, 2) as "ru" | "kz" | "en") ?? "ru",
          build_config: buildConfig,
        },
      });
      toast.success(t("contacts.success"));
      setForm({ name: "", phone: "", email: "", message: "" });
      setCaptcha(makeCaptcha());
      setCaptchaAnswer("");
    } catch (err) {
      console.error(err);
      toast.error(t("contacts.error"));
    } finally {
      setLoading(false);
    }
  }

  const input =
    "w-full bg-input/60 border border-border focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-md px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground";

  return (
    <form onSubmit={onSubmit} className={`grid gap-3 ${compact ? "" : "md:grid-cols-2"}`}>
      <input
        className={input}
        placeholder={t("contacts.fields.name")}
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
        maxLength={100}
      />
      <input
        className={input}
        placeholder={t("contacts.fields.phone")}
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        required
        maxLength={30}
        inputMode="tel"
      />
      <input
        className={`${input} ${compact ? "" : "md:col-span-2"}`}
        placeholder={t("contacts.fields.email")}
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        type="email"
        maxLength={200}
      />
      <textarea
        className={`${input} ${compact ? "" : "md:col-span-2"} min-h-28 resize-y`}
        placeholder={t("contacts.fields.message")}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        maxLength={2000}
      />
      <div className={`${compact ? "" : "md:col-span-2"} flex items-center gap-3 rounded-md border border-border bg-input/40 px-4 py-3`}>
        <span className="text-sm font-mono text-muted-foreground whitespace-nowrap">
          {t("contacts.captcha", { a: captcha.a, b: captcha.b })}
        </span>
        <input
          className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
          placeholder={t("contacts.captchaPlaceholder")}
          value={captchaAnswer}
          onChange={(e) => setCaptchaAnswer(e.target.value.replace(/\D/g, "").slice(0, 3))}
          inputMode="numeric"
          required
          aria-label="captcha"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`${compact ? "" : "md:col-span-2"} btn-neon btn-neon-hover disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        {loading ? t("cta.sending") : t("cta.submit")}
      </button>
    </form>
  );
}
