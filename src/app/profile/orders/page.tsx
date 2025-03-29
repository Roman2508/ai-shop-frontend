"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { useOrder } from "@/hooks/useOrder";
import getPhotoUrl from "@/utils/get-photo-url";
import { useCurrent } from "@/hooks/useCurrent";
import { IOrder } from "@/store/order/order.types";
import getProductTitle from "@/utils/getProductTitle";
import formatDateTime from "@/utils/format-date-time";
import { Button } from "@/components/ui/common/Button";
import ButtonWithIcon from "@/components/ui/custom/ButtonWithIcon";
import ProfileLayout from "@/components/layout/profile/ProfileLayout";

const OrdersPage = () => {
  const t = useTranslations("profile.orders");

  const { user } = useCurrent();
  const { deliveredOrders, payedOrders, setOrder } = useOrder();

  const [expandedOrders, setExpandedOrders] = React.useState<string[]>([]);

  const handleChangeExpandedOrders = (id: string) => {
    setExpandedOrders((prev) => {
      let orders = [...prev];

      if (prev.some((el) => el === id)) {
        orders = orders.filter((el) => el !== id);
      } else {
        orders.push(id);
      }

      return orders;
    });
  };

  React.useEffect(() => {
    if (!user || !user.orders.length) return;
    setOrder(user.orders as IOrder[]);
  }, [user]);

  return (
    <ProfileLayout>
      <div className="flex justify-between items-center pb-[40] gap-[20] flex-col md:flex-row">
        <h1 className="text-3xl font-semibold">{t("title")}</h1>

        <div className="flex gap-[10]">
          <ButtonWithIcon classNames="" iconSrc="/icons/list.png" buttonVariant="secondary" text={t("ordersButton")} />
          <Button size="icon" className="h-[44] w-[44]">
            {payedOrders.length}
          </Button>
        </div>
      </div>

      <div className="md:px-[50] md:py-[40] rounded-[5] md:border border-border">
        {[payedOrders, deliveredOrders].map((el, index) => (
          <div className="bg-background rounded-[5] pb-[40] mb-[60] overflow-hidden border border-border" key={index}>
            <h3
              className={`${
                index === 0 ? "bg-primary text-popover" : "bg-border"
              }  px-[40] py-[20] text-xl font-semibold`}
            >
              {index === 0 ? t("ordersInProcessing") : t("completedOrders")}
            </h3>

            <div className="grid grid-cols-4 my-[25] px-[40] font-semibold">
              <div className="text-center">{t("table.count")}</div>
              <div className="text-center">{t("table.date")}</div>
              <div className="text-center">{t("table.status")}</div>
              <div className="text-center">{t("table.sum")}</div>
            </div>

            <div className="flex flex-col gap-[40] px-[40]">
              {el.map((el) => {
                const isItemExpanded = expandedOrders.some((s) => s === el.id);

                return (
                  <div className="border border-border px-[40] py-[30] rounded-[5]" key={el.id}>
                    <div className="grid grid-cols-4">
                      <div className="text-center">{el.items.length}</div>
                      <div className="text-center">{formatDateTime(el.createdAt)}</div>
                      <div className="text-center">
                        {el.status === "PAYED" ? t("status.payed") : t("status.delivered")}
                      </div>
                      <div className="text-center">{el.total}</div>
                    </div>

                    {!isItemExpanded && <div className="border-b border-dashed pt-[20]"></div>}

                    <div
                      className={
                        isItemExpanded
                          ? "transition-all grid grid-rows-[1fr] overflow-hidden duration-[1s]"
                          : "transition-all grid grid-rows-[0fr] overflow-hidden duration-[1s]"
                      }
                    >
                      <div className={"overflow-hidden"}>
                        <h6 className="font-semibold text-2xl border-b border-dashed pb-[24] mt-[50]">
                          {t("table.productsCount")} ({el.items.length})
                        </h6>
                        {el.items.map((item, index) => (
                          <div className="flex items-center gap-[30] py-[20] border-b border-dashed">
                            <p>{index + 1}</p>
                            <Link
                              href={`/catalog/${item.product.id}`}
                              className="border border-border w-[110] min-w-[110] h-[110] p-[10]"
                            >
                              <img
                                src={
                                  item.product.images.length
                                    ? getPhotoUrl(item.product.images[0], "products")
                                    : "/images/empty-image.webp"
                                }
                              />
                            </Link>
                            <div className="grow">
                              <Link className="text-primary font-semibold" href={`/catalog/${item.product.id}`}>
                                {getProductTitle(item.product)}
                              </Link>
                              <p className="">{item.product.title}</p>
                              <b className="text-xl">{item.product.price}</b>
                            </div>

                            <b className="whitespace-nowrap">
                              {t("table.productCoutnt")}: {item.quantity}
                            </b>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant={isItemExpanded ? "default" : "secondary"}
                      className="mt-[20] rounded-[5]"
                      onClick={() => handleChangeExpandedOrders(el.id)}
                    >
                      {isItemExpanded ? t("table.lessDetailsButton") : t("table.moreDetailsButton")}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </ProfileLayout>
  );
};

export default OrdersPage;
