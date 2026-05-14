export const metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl space-y-4">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <p className="text-muted-foreground">
        Checkout-Flow folgt in der nächsten Session: Adresse, Versand-Auswahl,
        Stripe Payment Element, Bestellabschluss.
      </p>
    </div>
  );
}
