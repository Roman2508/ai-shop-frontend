"use client";

import React from "react";

import { useCurrent } from "@/hooks/useCurrent";
import CartItem from "@/components/features/CartItem";
import { Button } from "@/components/ui/common/Button";
import { CartItemModel, ProductModel } from "@/graphql/generated/output";
import ButtonWithIcon from "@/components/ui/custom/ButtonWithIcon";
import ProfileLayout from "@/components/layout/profile/ProfileLayout";

const CartPage = () => {
  const { user } = useCurrent();

  const [cartItems, setCartItems] = React.useState<CartItemModel[]>([]);
  const [selectedCartItems, setSelectedCartItems] = React.useState<{ item: ProductModel; count: number }[]>([]);

  const totalPrice = selectedCartItems.reduce((acc, curr) => curr.item.price * curr.count + acc, 0);

  React.useEffect(() => {
    if (!user || !user.cart) return;
    // @ts-ignore
    setCartItems(user.cart);
  }, [user]);

  return (
    <ProfileLayout>
      <div className="flex justify-between items-center pb-[40]">
        <h1 className="text-3xl font-semibold">Кошик</h1>

        <div className="flex gap-[10]">
          <ButtonWithIcon iconSrc="/icons/list.png" text="МОЇ ЗАМОВЛЕННЯ" buttonVariant="secondary" classNames="" />
          <Button size="icon" className="h-[44] w-[44]">
            0
          </Button>
        </div>
      </div>

      <div className="px-[50] py-[40] rounded-[5] border border-border">
        <div className="flex items-center justify-between pb-[20] border-b border-dotted">
          <h4 className="font-semibold text-lg">
            {true ? (
              <div>
                <p className="leading-none">
                  Вибрано {selectedCartItems.length} з {user?.cart.length}.
                </p>
                <p>Загальна сума замовлення: {totalPrice.toLocaleString("uk-UA")} грн.</p>
              </div>
            ) : (
              "Вибрано 0 з 3"
            )}
          </h4>
          <Button className="hover:bg-secondary border border-primary hover:text-primary">Оформити замовлення</Button>
        </div>

        {cartItems &&
          cartItems.map((el, index) => (
            <CartItem
              isEditable
              id={el.id}
              key={el.id}
              number={index + 1}
              product={el.product}
              defaultCount={el.count}
              setCartItems={setCartItems}
              selectedCartItems={selectedCartItems}
              setSelectedCartItems={setSelectedCartItems}
            />
          ))}
      </div>
    </ProfileLayout>
  );
};

export default CartPage;
