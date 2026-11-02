import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Logo } from "./Logo";

export function SiteFooter() {
  const { t } = useI18n();
  const cols = [
    { title: t.footer.platform, links: [
      { to: "/marketplace", label: t.nav.marketplace },
      { to: "/how-it-works", label: t.nav.how },
      { to: "/group-buying", label: t.nav.group },
      { to: "/suppliers", label: t.footer.suppliers },
    ] },
    { title: t.footer.company, links: [
      { to: "/about", label: t.nav.about },
      { to: "/impact", label: t.footer.sustainability },
      { to: "/contact", label: t.footer.contact },
    ] },
    { title: t.footer.legal, links: [
      { to: "/privacy", label: t.footer.privacy },
      { to: "/terms", label: t.footer.terms },
    ] },
  ] as const;

  return (
    <footer className="bg-forest text-forest-foreground">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="max-w-sm space-y-4">
          <Logo light />
          <p className="text-sm leading-relaxed text-forest-foreground/70">{t.footer.tagline}</p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h3 className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.14em] text-lime">{c.title}</h3>
            <ul className="space-y-2.5">
              {c.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-forest-foreground/75 transition-colors hover:text-forest-foreground">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-forest-foreground/10">
        <div className="container-page py-6 text-xs text-forest-foreground/60">
          © {new Date().getFullYear()} GreenSwitch. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
