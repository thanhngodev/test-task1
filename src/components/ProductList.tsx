import type { Product, CartState } from "../types/product";
import ProductCard from "./ProductCard";

type ProductListProps = {
  products: Product[];
  cart: CartState;
  onChangeQty: (productId: number, qty: number) => void;
};

export default function ProductList({
  products,
  cart,
  onChangeQty,
}: ProductListProps) {
  if (products.length === 0) {
    return <div className="text-gray-500">No products found.</div>;
  }

  return (
    <div className="space-y-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          quantity={cart[product.id] ?? 0}
          onChangeQty={onChangeQty}
        />
      ))}
    </div>
  );
}
