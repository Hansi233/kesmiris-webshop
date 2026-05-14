import { medusa } from "@/lib/medusa";
import { ProductCard } from "@/components/product-card";

export const metadata = { title: "Klimaanlagen" };

// Skeleton: fetch products via Medusa SDK. Falls back to an empty grid
// if the backend is not reachable so the build always succeeds.
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

async function fetchProducts(): Promise<ProductLike[]> {
  try {
    const res = await medusa.store.product.list({ limit: 24 });
    return (res.products ?? []) as unknown as ProductLike[];
  } catch {
    return [];
  }
}

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div className="container mx-auto px-4 py-10 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Klimaanlagen</h1>
        <p className="text-muted-foreground mt-1">
          Unsere aktuellen Modelle. Sortiment wird laufend erweitert.
        </p>
      </div>

      {products.length === 0 ? (
        <p className="text-muted-foreground">
          Noch keine Produkte verfügbar. Bitte schau bald wieder vorbei.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p) => {
            const variant = p.variants?.[0];
            const calculatedPrice = variant?.calculated_price;
            const price = calculatedPrice?.calculated_amount
              ? new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: calculatedPrice.currency_code ?? "EUR",
                }).format(calculatedPrice.calculated_amount)
              : null;

            return (
              <ProductCard
                key={p.id}
                handle={p.handle ?? p.id}
                title={p.title ?? "Produkt"}
                subtitle={p.subtitle ?? p.description}
                thumbnail={p.thumbnail}
                price={price}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
