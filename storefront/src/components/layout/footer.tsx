import Link from "next/link";

/**
 * Site footer. Skeleton only.
 */
export function Footer() {
  return (
    <footer className="border-t bg-background mt-16">
      <div className="container mx-auto px-4 py-10 grid gap-8 md:grid-cols-4 text-sm">
        <div>
          <p className="font-semibold mb-2">Kesmiris</p>
          <p className="text-muted-foreground">
            Klimaanlagen und Wärmepumpen
            <br />
            direkt aus Griechenland.
          </p>
        </div>

        <div>
          <p className="font-semibold mb-2">Shop</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>
              <Link href="/produkte" className="hover:underline">
                Klimaanlagen
              </Link>
            </li>
            <li>
              <Link href="/waermepumpe" className="hover:underline">
                Wärmepumpe anfragen
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-2">Rechtliches</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>
              <Link href="/impressum" className="hover:underline">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/datenschutz" className="hover:underline">
                Datenschutz
              </Link>
            </li>
            <li>
              <Link href="/agb" className="hover:underline">
                AGB
              </Link>
            </li>
            <li>
              <Link href="/widerruf" className="hover:underline">
                Widerruf
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-2">Kontakt</p>
          <p className="text-muted-foreground">
            E-Mail folgt
            <br />
            Telefon folgt
          </p>
        </div>
      </div>

      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Kesmiris
      </div>
    </footer>
  );
}
