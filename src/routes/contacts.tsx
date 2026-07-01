import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteShell, Section, SectionHeader } from "@/components/site/SiteShell";
import { ContactForm } from "@/components/site/ContactForm";
import { MapPin, Clock, Phone, Mail, Send } from "lucide-react";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Контакты — NEONRIG" },
      { name: "description", content: "Свяжитесь с NEONRIG: адрес, телефон, e-mail, Telegram. Алматы, пр. Абая, 150." },
      { property: "og:title", content: "Контакты — NEONRIG" },
      { property: "og:description", content: "Как с нами связаться в Алматы." },
    ],
  }),
  component: ContactsPage,
});

function ContactsPage() {
  const { t } = useTranslation();
  return (
    <SiteShell>
      <Section>
        <SectionHeader eyebrow="// Reach us" title={t("contacts.title")} subtitle={t("contacts.subtitle")} />

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <InfoCard icon={<MapPin className="w-5 h-5" />} title="Address" value={t("contacts.address")} />
            <InfoCard icon={<Clock className="w-5 h-5" />} title="Hours" value={t("contacts.hours")} />
            <InfoCard icon={<Phone className="w-5 h-5" />} title="Phone" value={t("contacts.phone")} href={`tel:${t("contacts.phone").replace(/\D/g, "")}`} />
            <InfoCard icon={<Mail className="w-5 h-5" />} title="E-mail" value={t("contacts.email")} href={`mailto:${t("contacts.email")}`} />
            <InfoCard icon={<Send className="w-5 h-5" />} title="Telegram" value="@neonrig" href="https://t.me/neonrig" />
          </div>

          <div className="card-cyber neon-border p-6 md:p-8">
            <h3 className="text-2xl font-display font-bold mb-4">{t("contacts.formTitle")}</h3>
            <ContactForm source="contacts_page" />
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}

function InfoCard({
  icon,
  title,
  value,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <>
      <div className="w-11 h-11 rounded-md grid place-items-center bg-primary/10 text-primary">{icon}</div>
      <div>
        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{title}</div>
        <div className="mt-1 font-medium">{value}</div>
      </div>
    </>
  );
  const base = "card-cyber p-5 flex items-center gap-4 hover:border-primary/40 transition";
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={base}>
      {inner}
    </a>
  ) : (
    <div className={base}>{inner}</div>
  );
}
