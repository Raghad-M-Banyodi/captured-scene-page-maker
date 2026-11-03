import type { ReactNode } from "react";
import hero from "@/assets/hero.jpg";

export function AuthShell({ title, text, children }: { title: string; text: string; children: ReactNode }) {
  return (
    <div className="container-page grid gap-10 py-12 lg:grid-cols-2 lg:py-20">
      <div className="hidden overflow-hidden rounded-[2rem] lg:block">
        <img src={hero} alt="" width={1600} height={1200} className="h-full w-full object-cover" />
      </div>
      <div className="mx-auto w-full max-w-md self-center">
        <h1 className="text-4xl font-semibold text-forest">{title}</h1>
        <p className="mt-2 text-muted-foreground">{text}</p>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
