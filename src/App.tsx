import { useMemo, useState } from "react";
import CartSummary from "./components/CartSummary";
import ProductList from "./components/ProductList";
import SearchFilter from "./components/SearchFilter";
import { products } from "./data/products";
import useDebounce from "./hooks/useDebounce";
import type { CartState, Product } from "./types/product";

export default function App() {
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("All");
  const [cart, setCart] = useState<CartState>({});

  const debouncedSearch = useDebounce<string>(search, 300);

  const filteredProducts = useMemo<Product[]>(() => {
    return products.filter((p) => {
      const matchName = p.name
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());

      const matchCategory = category === "All" || p.category === category;

      return matchName && matchCategory;
    });
  }, [debouncedSearch, category]);

  const updateQty = (productId: number, qty: number) => {
    setCart((prev) => {
      const next: CartState = { ...prev };
      if (qty <= 0) delete next[productId];
      else next[productId] = qty;
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-xl font-semibold mb-4">Product Search & Order</h1>

      <SearchFilter
        search={search}
        category={category}
        onSearch={setSearch}
        onCategory={setCategory}
      />

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <ProductList
            products={filteredProducts}
            cart={cart}
            onChangeQty={updateQty}
          />
        </div>

        <div className="md:col-span-1">
          <CartSummary cart={cart} />
        </div>
      </div>
    </div>
  );
}
