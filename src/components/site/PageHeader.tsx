import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, text, children }: { eyebrow?: string; title: string; text?: string; children?: ReactNode }) {
  return (
    <section className="bg-hero text-forest-foreground">
      <div className="container-page py-16 md:py-24">
        <div className="max-w-3xl fade-up">
          {eyebrow && <p className="eyebrow !text-lime">{eyebrow}</p>}
          <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-6xl">{title}</h1>
          {text && <p className="mt-5 max-w-2xl text-lg text-forest-foreground/75">{text}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, text, center }: { eyebrow: string; title: string; text?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-forest md:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-lg text-muted-foreground">{text}</p>}
    </div>
  );
}
