import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="group inline-flex items-center gap-2" aria-label="GreenSwitch home">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-forest text-lime transition-transform group-hover:rotate-[-8deg]">
        <Leaf className="h-5 w-5" aria-hidden />
      </span>
      <span dir="ltr" className={cn("font-display text-xl font-semibold tracking-tight", light ? "text-forest-foreground" : "text-forest")}>
        Green<span className="text-primary">Switch</span>
      </span>
    </Link>
  );
}
