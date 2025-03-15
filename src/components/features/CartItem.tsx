import React from "react";
import { Button } from "../ui/common/Button";
import { Checkbox } from "../ui/common/Checkbox";
import { Input } from "../ui/common/Input";
import {
  CartItemModel,
  ProductModel,
  useChangeCartItemCountMutation,
  useToggleCartMutation,
} from "@/graphql/generated/output";
import getPhotoUrl from "@/utils/get-photo-url";
import { useDebouncedCallback } from "use-debounce";
import { Trash2 } from "lucide-react";

type CartItemPropsType = {
  id: string;
  number: number;
  defaultCount: number;
  isEditable?: boolean;
  product: ProductModel;
  selectedCartItems: { item: ProductModel; count: number }[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItemModel[]>>;
  setSelectedCartItems: React.Dispatch<React.SetStateAction<{ item: ProductModel; count: number }[]>>;
};

const CartItem: React.FC<CartItemPropsType> = ({
  id,
  number,
  product,
  defaultCount,
  setCartItems,
  selectedCartItems,
  isEditable = false,
  setSelectedCartItems,
}) => {
  const [changeCartItemCount] = useChangeCartItemCountMutation();
  const [toggleCart, { loading }] = useToggleCartMutation();

  const [count, setCount] = React.useState(defaultCount);

  const isChecked = selectedCartItems.some((el) => el.item.id === product.id);

  const debouncedCountChange = useDebouncedCallback(() => {
    changeCartItemCount({ variables: { input: { id, count } } });
  }, 1000);

  const handleCountChange = (action: "increment" | "decrement", id: string) => {
    if (action === "increment") {
      setSelectedCartItems((prev) => {
        return prev.map((el) => {
          if (el.item.id === id) {
            return { ...el, count: el.count + 1 };
          } else {
            return el;
          }
        });
      });
    } else {
      setSelectedCartItems((prev) => {
        return prev.map((el) => {
          if (el.item.id === id && el.count - 1 !== 0) {
            return { ...el, count: el.count - 1 };
          } else {
            return el;
          }
        });
      });
    }

    setCount((prev) => {
      if (action === "increment") {
        debouncedCountChange();
        return prev + 1;
      } else {
        if (prev - 1 !== 0) {
          debouncedCountChange();
          return prev - 1;
        } else {
          return prev;
        }
      }
    });
  };

  const onSelectCartItem = (cartItem: { item: ProductModel; count: number }) => {
    setSelectedCartItems((prev) => {
      const isAdded = prev.some((el) => el.item.id === cartItem.item.id);

      if (isAdded) {
        return prev.filter((el) => el.item.id !== cartItem.item.id);
      }

      return [...prev, cartItem];
    });
  };

  const onDeleteItemFromCart = async (productId: string) => {
    if (!window.confirm("Ви дійсно хочете видалити товар з корзини:?")) return;
    await toggleCart({ variables: { input: { productId, count } } });
    setCartItems((prev) => prev.filter((el) => el.product.id !== productId));
  };

  return (
    <div className="flex items-center gap-[30] py-[20] border-b border-dashed">
      {isEditable ? (
        <Checkbox
          className="border border-primary"
          onClick={() => onSelectCartItem({ item: product, count })}
          checked={isChecked}
        />
      ) : (
        <p>{number}</p>
      )}

      <div className="border border-border w-[110] min-w-[110] h-[110] p-[10]">
        <img src={product.images.length ? getPhotoUrl(product.images[0], "products") : ""} />
      </div>

      <div className="grow">
        <p className="text-primary font-semibold">
          {`${product.brand}, ${product.ram}/${product.builtInMemory} ГБ, ${product.color}`}
        </p>
        <p className="">{product.title}</p>
        <b className="text-xl">{product.price.toLocaleString("uk-UA")} / шт.</b>
      </div>

      <div className="flex gap-[15]">
        {isEditable ? (
          <div className={"flex items-center border border-border rounded-full w-[120]"}>
            <Button
              disabled={loading}
              className="p-[10] pl-[15] bg-transparent text-text"
              onClick={() => handleCountChange("decrement", product.id)}
            >
              -
            </Button>
            <Input value={count} className="border-[0] grow text-center" />
            <Button
              disabled={loading}
              className="p-[10] pr-[15] bg-transparent text-text"
              onClick={() => handleCountChange("increment", product.id)}
            >
              +
            </Button>
          </div>
        ) : (
          <p>К-сть: {count}</p>
        )}

        {isEditable && (
          <Button
            size="icon"
            variant="outline"
            disabled={loading}
            className="w-[42] h-[42]"
            onClick={() => onDeleteItemFromCart(product.id)}
          >
            <Trash2 />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
