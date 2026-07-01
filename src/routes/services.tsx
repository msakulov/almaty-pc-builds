import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteShell, Section, SectionHeader } from "@/components/site/SiteShell";
import { Wrench, Search, ArrowUpCircle, Sparkles, Download, Truck } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Услуги — NEONRIG" },
      { name: "description", content: "Сборка ПК, диагностика, апгрейд, чистка, установка ОС и выездная поддержка в Алматы." },
      { property: "og:title", content: "Услуги — NEONRIG" },
      { property: "og:description", content: "Полный цикл сервисных услуг для ПК в Алматы." },
    ],
  }),
  component: ServicesPage,
});

const ICONS = [Wrench, Search, ArrowUpCircle, Sparkles, Download, Truck];

function ServicesPage() {
  const { t } = useTranslation();
  const items = t("services.items", { returnObjects: true }) as Array<{
    title: string;
    desc: string;
    price: number;
  }>;

  return (
    <SiteShell>
      <Section>
        <SectionHeader eyebrow="// Services" title={t("services.title")} subtitle={t("services.subtitle")} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((s, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div key={i} className="card-cyber p-6 hover:border-primary/50 transition group">
                <div className="w-11 h-11 rounded-md grid place-items-center bg-primary/10 text-primary mb-4 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent group-hover:text-background transition">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <div className="mt-5 pt-4 border-t border-border flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">{t("prices.from")}</span>
                  <span className="text-lg font-display font-bold text-gradient-neon">
                    {s.price.toLocaleString("ru-RU")} ₸
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </SiteShell>
  );
}
