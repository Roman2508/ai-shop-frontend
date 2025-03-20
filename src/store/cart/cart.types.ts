import { ProductModel } from "@/graphql/generated/output";

export interface ICartItem {
  id: string;
  count: number;
  product: ProductModel;
}

export interface ICartStore {
  cartItems: ICartItem[];
  setCartItems: (items: ICartItem[]) => void;
  changeCartItemsCount: (id: string, count: number) => void;
  addItemToCart: (item: ICartItem) => void;
  removeItemFromCart: (id: string) => void;
  //
  selectedCartItems: ICartItem[];
  changeSelectedCartItemsCount: (id: string, count: number) => void;
  toggleSelectedCartItems: (id: string, count: number, product: ProductModel) => void;
  clearSelectedItems: () => void;
}
