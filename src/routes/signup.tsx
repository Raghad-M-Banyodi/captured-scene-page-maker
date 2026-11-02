import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Store, Factory } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "@/components/site/AuthShell";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Role = "buyer" | "supplier";

export const Route = createFileRoute("/signup")({
  validateSearch: (s: Record<string, unknown>): { role?: Role } => ({ role: s.role === "supplier" ? "supplier" : s.role === "buyer" ? "buyer" : undefined }),
  head: () => ({
    meta: [
      { title: "Create an account — GreenSwitch" },
      { name: "description", content: "Join GreenSwitch as a business buyer or sustainable packaging supplier." },
      { property: "og:title", content: "Join GreenSwitch" },
      { property: "og:description", content: "Register as a business buyer or packaging supplier." },
    ],
  }),
  component: Signup,
});

function Signup() {
  const { t } = useI18n();
  const search = Route.useSearch();
  const [role, setRole] = useState<Role>(search.role ?? "buyer");
  const roles = [
    { id: "buyer" as const, icon: Store, title: t.auth.buyer, text: t.auth.buyerText },
    { id: "supplier" as const, icon: Factory, title: t.auth.supplierRole, text: t.auth.supplierText },
  ];
  return (
    <AuthShell title={t.auth.signupTitle} text={t.auth.signupText}>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast(t.comingSoon, { description: t.auth.notice }); }}>
        <div role="radiogroup" aria-label="Account type" className="grid grid-cols-2 gap-3">
          {roles.map((r) => (
            <button key={r.id} type="button" role="radio" aria-checked={role === r.id} onClick={() => setRole(r.id)}
              className={cn("rounded-2xl border-2 p-4 text-start transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", role === r.id ? "border-primary bg-secondary" : "border-border bg-card hover:border-primary/40")}>
              <r.icon className="h-5 w-5 text-primary" />
              <div className="mt-2 text-sm font-semibold">{r.title}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">{r.text}</div>
            </button>
          ))}
        </div>
        <div className="space-y-2"><Label htmlFor="name">{t.auth.fullName}</Label><Input id="name" required autoComplete="name" className="h-11" /></div>
        <div className="space-y-2"><Label htmlFor="biz">{t.auth.business}</Label><Input id="biz" required autoComplete="organization" className="h-11" /></div>
        <div className="space-y-2"><Label htmlFor="email">{t.auth.email}</Label><Input id="email" type="email" required autoComplete="email" className="h-11" /></div>
        <div className="space-y-2"><Label htmlFor="password">{t.auth.password}</Label><Input id="password" type="password" required minLength={8} autoComplete="new-password" className="h-11" /></div>
        <Button type="submit" size="lg" className="w-full">{t.auth.signupBtn}</Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">{t.auth.haveAccount} <Link to="/login" className="font-semibold text-primary hover:underline">{t.nav.login}</Link></p>
    </AuthShell>
  );
}
