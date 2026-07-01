import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SiteShell, Section, SectionHeader } from "@/components/site/SiteShell";
import { ContactForm } from "@/components/site/ContactForm";
import { MapPin, Clock, Briefcase, X } from "lucide-react";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Вакансии — NEONRIG" },
      { name: "description", content: "Открытые вакансии NEONRIG в Алматы: сборщик ПК, менеджер по продажам, сервис-инженер." },
      { property: "og:title", content: "Вакансии — NEONRIG" },
      { property: "og:description", content: "Присоединяйтесь к команде NEONRIG в Алматы." },
    ],
  }),
  component: CareersPage,
});

function CareersPage() {
  const { t } = useTranslation();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const vacancies = t("careers.vacancies", { returnObjects: true }) as Array<{
    title: string;
    location: string;
    type: string;
    desc: string;
  }>;

  return (
    <SiteShell>
      <Section>
        <SectionHeader eyebrow="// Team" title={t("careers.title")} subtitle={t("careers.subtitle")} />
        <div className="grid gap-4">
          {vacancies.map((v, i) => (
            <div key={i} className="card-cyber p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <div className="flex-1">
                <h3 className="text-xl font-display font-bold">{v.title}</h3>
                <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground uppercase tracking-widest">
                  <span className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {v.location}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {v.type}</span>
                  <span className="inline-flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> NEONRIG</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{v.desc}</p>
              </div>
              <button className="btn-neon btn-neon-hover self-start md:self-center" onClick={() => setOpenIdx(i)}>
                {t("careers.apply")}
              </button>
            </div>
          ))}
        </div>
      </Section>

      {openIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm grid place-items-center p-4"
          onClick={() => setOpenIdx(null)}
        >
          <div
            className="card-cyber neon-border p-6 md:p-8 max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              onClick={() => setOpenIdx(null)}
              aria-label="close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-xs font-mono uppercase tracking-widest text-primary mb-2">
              {t("careers.apply")}
            </div>
            <h3 className="text-2xl font-display font-bold mb-6">{vacancies[openIdx].title}</h3>
            <ContactForm source={`careers_${openIdx}`} buildConfig={{ vacancy: vacancies[openIdx].title }} compact />
          </div>
        </div>
      )}
    </SiteShell>
  );
}
