"use client";

import React from "react";
import { useTranslations } from "next-intl";

import Link from "next/link";
import { useOrder } from "@/hooks/useOrder";
import { useCurrent } from "@/hooks/useCurrent";
import Review from "@/components/features/Review";
import { Button } from "@/components/ui/common/Button";
import ButtonWithIcon from "@/components/ui/custom/ButtonWithIcon";
import ProfileLayout from "@/components/layout/profile/ProfileLayout";

const ReviewsPage = () => {
  const t = useTranslations("profile");

  const { user } = useCurrent();
  const { payedOrders } = useOrder();

  return (
    <ProfileLayout>
      <div className="flex justify-between items-center pb-[40px] gap-[20px] flex-col md:flex-row">
        <h1 className="text-3xl font-semibold">{t("reviws.title")}</h1>

        <div className="flex gap-[10px]">
          <Link href="/profile/orders">
            <ButtonWithIcon iconSrc="/icons/list.png" text={t("orders.ordersButton")} buttonVariant="secondary" />
          </Link>
          <Button size="icon" className="h-[44px] w-[44px]">
            {payedOrders.length}
          </Button>
        </div>
      </div>

      <div className="md:px-[50px] md:py-[40px] rounded-[5px] md:border border-border">
        {user ? (
          user.reviews.length ? (
            // @ts-ignore
            user.reviews.map((review) => <Review key={review.id} review={review} type="product" />)
          ) : (
            <p className="text-center font-semibold">Пусто</p>
          )
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
    </ProfileLayout>
  );
};

export default ReviewsPage;
