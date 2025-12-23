import { useState } from "react";
import type { Product } from "../types/product";
import { normalizeQuantity } from "../utils/common";
import { Minus, Plus } from "lucide-react";

type ProductCardProps = {
  product: Product;
  quantity: number;
  onChangeQty: (productId: number, qty: number) => void;
};

export default function ProductCard({
  product,
  quantity,
  onChangeQty,
}: ProductCardProps) {
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const { value, exceeded } = normalizeQuantity(rawValue);

    setError(exceeded ? "Maximum quantity is 99" : null);

    e.target.value = value.toString();
    onChangeQty(product.id, value);
  };

  const handleDecrease = () => {
    if (quantity <= 0) return;
    setError(null);
    onChangeQty(product.id, quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity >= 99) return;
    setError(null);
    onChangeQty(product.id, quantity + 1);
  };

  return (
    <div className="bg-white p-3 rounded border">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-medium">
            {product.name}
            {product.isPrescription && (
              <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
                Rx
              </span>
            )}
          </div>

          <div className="text-sm text-gray-500">{product.category}</div>
          <div className="text-sm font-semibold">
            {product.price.toLocaleString()} ₫
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleDecrease}
            disabled={quantity <= 0}
            className="w-8 h-8 flex items-center justify-center border rounded
                       disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Minus size={14} />
          </button>

          <input
            type="number"
            min={0}
            max={99}
            inputMode="numeric"
            value={quantity}
            onChange={handleInputChange}
            className="w-16 border rounded px-2 py-1 text-center"
          />

          <button
            type="button"
            onClick={handleIncrease}
            disabled={quantity >= 99}
            className="w-8 h-8 flex items-center justify-center border rounded
                       disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {error && (
        <div className="flex justify-end">
          <p className="text-xs text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}
