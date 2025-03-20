import { Button } from "@/components/ui/common/Button";
import ButtonWithIcon from "@/components/ui/custom/ButtonWithIcon";
import { UserModel } from "@/graphql/generated/output";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";

interface ICheckoutViewProps {
  user: UserModel;
  isLoading: boolean;
  pageView: "view" | "edit";
  handleChangePageView: () => void;
  createPayment: () => Promise<void>;
}

const BackIcon = () => {
  return <ArrowLeft className="stroke-primary" />;
};

const CheckoutView: React.FC<React.PropsWithChildren<ICheckoutViewProps>> = ({
  user,
  pageView,
  isLoading,
  createPayment,
  handleChangePageView,
}) => {
  const router = useRouter();

  const t = useTranslations("profile");

  return (
    <>
      <h2 className="text-2xl font-semibold">Особисті дані</h2>

      <div className="mt-[20] mb-[60]">
        <div className="flex py-[20] border-b border-dashed">
          <p className="w-[40%]">Ім'я та прізвище</p>
          <p className="w-[60%] text-right font-semibold">{user?.displayName}</p>
        </div>

        <div className="flex py-[20] border-b border-dashed">
          <p className="w-[40%]">Електронна пошта</p>
          <p className="w-[60%] text-right font-semibold">{user?.email}</p>
        </div>

        <div className="flex justify-center">
          <Button variant="link" className="px-[20]" onClick={handleChangePageView}>
            {pageView === "view" ? t("personalInformation.editButton") : t("personalInformation.endEditButton")}
          </Button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold">Інформація про доставку</h2>

      <div className="mt-[20] mb-[40]">
        <div className="flex py-[20] border-b border-dashed">
          <p className="w-[40%]">Місто</p>
          <p className="w-[60%] text-right font-semibold">{user?.city}</p>
        </div>

        <div className="flex py-[20] border-b border-dashed">
          <p className="w-[40%]">Вулиця</p>
          <p className="w-[60%] text-right font-semibold">{user?.street}</p>
        </div>

        <div className="flex py-[20] border-b border-dashed">
          <p className="w-[40%]">Відділення</p>
          <p className="w-[60%] text-right font-semibold">{user?.postOffice}</p>
        </div>

        <div className="flex justify-center">
          <Button variant="link" className="px-[20]" onClick={handleChangePageView}>
            {pageView === "view" ? t("personalInformation.editButton") : t("personalInformation.endEditButton")}
          </Button>
        </div>
      </div>

      <div className="flex justify-between gap-[20]">
        <ButtonWithIcon
          disabled={isLoading}
          VectorIcon={BackIcon}
          buttonVariant="secondary"
          text="Повернутись назад"
          onClick={() => router.back()}
        />

        <Button
          disabled={isLoading}
          onClick={createPayment}
          className="hover:bg-secondary border border-primary hover:text-primary"
        >
          Перейти до оплати
        </Button>
      </div>
    </>
  );
};

export default CheckoutView;
