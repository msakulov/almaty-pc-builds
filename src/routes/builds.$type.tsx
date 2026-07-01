import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteShell, Section } from "@/components/site/SiteShell";
import { ContactForm } from "@/components/site/ContactForm";
import { Cpu, MemoryStick, HardDrive, MonitorPlay, Check, ArrowLeft } from "lucide-react";

const VALID = ["office", "study", "gaming", "pro"] as const;
type BuildType = (typeof VALID)[number];

export const Route = createFileRoute("/builds/$type")({
  beforeLoad: ({ params }) => {
    if (!VALID.includes(params.type as BuildType)) throw notFound();
  },
  component: BuildTypePage,
});

function BuildTypePage() {
  const { type } = Route.useParams();
  const { t } = useTranslation();
  const cat = t(`builds.categories.${type}`, { returnObjects: true }) as {
    name: string;
    desc: string;
    for: string[];
    builds: Array<{ name: string; price: number; cpu: string; gpu: string; ram: string; ssd: string }>;
  };

  return (
    <SiteShell>
      <Section>
        <Link to="/builds" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4" /> {t("nav.builds")}
        </Link>
        <div className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-3">// {type}</div>
        <h1 className="text-4xl md:text-6xl font-display font-black">{cat.name}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">{cat.desc}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {cat.for.map((f) => (
            <span
              key={f}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted text-sm"
            >
              <Check className="w-3.5 h-3.5 text-primary" /> {f}
            </span>
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {cat.builds.map((b, i) => (
            <div key={i} className={`card-cyber p-6 ${i === 0 ? "" : "neon-border-magenta"}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    {t("builds.detail.specs")}
                  </div>
                  <h3 className="text-2xl font-display font-bold mt-1">{b.name}</h3>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground uppercase tracking-widest">
                    {t("builds.from")}
                  </div>
                  <div className="text-2xl font-display font-black text-gradient-neon">
                    {b.price.toLocaleString("ru-RU")} ₸
                  </div>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <SpecRow icon={<Cpu className="w-4 h-4" />} label={t("builds.detail.cpu")} value={b.cpu} />
                <SpecRow icon={<MonitorPlay className="w-4 h-4" />} label={t("builds.detail.gpu")} value={b.gpu} />
                <SpecRow icon={<MemoryStick className="w-4 h-4" />} label={t("builds.detail.ram")} value={b.ram} />
                <SpecRow icon={<HardDrive className="w-4 h-4" />} label={t("builds.detail.ssd")} value={b.ssd} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 card-cyber p-8">
          <h3 className="text-2xl font-display font-bold mb-4">{t("builds.detail.order")}</h3>
          <ContactForm source={`build_${type}`} buildConfig={{ category: type }} />
        </div>
      </Section>
    </SiteShell>
  );
}

function SpecRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <div className="text-primary mt-0.5">{icon}</div>
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}
