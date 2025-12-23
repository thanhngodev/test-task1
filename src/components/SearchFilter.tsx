import { products } from "../data/products";
import type { Product } from "../types/product";

type SearchFilterProps = {
  search: string;
  category: string;
  onSearch: (value: string) => void;
  onCategory: (value: string) => void;
};

const SearchFilter: React.FC<SearchFilterProps> = ({
  search,
  category,
  onSearch,
  onCategory,
}) => {
  const categories: string[] = [
    "All",
    ...Array.from(
      new Set(products.map((p: Product) => p.category))
    ),
  ];

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onSearch(e.target.value)
        }
        className="border rounded px-3 py-2 flex-1"
      />

      <select
        value={category}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          onCategory(e.target.value)
        }
        className="border rounded px-3 py-2"
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilter;
