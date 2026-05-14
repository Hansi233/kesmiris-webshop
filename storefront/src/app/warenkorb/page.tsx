import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata = { title: "Warenkorb" };

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold">Warenkorb</h1>
      <p className="text-muted-foreground">
        Dein Warenkorb ist leer. Cart-Funktion wird in der nächsten Session
        implementiert (Medusa Cart API + Persistenz).
      </p>
      <Link href="/produkte" className={buttonVariants()}>
        Klimaanlagen ansehen
      </Link>
    </div>
  );
}
