import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

const LANGS = [
  { code: "ru", label: "RU" },
  { code: "kz", label: "KZ" },
  { code: "en", label: "EN" },
] as const;

export function LangSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const current = (i18n.resolvedLanguage || "ru").toLowerCase().slice(0, 2);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = current;
    }
  }, [current]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-border hover:border-primary/60 text-xs font-mono uppercase tracking-widest"
        aria-label="language"
      >
        <Globe className="w-3.5 h-3.5" />
        {LANGS.find((l) => l.code === current)?.label ?? "RU"}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-28 rounded-md border border-border bg-popover shadow-xl overflow-hidden z-50">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                i18n.changeLanguage(l.code);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs font-mono uppercase tracking-widest hover:bg-muted ${
                current === l.code ? "text-primary" : "text-foreground"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
