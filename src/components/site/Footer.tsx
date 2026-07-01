import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Send } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="font-display font-black tracking-widest text-xl mb-3">
            NEON<span className="text-gradient-neon">RIG</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">{t("tagline")}</p>
        </div>
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
            {t("nav.builds")}
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/builds/$type" params={{ type: "office" }} className="hover:text-primary">{t("builds.categories.office.name")}</Link></li>
            <li><Link to="/builds/$type" params={{ type: "study" }} className="hover:text-primary">{t("builds.categories.study.name")}</Link></li>
            <li><Link to="/builds/$type" params={{ type: "gaming" }} className="hover:text-primary">{t("builds.categories.gaming.name")}</Link></li>
            <li><Link to="/builds/$type" params={{ type: "pro" }} className="hover:text-primary">{t("builds.categories.pro.name")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
            {t("nav.contacts")}
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> {t("contacts.address")}</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> {t("contacts.phone")}</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> {t("contacts.email")}</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">Telegram</h4>
          <a
            href="https://t.me/neonrig"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm hover:text-primary"
          >
            <Send className="w-4 h-4" /> @neonrig
          </a>
          <p className="text-xs text-muted-foreground mt-4">{t("contacts.hours")}</p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-4 flex flex-col md:flex-row gap-2 justify-between text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} NEONRIG. {t("footer.rights")}</span>
          <span>{t("footer.made")}</span>
        </div>
      </div>
    </footer>
  );
}
