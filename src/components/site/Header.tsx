import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Menu, X, Cpu } from "lucide-react";
import { LangSwitcher } from "./LangSwitcher";

export function Header() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    { to: "/builds", label: t("nav.builds") },
    { to: "/constructor", label: t("nav.constructor") },
    { to: "/prices", label: t("nav.prices") },
    { to: "/services", label: t("nav.services") },
    { to: "/careers", label: t("nav.careers") },
    { to: "/contacts", label: t("nav.contacts") },
  ] as const;

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <div className="w-8 h-8 rounded-md grid place-items-center bg-gradient-to-br from-primary to-accent shadow-neon-cyan">
            <Cpu className="w-4 h-4 text-background" strokeWidth={3} />
          </div>
          <span className="font-display font-black tracking-widest text-lg">
            NEON<span className="text-gradient-neon">RIG</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
              activeProps={{ className: "px-3 py-2 text-sm font-medium text-primary uppercase tracking-wider" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitcher />
          <button
            className="lg:hidden p-2 rounded-md hover:bg-muted"
            onClick={() => setOpen((v) => !v)}
            aria-label="menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-border bg-background/95">
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 px-2 text-sm font-medium uppercase tracking-wider text-muted-foreground border-b border-border/50 last:border-0"
                activeProps={{
                  className:
                    "py-3 px-2 text-sm font-medium uppercase tracking-wider text-primary border-b border-border/50 last:border-0",
                }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
