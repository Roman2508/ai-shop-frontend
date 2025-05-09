import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { UserModel } from "@/graphql/generated/output";
import { Button } from "@/components/ui/common/Button";
import ButtonWithIcon from "@/components/ui/custom/ButtonWithIcon";

interface ICheckoutViewProps {
  user: UserModel;
  isLoading: boolean;
  pageView: "view" | "edit";
  handleChangePageView: () => void;
  createPayment: () => Promise<void>;
  deliveryData: { city: string; street: string; postOffice: string };
}

const BackIcon = () => {
  return <ArrowLeft className="stroke-primary" />;
};

const CheckoutView: React.FC<React.PropsWithChildren<ICheckoutViewProps>> = ({
  user,
  pageView,
  isLoading,
  deliveryData,
  createPayment,
  handleChangePageView,
}) => {
  const router = useRouter();

  const t = useTranslations("profile");
  const t2 = useTranslations("checkout");

  return (
    <>
      <h2 className="text-2xl font-semibold">{t2("subtitle1")}</h2>

      <div className="mt-[20px] mb-[60px]">
        <div className="flex py-[20px] border-b border-dashed">
          <p className="w-[40%]">{t2("name")}</p>
          <p className="w-[60%] text-right font-semibold">{user?.displayName}</p>
        </div>

        <div className="flex py-[20px] border-b border-dashed">
          <p className="w-[40%]">{t2("email")}</p>
          <p className="w-[60%] text-right font-semibold">{user?.email}</p>
        </div>

        <div className="flex justify-center">
          <Button variant="link" className="px-[20px]" onClick={handleChangePageView}>
            {pageView === "view" ? t("personalInformation.editButton") : t("personalInformation.endEditButton")}
          </Button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold">{t2("subtitle2")}</h2>

      <div className="mt-[20px] mb-[40px]">
        <div className="flex py-[20px] border-b border-dashed">
          <p className="w-[40%]">{t2("city")}</p>
          <p className="w-[60%] text-right font-semibold">{deliveryData.city}</p>
        </div>

        <div className="flex py-[20px] border-b border-dashed">
          <p className="w-[40%]">{t2("street")}</p>
          <p className="w-[60%] text-right font-semibold">{deliveryData.street}</p>
        </div>

        <div className="flex py-[20px] border-b border-dashed">
          <p className="w-[40%]">{t2("postOffice")}</p>
          <p className="w-[60%] text-right font-semibold">{deliveryData.postOffice}</p>
        </div>

        <div className="flex justify-center">
          <Button variant="link" className="px-[20px]" onClick={handleChangePageView}>
            {pageView === "view" ? t("personalInformation.editButton") : t("personalInformation.endEditButton")}
          </Button>
        </div>
      </div>

      <div className="flex justify-between gap-[20px] flex-wrap">
        <ButtonWithIcon
          disabled={isLoading}
          VectorIcon={BackIcon}
          buttonVariant="secondary"
          text={t2("backButton")}
          onClick={() => router.back()}
          classNames="!min-w-[120px]"
        />

        <Button
          disabled={isLoading}
          onClick={createPayment}
          className="hover:bg-secondary border border-primary hover:text-primary"
        >
          {t2("payButton")}
        </Button>
      </div>
    </>
  );
};

export default CheckoutView;
