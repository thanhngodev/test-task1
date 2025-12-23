export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  isPrescription: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartState = Record<number, number>;
