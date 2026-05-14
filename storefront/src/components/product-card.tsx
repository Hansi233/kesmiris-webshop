import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type ProductCardProps = {
  handle: string;
  title: string;
  subtitle?: string | null;
  thumbnail?: string | null;
  price?: string | null;
};

/**
 * Skeleton product card for the climate-unit listing.
 * Image rendering uses a plain <img> for the skeleton — the next
 * session will swap to next/image with remote loader config.
 */
export function ProductCard({ handle, title, subtitle, thumbnail, price }: ProductCardProps) {
  return (
    <Link href={`/produkte/${handle}`}>
      <Card className="h-full transition hover:shadow-md">
        <CardHeader className="p-0">
          <div className="aspect-square bg-muted rounded-t-xl overflow-hidden">
            {thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={thumbnail} alt={title} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-muted-foreground text-sm">
                Bild folgt
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-base">{title}</CardTitle>
          {subtitle ? (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{subtitle}</p>
          ) : null}
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <span className="font-medium">{price ?? "Preis auf Anfrage"}</span>
          <Badge variant="secondary">Klima</Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
