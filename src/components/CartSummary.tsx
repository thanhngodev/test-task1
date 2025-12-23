import { products } from "../data/products";
import type { CartState } from "../types/product";

type CartSummaryProps = {
  cart: CartState;
};

export default function CartSummary({ cart }: CartSummaryProps) {
  const items = Object.entries(cart);

  const total = items.reduce((sum, [id, qty]) => {
    const product = products.find((p) => p.id === Number(id));
    return product ? sum + product.price * qty : sum;
  }, 0);

  return (
    <div className="bg-white p-4 rounded border sticky top-4">
      <h2 className="font-semibold mb-2">Order Summary</h2>

      {items.length === 0 && (
        <div className="text-sm text-gray-500">No items selected</div>
      )}

      <div className="space-y-1">
        {items.map(([id, qty]) => {
          const product = products.find((p) => p.id === Number(id));
          if (!product) return null;

          return (
            <div key={id} className="flex justify-between text-sm">
              <span>
                {product.name} x {qty}
              </span>
              <span>{(product.price * qty).toLocaleString()} ₫</span>
            </div>
          );
        })}
      </div>

      <div className="border-t mt-3 pt-2 font-semibold flex justify-between">
        <span>Total</span>
        <span>{total.toLocaleString()} ₫</span>
      </div>
    </div>
  );
}
