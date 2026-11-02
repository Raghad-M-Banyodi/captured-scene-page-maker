import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "@/components/site/AuthShell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — GreenSwitch" },
      { name: "description", content: "Log in to your GreenSwitch business account." },
      { property: "og:title", content: "Log in — GreenSwitch" },
      { property: "og:description", content: "Access your GreenSwitch account." },
    ],
  }),
  component: Login,
});

function Login() {
  const { t } = useI18n();
  return (
    <AuthShell title={t.auth.loginTitle} text={t.auth.loginText}>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast(t.comingSoon, { description: t.auth.notice }); }}>
        <div className="space-y-2"><Label htmlFor="email">{t.auth.email}</Label><Input id="email" type="email" required autoComplete="email" className="h-11" /></div>
        <div className="space-y-2"><Label htmlFor="password">{t.auth.password}</Label><Input id="password" type="password" required autoComplete="current-password" className="h-11" /></div>
        <Button type="submit" size="lg" className="w-full">{t.auth.loginBtn}</Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">{t.auth.noAccount} <Link to="/signup" className="font-semibold text-primary hover:underline">{t.nav.signup}</Link></p>
    </AuthShell>
  );
}
