import { Link } from "@tanstack/react-router";
import { Sprout } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

/** Honest placeholder for routes reserved for later phases (dashboards, cart, AI...). */
export function ComingSoon({ title, text, icon: Icon = Sprout }: { title: { en: string; ar: string }; text: { en: string; ar: string }; icon?: LucideIcon }) {
  const { lang, t } = useI18n();
  return (
    <section className="container-page grid min-h-[60vh] place-items-center py-20">
      <div className="max-w-xl text-center fade-up">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-secondary text-primary">
          <Icon className="h-8 w-8" aria-hidden />
        </div>
        <p className="eyebrow mt-6">{t.comingSoon}</p>
        <h1 className="mt-3 text-4xl font-semibold text-forest">{title[lang]}</h1>
        <p className="mt-4 text-muted-foreground">{text[lang]}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild><Link to="/marketplace">{t.soon.explore}</Link></Button>
          <Button variant="outline" asChild><Link to="/">{t.soon.back}</Link></Button>
        </div>
      </div>
    </section>
  );
}
