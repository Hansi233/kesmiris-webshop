import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata = { title: "Bestellbestätigung" };

export default function OrderConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-xl text-center space-y-6">
      <h1 className="text-3xl font-bold">Bestellung bestätigt</h1>
      <p className="text-muted-foreground">
        Skeleton-Page. Echte Bestelldetails werden in der nächsten Session aus
        Medusa geladen (via Order-Token / Customer-Session).
      </p>
      <Link href="/" className={buttonVariants()}>
        Zurück zur Startseite
      </Link>
    </div>
  );
}
