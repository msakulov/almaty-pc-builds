import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteShell, Section, SectionHeader } from "@/components/site/SiteShell";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/builds/")({
  head: () => ({
    meta: [
      { title: "Сборки ПК — NEONRIG" },
      { name: "description", content: "Готовые сборки ПК для офиса, учёбы, работы, игр и ресурсоёмких задач." },
      { property: "og:title", content: "Сборки ПК — NEONRIG" },
      { property: "og:description", content: "Конфигурации для любых задач: офис, учёба, гейминг, рендер и AI." },
    ],
  }),
  component: BuildsIndex,
});

const CATS = ["office", "study", "gaming", "pro"] as const;

function BuildsIndex() {
  const { t } = useTranslation();

  return (
    <SiteShell>
      <Section>
        <SectionHeader eyebrow="// Catalog" title={t("builds.title")} subtitle={t("builds.subtitle")} />
        <div className="grid md:grid-cols-2 gap-5">
          {CATS.map((key) => {
            const cat = t(`builds.categories.${key}`, { returnObjects: true }) as {
              name: string;
              desc: string;
              builds: Array<{ name: string; price: number }>;
            };
            const min = Math.min(...cat.builds.map((b) => b.price));
            return (
              <Link
                key={key}
                to="/builds/$type"
                params={{ type: key }}
                className="card-cyber p-7 group hover:border-primary/50 transition"
              >
                <div className="text-xs font-mono uppercase tracking-widest text-primary">{key}</div>
                <h3 className="mt-2 text-2xl font-display font-bold">{cat.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{cat.desc}</p>
                <div className="mt-6 flex items-end justify-between">
                  <div className="text-lg font-display font-bold text-gradient-neon">
                    {t("builds.from")} {min.toLocaleString("ru-RU")} ₸
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </div>
              </Link>
            );
          })}
        </div>
      </Section>
    </SiteShell>
  );
}
