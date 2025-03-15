"use client";

import React from "react";

import { useCurrent } from "@/hooks/useCurrent";
import { Button } from "@/components/ui/common/Button";
import CatalogCard from "@/components/features/CatalogCard";
import ButtonWithIcon from "@/components/ui/custom/ButtonWithIcon";
import ProfileLayout from "@/components/layout/profile/ProfileLayout";

const WishlistPage = () => {
  const { user } = useCurrent();

  return (
    <ProfileLayout>
      <div className="flex justify-between items-center pb-[40]">
        <h1 className="text-3xl font-semibold">Список бажань</h1>

        <div className="flex gap-[10]">
          <ButtonWithIcon iconSrc="/icons/list.png" text="МОЇ ЗАМОВЛЕННЯ" buttonVariant="secondary" classNames="" />
          <Button size="icon" className="h-[44] w-[44]">
            0
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-[18]">
        {user
          ? user.favorites.map((favourite) => <CatalogCard viewType={"cards"} product={favourite.product} />)
          : "Loading..."}
      </div>
    </ProfileLayout>
  );
};

export default WishlistPage;
