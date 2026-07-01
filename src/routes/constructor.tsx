import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { SiteShell, Section } from "@/components/site/SiteShell";
import { ContactForm } from "@/components/site/ContactForm";
import { RotateCcw, Cpu, MemoryStick, HardDrive, MonitorPlay, Fan, Box, Zap, CircuitBoard } from "lucide-react";

export const Route = createFileRoute("/constructor")({
  head: () => ({
    meta: [
      { title: "Конструктор сборки ПК — NEONRIG" },
      { name: "description", content: "Соберите ПК под свои задачи: выберите CPU, GPU, память, охлаждение — мы посчитаем и соберём." },
      { property: "og:title", content: "Конструктор сборки ПК" },
      { property: "og:description", content: "Онлайн-конструктор: подбор комплектующих и мгновенный расчёт цены." },
    ],
  }),
  component: ConstructorPage,
});

type Part = { id: string; label: string; price: number };
type PartKey = "cpu" | "motherboard" | "gpu" | "ram" | "storage" | "psu" | "case" | "cooling";

const OPTIONS: Record<PartKey, Part[]> = {
  cpu: [
    { id: "i3", label: "Intel Core i3-14100", price: 78000 },
    { id: "i5", label: "Intel Core i5-14400F", price: 125000 },
    { id: "i7", label: "Intel Core i7-14700K", price: 260000 },
    { id: "i9", label: "Intel Core i9-14900K", price: 380000 },
    { id: "r5", label: "AMD Ryzen 5 7600", price: 135000 },
    { id: "r7", label: "AMD Ryzen 7 7800X3D", price: 280000 },
    { id: "r9", label: "AMD Ryzen 9 7950X", price: 380000 },
  ],
  motherboard: [
    { id: "b760", label: "MSI PRO B760M-A", price: 68000 },
    { id: "z790", label: "ASUS ROG Strix Z790-A", price: 195000 },
    { id: "b650", label: "Gigabyte B650 AORUS", price: 92000 },
    { id: "x670", label: "ASUS ROG Crosshair X670E", price: 260000 },
  ],
  gpu: [
    { id: "igp", label: "Integrated Graphics", price: 0 },
    { id: "4060", label: "RTX 4060 8GB", price: 175000 },
    { id: "4070", label: "RTX 4070 Super 12GB", price: 330000 },
    { id: "4070ti", label: "RTX 4070 Ti Super 16GB", price: 460000 },
    { id: "4080", label: "RTX 4080 Super 16GB", price: 620000 },
    { id: "4090", label: "RTX 4090 24GB", price: 990000 },
  ],
  ram: [
    { id: "16d4", label: "16 GB DDR4 3200", price: 28000 },
    { id: "32d5", label: "32 GB DDR5 6000", price: 78000 },
    { id: "64d5", label: "64 GB DDR5 6400", price: 165000 },
    { id: "128ecc", label: "128 GB DDR5 ECC", price: 620000 },
  ],
  storage: [
    { id: "500", label: "500 GB NVMe Gen4", price: 26000 },
    { id: "1t", label: "1 TB NVMe Gen4", price: 48000 },
    { id: "2t", label: "2 TB NVMe Gen4", price: 92000 },
    { id: "4t", label: "4 TB NVMe Gen5", price: 240000 },
  ],
  psu: [
    { id: "650", label: "650W Gold", price: 32000 },
    { id: "850", label: "850W Gold", price: 55000 },
    { id: "1000", label: "1000W Platinum", price: 92000 },
    { id: "1300", label: "1300W Platinum", price: 165000 },
  ],
  case: [
    { id: "atx", label: "Mid Tower ATX", price: 32000 },
    { id: "glass", label: "Tempered Glass RGB", price: 58000 },
    { id: "full", label: "Full Tower Premium", price: 120000 },
  ],
  cooling: [
    { id: "air", label: "Air Cooler 4-heat pipe", price: 15000 },
    { id: "aio240", label: "AIO 240mm RGB", price: 55000 },
    { id: "aio360", label: "AIO 360mm ARGB", price: 92000 },
    { id: "custom", label: "Custom Water Loop", price: 320000 },
  ],
};

const ICONS: Record<PartKey, React.ComponentType<{ className?: string }>> = {
  cpu: Cpu,
  motherboard: CircuitBoard,
  gpu: MonitorPlay,
  ram: MemoryStick,
  storage: HardDrive,
  psu: Zap,
  case: Box,
  cooling: Fan,
};

function ConstructorPage() {
  const { t } = useTranslation();
  const [selection, setSelection] = useState<Partial<Record<PartKey, string>>>({});

  const total = useMemo(
    () =>
      (Object.keys(OPTIONS) as PartKey[]).reduce((sum, key) => {
        const id = selection[key];
        const opt = OPTIONS[key].find((o) => o.id === id);
        return sum + (opt?.price ?? 0);
      }, 0),
    [selection],
  );

  const buildConfig = useMemo(
    () =>
      Object.fromEntries(
        (Object.keys(OPTIONS) as PartKey[]).map((k) => {
          const opt = OPTIONS[k].find((o) => o.id === selection[k]);
          return [k, opt ? { name: opt.label, price: opt.price } : null];
        }),
      ),
    [selection],
  );

  return (
    <SiteShell>
      <Section>
        <div className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-3">// Configurator</div>
        <h1 className="text-4xl md:text-6xl font-display font-black">{t("constructor.title")}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">{t("constructor.subtitle")}</p>

        <div className="mt-10 grid lg:grid-cols-[1fr,380px] gap-6">
          <div className="grid sm:grid-cols-2 gap-4">
            {(Object.keys(OPTIONS) as PartKey[]).map((key) => {
              const Icon = ICONS[key];
              const opts = OPTIONS[key];
              const selectedId = selection[key];
              return (
                <div key={key} className="card-cyber p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-4 h-4 text-primary" />
                    <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                      {t(`constructor.parts.${key}`)}
                    </div>
                  </div>
                  <select
                    className="w-full bg-input/70 border border-border rounded-md px-3 py-2.5 text-sm focus:border-primary outline-none"
                    value={selectedId ?? ""}
                    onChange={(e) => setSelection((prev) => ({ ...prev, [key]: e.target.value || undefined }))}
                  >
                    <option value="">{t("constructor.empty")}</option>
                    {opts.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.label} — {o.price.toLocaleString("ru-RU")} ₸
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>

          <aside className="card-cyber neon-border p-6 h-fit lg:sticky lg:top-24">
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              {t("constructor.total")}
            </div>
            <div className="mt-2 text-4xl font-display font-black text-gradient-neon">
              {total.toLocaleString("ru-RU")} ₸
            </div>

            <button
              onClick={() => setSelection({})}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 py-2 rounded-md border border-border text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="w-3.5 h-3.5" /> {t("constructor.reset")}
            </button>

            <div className="mt-6 pt-6 border-t border-border">
              <ContactForm source="constructor" buildConfig={buildConfig} compact />
            </div>
          </aside>
        </div>
      </Section>
    </SiteShell>
  );
}
