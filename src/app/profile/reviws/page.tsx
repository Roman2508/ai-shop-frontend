"use client";

import React from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/common/Button";
import ButtonWithIcon from "@/components/ui/custom/ButtonWithIcon";
import ProfileLayout from "@/components/layout/profile/ProfileLayout";

const ReviewsPage = () => {
  const t = useTranslations("profile");

  return (
    <ProfileLayout>
      <div className="flex justify-between items-center pb-[40]">
        <h1 className="text-3xl font-semibold">{t("reviws.title")}</h1>

        <div className="flex gap-[10]">
          <ButtonWithIcon iconSrc="/icons/list.png" text={t("orders.ordersButton")} buttonVariant="secondary" />
          <Button size="icon" className="h-[44] w-[44]">
            0
          </Button>
        </div>
      </div>

      <div className="px-[50] py-[40] rounded-[5] border border-border">
        <h1 className="text-3xl text-center py-[50]">Сторінка в розробці.</h1>
      </div>
    </ProfileLayout>
  );
};

export default ReviewsPage;
