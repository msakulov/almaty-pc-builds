import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteShell, Section, SectionHeader } from "@/components/site/SiteShell";
import workshopImg from "@/assets/workshop.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "О нас — NEONRIG" },
      { name: "description", content: "NEONRIG — команда инженеров и энтузиастов в Алматы, собираем ПК с 2018 года." },
      { property: "og:title", content: "О компании NEONRIG" },
      { property: "og:description", content: "Инженеры и энтузиасты, собравшие 5000+ ПК в Алматы." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useTranslation();
  const stats = t("about.stats", { returnObjects: true }) as Array<{ value: string; label: string }>;
  const values = t("about.values.items", { returnObjects: true }) as Array<{ title: string; desc: string }>;

  return (
    <SiteShell>
      <Section>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-3">
              // Company
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-black">{t("about.title")}</h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">{t("about.lead")}</p>
          </div>
          <img
            src={workshopImg}
            alt="NEONRIG assembly workshop"
            width={1400}
            height={900}
            loading="lazy"
            className="rounded-2xl border border-border"
          />
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="card-cyber p-6 text-center">
              <div className="text-4xl font-display font-black text-gradient-neon">{s.value}</div>
              <div className="mt-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeader eyebrow="// Values" title={t("about.values.title")} />
        <div className="grid md:grid-cols-3 gap-4">
          {values.map((v, i) => (
            <div key={i} className="card-cyber p-6">
              <div className="text-primary font-mono text-sm">0{i + 1}</div>
              <h3 className="mt-2 font-display font-bold text-xl">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </SiteShell>
  );
}
