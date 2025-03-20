"use client";
import React from "react";
import { useTranslations } from "next-intl";

import { useCart } from "@/hooks/useCart";
import { useCurrent } from "@/hooks/useCurrent";
import CartItem from "@/components/features/CartItem";
import getProductTitle from "@/utils/getProductTitle";
import { CartItemModel, UserModel } from "@/graphql/generated/output";
import CheckoutForm from "@/components/features/checkout/CheckoutForm";
import CheckoutView from "@/components/features/checkout/CheckoutView";
import { toast } from "sonner";

const CheckoutPage = () => {
  const t = useTranslations("profile");

  const { user } = useCurrent();
  const { setCartItems, selectedCartItems, clearSelectedItems } = useCart();

  const [isLoading, setIsLoading] = React.useState(false);
  const [pageView, setPageView] = React.useState<"view" | "edit">("view");

  const totalPrice = selectedCartItems.reduce((acc, curr) => curr.product.price * curr.count + acc, 0);

  const handleChangePageView = () => {
    if (pageView === "view") {
      setPageView("edit");
    } else {
      setPageView("view");
    }
  };

  const createPayment = async () => {
    try {
      setIsLoading(true);
      if (!user) return;
      const items = selectedCartItems.map((el) => ({
        quantity: el.count,
        price: el.product.price,
        productId: el.product.id,
      }));

      const totalPrice = items.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
      const itemsNames = selectedCartItems.map(({ product }) => getProductTitle(product)).join("; ");

      const body = JSON.stringify({ name: itemsNames, price: totalPrice, userId: user.id, items });

      const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_STATIC_URL}/payment/create`, {
        body,
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const json = await data.json();

      if (json.response) {
        clearSelectedItems();
        window.location.href = json.response.checkout_url;
      } else {
        toast.error("Сталась помилка з платіжним сервісом. Спробуйте пізніше");
      }
    } catch (error) {
      toast.error("Сталась помилка з платіжним сервісом. Спробуйте пізніше");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (!user || !user.cart) return;
    setCartItems(user.cart as CartItemModel[]);
  }, [user]);

  if (!user) return;

  return (
    <div className="max-w-[1640] mx-auto px-[16]">
      <h1 className="text-3xl font-semibold">Оформлення замовлення</h1>

      <div className="flex gap-[20] mt-[40]">
        <div className="px-[20] py-[20] w-[40%] rounded-[5] border border-border">
          {pageView === "view" && (
            <CheckoutView
              pageView={pageView}
              isLoading={isLoading}
              user={user as UserModel}
              createPayment={createPayment}
              handleChangePageView={handleChangePageView}
            />
          )}

          {pageView === "edit" && (
            <CheckoutForm
              pageView={pageView}
              isLoading={isLoading}
              user={user as UserModel}
              createPayment={createPayment}
              handleChangePageView={handleChangePageView}
            />
          )}
        </div>

        <div className="px-[20] py-[20] w-[60%] rounded-[5] border border-border">
          <div className="flex items-center justify-between mb-[20]">
            <h2 className="text-2xl font-semibold">Ваше замовлення</h2>
            <h2 className="text-2xl font-semibold">{totalPrice.toLocaleString("uk-UA")} ₴</h2>
          </div>

          {selectedCartItems ? (
            selectedCartItems.map((el, index) => (
              <CartItem
                id={el.id}
                key={el.id}
                count={el.count}
                isEditable={false}
                number={index + 1}
                product={el.product}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
