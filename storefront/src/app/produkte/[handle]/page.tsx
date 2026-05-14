import { notFound } from "next/navigation";
import { medusa } from "@/lib/medusa";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type Params = Promise<{ handle: string }>;

type ProductLike = {
  id: string;
  handle?: string | null;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  thumbnail?: string | null;
  variants?: Array<{
    calculated_price?: {
      calculated_amount?: number;
      currency_code?: string;
    };
  }>;
};

async function fetchProduct(handle: string): Promise<ProductLike | null> {
  try {
    const res = await medusa.store.product.list({ handle, limit: 1 });
    return ((res.products?.[0] ?? null) as unknown) as ProductLike | null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Params }) {
  const { handle } = await params;
  const product = await fetchProduct(handle);
  return { title: product?.title ?? handle };
}

export default async function ProductDetailPage({ params }: { params: Params }) {
  const { handle } = await params;
  const product = await fetchProduct(handle);

  if (!product) {
    notFound();
  }

  const variant = product.variants?.[0];
  const calculatedPrice = variant?.calculated_price;
  const price = calculatedPrice?.calculated_amount
    ? new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: calculatedPrice.currency_code ?? "EUR",
      }).format(calculatedPrice.calculated_amount)
    : "Preis auf Anfrage";

  return (
    <div className="container mx-auto px-4 py-10 grid gap-10 lg:grid-cols-2">
      <div className="aspect-square bg-muted rounded-xl overflow-hidden">
        {product.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.thumbnail}
            alt={product.title ?? "Produktbild"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-muted-foreground">
            Bild folgt
          </div>
        )}
      </div>

      <div className="space-y-5">
        <Badge variant="secondary">Klimaanlage</Badge>
        <h1 className="text-3xl font-bold">{product.title}</h1>
        {product.subtitle && (
          <p className="text-muted-foreground">{product.subtitle}</p>
        )}

        <p className="text-2xl font-semibold">{price}</p>

        <Button size="lg" disabled>
          In den Warenkorb (folgt)
        </Button>

        <Separator />

        {product.description && (
          <div className="prose prose-sm max-w-none">
            <p>{product.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
