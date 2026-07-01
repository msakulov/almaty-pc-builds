import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteShell, Section, SectionHeader } from "@/components/site/SiteShell";
import { ContactForm } from "@/components/site/ContactForm";
import { ArrowRight, Shield, Zap, Wrench, Gauge } from "lucide-react";
import heroImg from "@/assets/hero-pc.jpg";
import componentsImg from "@/assets/components.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { t } = useTranslation();
  const features = t("home.features.items", { returnObjects: true }) as Array<{ title: string; desc: string }>;
  const icons = [Shield, Zap, Wrench, Gauge];

  const categories = [
    { key: "office", accent: "cyan" },
    { key: "study", accent: "magenta" },
    { key: "gaming", accent: "cyan" },
    { key: "pro", accent: "magenta" },
  ] as const;

  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative bg-hero overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32 grid lg:grid-cols-2 gap-10 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/40 text-xs font-mono uppercase tracking-widest text-primary mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {t("home.hero.badge")}
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black leading-[1.05] whitespace-pre-line">
              {t("home.hero.title").split("\n").map((line, i) => (
                <span key={i} className={i === 1 ? "text-gradient-neon block" : "block"}>
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">{t("home.hero.subtitle")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/constructor" className="btn-neon btn-neon-hover inline-flex items-center gap-2">
                {t("home.hero.primary")} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/builds" className="btn-outline-neon inline-flex items-center gap-2">
                {t("home.hero.secondary")}
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl rounded-full" />
            <img
              src={heroImg}
              alt="Neon cyberpunk PC build with RGB lighting"
              width={1600}
              height={1024}
              className="relative rounded-2xl border border-border shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <Section>
        <SectionHeader eyebrow="// System check" title={t("home.features.title")} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => {
            const Icon = icons[i] ?? Shield;
            return (
              <div key={i} className="card-cyber p-6 hover:border-primary/40 transition group">
                <div className="w-11 h-11 rounded-md grid place-items-center bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-background transition">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* CATEGORIES */}
      <Section className="pt-0">
        <SectionHeader
          eyebrow="// Categories"
          title={t("home.catalog.title")}
          subtitle={t("home.catalog.subtitle")}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((c) => {
            const cat = t(`builds.categories.${c.key}`, { returnObjects: true }) as {
              name: string;
              short: string;
              builds: Array<{ price: number }>;
            };
            const min = Math.min(...cat.builds.map((b) => b.price));
            return (
              <Link
                key={c.key}
                to="/builds/$type"
                params={{ type: c.key }}
                className={`card-cyber p-6 flex flex-col group hover:${c.accent === "cyan" ? "neon-border" : "neon-border-magenta"} transition`}
              >
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  {c.key}
                </div>
                <h3 className="mt-2 text-2xl font-display font-bold">{cat.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground flex-1">{cat.short}</p>
                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-widest">
                      {t("builds.from")}
                    </div>
                    <div className={`text-lg font-display font-bold ${c.accent === "cyan" ? "text-primary" : "text-accent"}`}>
                      {min.toLocaleString("ru-RU")} ₸
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* IMAGE STRIP */}
      <div className="relative overflow-hidden border-y border-border">
        <img
          src={componentsImg}
          alt="Computer components close-up"
          width={1400}
          height={900}
          loading="lazy"
          className="w-full h-64 md:h-96 object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      {/* CTA */}
      <Section>
        <div className="card-cyber neon-border p-8 md:p-12 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl md:text-4xl font-display font-bold">
              {t("home.cta.title")}
            </h3>
            <p className="mt-3 text-muted-foreground">{t("home.cta.desc")}</p>
          </div>
          <ContactForm source="home_cta" />
        </div>
      </Section>
    </SiteShell>
  );
}
