import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata = { title: "Anfrage gesendet" };

export default function HeatPumpSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-xl text-center space-y-6">
      <h1 className="text-3xl font-bold">Danke für deine Anfrage</h1>
      <p className="text-muted-foreground">
        Wir haben deine Anfrage erhalten und melden uns innerhalb von zwei
        Werktagen mit einem konkreten Vorschlag.
      </p>
      <Link href="/" className={buttonVariants()}>
        Zurück zur Startseite
      </Link>
    </div>
  );
}
