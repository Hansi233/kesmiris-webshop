import Link from "next/link";
import { ShoppingCart, Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

/**
 * Site header. Skeleton only — design refresh planned for next session.
 */
export function Header() {
  return (
    <header className="border-b bg-background sticky top-0 z-40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Kesmiris
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/produkte" className="hover:underline">
            Klimaanlagen
          </Link>
          <Link href="/waermepumpe" className="hover:underline">
            Wärmepumpe
          </Link>
          <Link href="/#ueber-uns" className="hover:underline">
            Über uns
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/warenkorb"
            aria-label="Warenkorb"
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            <ShoppingCart className="h-5 w-5" />
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menü">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
