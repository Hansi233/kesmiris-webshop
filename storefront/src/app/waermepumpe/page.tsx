import { HeatPumpLeadForm } from "@/components/heat-pump-lead-form";

export const metadata = { title: "Wärmepumpe anfragen" };

export default function HeatPumpPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">Wärmepumpe — individuelle Beratung</h1>
        <p className="text-muted-foreground">
          Wärmepumpen werden bei uns nicht als Stangenware verkauft. Wir berechnen
          die passende Leistung für dein Gebäude und erstellen ein konkretes
          Angebot. Sende uns deine Eckdaten — wir melden uns innerhalb von zwei
          Werktagen.
        </p>
      </header>

      <section className="rounded-xl border p-6">
        <HeatPumpLeadForm />
      </section>
    </div>
  );
}
