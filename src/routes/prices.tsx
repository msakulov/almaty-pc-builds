import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteShell, Section, SectionHeader } from "@/components/site/SiteShell";

export const Route = createFileRoute("/prices")({
  head: () => ({
    meta: [
      { title: "Цены — NEONRIG" },
      { name: "description", content: "Прозрачные цены на сборки ПК и сервисные услуги в Алматы." },
      { property: "og:title", content: "Цены — NEONRIG" },
      { property: "og:description", content: "Стоимость готовых сборок и услуг: сборка, диагностика, апгрейд." },
    ],
  }),
  component: PricesPage,
});

const CATS = ["office", "study", "gaming", "pro"] as const;

function PricesPage() {
  const { t } = useTranslation();
  const services = t("services.items", { returnObjects: true }) as Array<{
    title: string;
    desc: string;
    price: number;
  }>;

  return (
    <SiteShell>
      <Section>
        <SectionHeader eyebrow="// Pricing" title={t("prices.title")} subtitle={t("prices.subtitle")} />

        <div className="card-cyber overflow-hidden mb-10">
          <div className="px-6 py-4 border-b border-border bg-surface-2">
            <h3 className="font-display font-bold text-lg">{t("prices.tableBuild")}</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-widest text-muted-foreground border-b border-border">
                <th className="px-6 py-3">{t("prices.category")}</th>
                <th className="px-6 py-3">CPU / GPU</th>
                <th className="px-6 py-3 text-right">{t("prices.from")}</th>
              </tr>
            </thead>
            <tbody>
              {CATS.map((k) => {
                const cat = t(`builds.categories.${k}`, { returnObjects: true }) as {
                  name: string;
                  builds: Array<{ price: number; cpu: string; gpu: string }>;
                };
                return cat.builds.map((b, i) => (
                  <tr key={`${k}-${i}`} className="border-b border-border/50 hover:bg-muted/40">
                    <td className="px-6 py-4 font-medium">{i === 0 ? cat.name : ""}</td>
                    <td className="px-6 py-4 text-muted-foreground">{b.cpu} · {b.gpu}</td>
                    <td className="px-6 py-4 text-right font-display font-bold text-primary">
                      {b.price.toLocaleString("ru-RU")} {t("prices.tenge")}
                    </td>
                  </tr>
                ));
              })}
            </tbody>
          </table>
        </div>

        <div className="card-cyber overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-surface-2">
            <h3 className="font-display font-bold text-lg">{t("prices.tableService")}</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-widest text-muted-foreground border-b border-border">
                <th className="px-6 py-3">{t("prices.category")}</th>
                <th className="px-6 py-3 text-right">{t("prices.from")}</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s, i) => (
                <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-muted/40">
                  <td className="px-6 py-4">
                    <div className="font-medium">{s.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{s.desc}</div>
                  </td>
                  <td className="px-6 py-4 text-right font-display font-bold text-accent">
                    {s.price.toLocaleString("ru-RU")} {t("prices.tenge")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </SiteShell>
  );
}
