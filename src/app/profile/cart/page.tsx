"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useOrder } from "@/hooks/useOrder";
import { useCurrent } from "@/hooks/useCurrent";
import CartItem from "@/components/features/CartItem";
import { Button } from "@/components/ui/common/Button";
import { CartItemModel } from "@/graphql/generated/output";
import ButtonWithIcon from "@/components/ui/custom/ButtonWithIcon";
import ProfileLayout from "@/components/layout/profile/ProfileLayout";

const CartPage = () => {
  const router = useRouter();

  const t = useTranslations("profile");

  const { payedOrders } = useOrder();
  const { user, isLoadingProfile } = useCurrent();
  const { cartItems, setCartItems, selectedCartItems } = useCart();

  const totalPrice = selectedCartItems.reduce((acc, curr) => curr.product.price * curr.count + acc, 0);

  React.useEffect(() => {
    if (!user || !user.cart) return;
    setCartItems(user.cart as CartItemModel[]);
  }, [user]);

  React.useEffect(() => {
    setCartItems(cartItems);
  }, []);

  return (
    <ProfileLayout>
      <div className="flex justify-between items-center pb-[40]">
        <h1 className="text-3xl font-semibold">{t("cart.title")}</h1>

        <div className="flex gap-[10]">
          <Link href="/profile/orders">
            <ButtonWithIcon
              classNames=""
              iconSrc="/icons/list.png"
              buttonVariant="secondary"
              text={t("orders.ordersButton")}
            />
          </Link>
          <Button size="icon" className="h-[44] w-[44]">
            {payedOrders.length}
          </Button>
        </div>
      </div>

      <div className="px-[50] py-[40] rounded-[5] border border-border">
        <div className="flex items-center justify-between pb-[20] border-b border-dotted">
          <h4 className="font-semibold text-lg">
            <div>
              <p className="leading-none">
                {t("cart.selected1")} {selectedCartItems.length} {t("cart.selected2")} {cartItems.length}.
              </p>
              <p>
                {t("cart.totalPrice")} {totalPrice.toLocaleString("uk-UA")} {t("cart.currency")}
              </p>
            </div>
          </h4>
          <Button
            disabled={!selectedCartItems.length}
            onClick={() => router.push("/checkout")}
            className="hover:bg-secondary border border-primary hover:text-primary"
          >
            {t("cart.placeAnOrder")}
          </Button>
        </div>

        {cartItems &&
          cartItems.map((el, index) => (
            <CartItem
              isEditable
              id={el.product.id}
              key={el.id}
              count={el.count}
              number={index + 1}
              product={el.product}
            />
          ))}

        <div className="grid grid-cols-1 gap-[18]">
          {isLoadingProfile ? (
            <p className="text-center w-full font-bold text-lg pt-[40]">Loading...</p>
          ) : user && !user.cart.length ? (
            <p className="text-center w-full font-bold text-lg pt-[40]">Пусто</p>
          ) : (
            ""
          )}
        </div>

        {/*  */}
      </div>
    </ProfileLayout>
  );
};

export default CartPage;
