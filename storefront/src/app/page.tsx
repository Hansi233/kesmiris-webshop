import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Klimaanlagen & Wärmepumpen aus Griechenland
        </h1>
        <p className="text-muted-foreground text-lg">
          Faire Preise, geprüfte Qualität, schneller Versand nach Deutschland.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Link href="/produkte" className={buttonVariants({ size: "lg" })}>
            Klimaanlagen ansehen
          </Link>
          <Link
            href="/waermepumpe"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            Wärmepumpe anfragen
          </Link>
        </div>
      </section>

      <section id="ueber-uns" className="max-w-3xl mx-auto space-y-3">
        <h2 className="text-2xl font-semibold">Über Kesmiris</h2>
        <p className="text-muted-foreground">
          Platzhalter — Inhalt folgt in der nächsten Session.
        </p>
      </section>
    </div>
  );
}
