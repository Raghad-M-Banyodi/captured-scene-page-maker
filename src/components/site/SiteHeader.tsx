import { Link } from "@tanstack/react-router";
import { Globe, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useI18n } from "@/lib/i18n";
import { useAccount } from "@/lib/account/session";
import { dashboardPath } from "@/lib/account/rules";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function useNavItems() {
  const { t } = useI18n();
  return [
    { to: "/", label: t.nav.home },
    { to: "/marketplace", label: t.nav.marketplace },
    { to: "/how-it-works", label: t.nav.how },
    { to: "/group-buying", label: t.nav.group },
    { to: "/impact", label: t.nav.impact },
    { to: "/about", label: t.nav.about },
  ] as const;
}

export function LangSwitch() {
  const { lang, setLang } = useI18n();
  return (
    <Button variant="ghost" size="sm" onClick={() => setLang(lang === "en" ? "ar" : "en")} aria-label="Switch language">
      <Globe /> {lang === "en" ? "العربية" : "English"}
    </Button>
  );
}

export function SiteHeader() {
  const { t, dir } = useI18n();
  const account = useAccount();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  async function logout() { await queryClient.cancelQueries(); queryClient.clear(); await supabase.auth.signOut(); await navigate({to:"/auth",replace:true}); setOpen(false); }
  const accountLinks = account.user ? <><Button variant="ghost" asChild><Link to={dashboardPath(account.roles)} onClick={()=>setOpen(false)}>{t.account.dashboard}</Link></Button><Button variant="outline" onClick={()=>void logout()}>{t.account.logout}</Button></> : <><Button variant="ghost" asChild><Link to="/login" onClick={()=>setOpen(false)}>{t.nav.login}</Link></Button><Button asChild><Link to="/signup" onClick={()=>setOpen(false)}>{t.nav.signup}</Link></Button></>;
  const items = useNavItems();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {items.map((i) => (
            <Link
              key={i.to}
              to={i.to}
              activeOptions={{ exact: i.to === "/" }}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-forest data-[status=active]:bg-secondary data-[status=active]:text-forest"
            >
              {i.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <LangSwitch />
          {accountLinks}
        </div>
        <div className="flex items-center gap-1 lg:hidden">
          <LangSwitch />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={t.nav.menu}><Menu /></Button>
            </SheetTrigger>
            <SheetContent side={dir === "rtl" ? "left" : "right"} className="bg-background">
              <SheetTitle className="sr-only">{t.nav.menu}</SheetTitle>
              <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
                {items.map((i) => (
                  <Link key={i.to} to={i.to} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-base font-medium hover:bg-secondary data-[status=active]:bg-secondary data-[status=active]:text-forest" activeOptions={{ exact: i.to === "/" }}>
                    {i.label}
                  </Link>
                ))}
                <div className="mt-4 grid gap-2 px-2">
                  {accountLinks}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
