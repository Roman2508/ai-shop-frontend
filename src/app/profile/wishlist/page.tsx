"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { useOrder } from "@/hooks/useOrder";
import { useCurrent } from "@/hooks/useCurrent";
import { useWishlist } from "@/hooks/useWishlist";
import { Button } from "@/components/ui/common/Button";
import { ProductModel } from "@/graphql/generated/output";
import CatalogCard from "@/components/features/CatalogCard";
import { IWishlistItem } from "@/store/wishlist/wishlist.types";
import ButtonWithIcon from "@/components/ui/custom/ButtonWithIcon";
import ProfileLayout from "@/components/layout/profile/ProfileLayout";

const WishlistPage = () => {
  const t = useTranslations("profile");

  const { user, isLoadingProfile } = useCurrent();
  const { payedOrders } = useOrder();
  const { setWishlistItems } = useWishlist();

  React.useEffect(() => {
    if (!user || !user.favorites) return;
    setWishlistItems(user.favorites as IWishlistItem[]);
  }, [user]);

  return (
    <ProfileLayout>
      <div className="flex justify-between items-center pb-[40px] gap-[20px] flex-col md:flex-row">
        <h1 className="text-3xl font-semibold">{t("wishlist.title")}</h1>

        <div className="flex gap-[10px]">
          <Link href="/profile/orders">
            <ButtonWithIcon
              classNames=""
              iconSrc="/icons/list.png"
              buttonVariant="secondary"
              text={t("orders.ordersButton")}
            />
          </Link>
          <Button size="icon" className="h-[44px] w-[44px]">
            {payedOrders.length}
          </Button>
        </div>
      </div>

      <div className="grid 2xs:grid-cols-1 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-[18px]">
        {user &&
          user.favorites.map((favourite) => (
            <CatalogCard viewType={"cards"} product={favourite.product as ProductModel} />
          ))}
      </div>

      <div className="grid grid-cols-1 gap-[18px]">
        {isLoadingProfile ? (
          <p className="text-center w-full font-bold text-lg pt-[40px]">Loading...</p>
        ) : user && !user.favorites.length ? (
          <p className="text-center w-full font-bold text-lg pt-[40px]">Пусто</p>
        ) : (
          ""
        )}
      </div>
    </ProfileLayout>
  );
};

export default WishlistPage;
