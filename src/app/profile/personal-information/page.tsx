"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { useOrder } from "@/hooks/useOrder";
import { useCurrent } from "@/hooks/useCurrent";
import { Button } from "@/components/ui/common/Button";
import ViewProfile from "@/components/features/ViewProfile";
import ButtonWithIcon from "@/components/ui/custom/ButtonWithIcon";
import ProfileLayout from "@/components/layout/profile/ProfileLayout";
import EditProfileForm from "@/components/features/edit-profile-form/EditProfileForm";

const PersonalInformationPage = () => {
  const [pageView, setPageView] = React.useState<"view" | "edit">("view");

  const t = useTranslations("profile");

  const { user } = useCurrent();
  const { payedOrders } = useOrder();

  const handleChangePageView = () => {
    if (pageView === "view") {
      setPageView("edit");
    } else {
      setPageView("view");
    }
  };

  return (
    <ProfileLayout>
      <div className="flex justify-between items-center pb-[40] gap-[20] flex-col md:flex-row">
        <div className="flex items-center">
          <h1 className="text-3xl font-semibold">{t("personalInformation.title")}</h1>
          <Button variant="link" className="px-[20]" onClick={handleChangePageView}>
            {pageView === "view" ? t("personalInformation.editButton") : t("personalInformation.endEditButton")}
          </Button>
        </div>

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

      <div className="md:px-[50] md:py-[40] rounded-[5] md:border border-border">
        {/* @ts-ignore  */}
        {pageView === "view" && <ViewProfile user={user} />}
        {/* @ts-ignore  */}
        {pageView === "edit" && <EditProfileForm user={user} setPageView={setPageView} />}
      </div>
    </ProfileLayout>
  );
};

export default PersonalInformationPage;
