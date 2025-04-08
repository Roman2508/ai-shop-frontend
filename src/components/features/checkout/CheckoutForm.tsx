import { z } from "zod";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { formSchema } from "./form-helpers";
import { Input } from "@/components/ui/common/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserModel } from "@/graphql/generated/output";
import { Button } from "@/components/ui/common/Button";
import DeliveryButton from "../delivery-button/DeliveryButton";
import ButtonWithIcon from "@/components/ui/custom/ButtonWithIcon";
import { FormControl, FormDescription, FormField, FormItem, FormMessage, Form } from "@/components/ui/common/Form";

interface ICheckoutFormProps {
  user: UserModel;
  isLoading: boolean;
  pageView: "view" | "edit";
  handleChangePageView: () => void;
  createPayment: () => Promise<void>;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setDeliveryData: React.Dispatch<
    React.SetStateAction<{
      city: string;
      street: string;
      postOffice: string;
    }>
  >;
}

const BackIcon = () => {
  return <ArrowLeft className="stroke-primary" />;
};

const CheckoutForm: React.FC<ICheckoutFormProps> = ({
  user,
  pageView,
  isLoading,
  setIsError,
  createPayment,
  setDeliveryData,
  handleChangePageView,
}) => {
  const router = useRouter();

  const t = useTranslations("profile.personalInformation.edit");

  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {};

  const changeDeliveryData = (data: { city: string; street: string; postOffice: string }) => {
    setIsError(false);
    setDeliveryData(data);
    form.setValue("city", data.city);
    form.setValue("street", data.street);
    form.setValue("postOffice", data.postOffice);
  };

  React.useEffect(() => {
    if (!user) return;

    form.reset({
      displayName: user.displayName,
      email: user.email,
      city: user.city || "",
      street: user.street || "",
      postOffice: user.postOffice || "",
    });
  }, [user]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-semibold">Особисті дані</h2>

        <div className="mt-[20px] mb-[60px]">
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem className="mb-[30px]">
                <FormControl>
                  <Input
                    placeholder={t("userNamePlaceholder")}
                    variant="primary"
                    className="h-[50px] px-[20px] w-full"
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t("userNameLabel")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={t("userNamePlaceholder")}
                    variant="primary"
                    className="h-[50px] px-[20px] w-full"
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t("userNameLabel")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button variant="link" className="px-[20px]" onClick={handleChangePageView}>
              {pageView === "view" ? "Редагувати" : "Завершити редагування"}
            </Button>
          </div>
        </div>

        <h2 className="text-2xl font-semibold">Інформація про доставку</h2>

        <div className="mt-[20px] mb-[40px]">
          <div className="flex flex-col flex-wrap gap-[0]">
            <DeliveryButton setDeliveryData={changeDeliveryData} classNames="max-w-full" />

            <div className="pb-[30px]">
              <div className="flex py-[20px] border-b border-dashed">
                <p className="w-[30%]">{t("city")}</p>
                <p className="w-[70%] text-right font-semibold">{form.watch("city") ? form.watch("city") : "-"}</p>
              </div>

              <div className="flex py-[20px] border-b border-dashed">
                <p className="w-[30%]">{t("street")}</p>
                <p className="w-[70%] text-right font-semibold">{form.watch("street") ? form.watch("street") : "-"}</p>
              </div>

              <div className="flex py-[20px] border-b border-dashed">
                <p className="w-[30%]">{t("postOffice")}</p>
                <p className="w-[70%] text-right font-semibold">
                  {form.watch("postOffice") ? form.watch("postOffice") : "-"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="link" className="px-[20px]" onClick={handleChangePageView}>
              {pageView === "view" ? "Редагувати" : "Завершити редагування"}
            </Button>
          </div>
        </div>

        <div className="flex justify-between gap-[20px] flex-wrap">
          <ButtonWithIcon
            disabled={isLoading}
            VectorIcon={BackIcon}
            text="Повернутись назад"
            buttonVariant="secondary"
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
      </form>
    </Form>
  );
};

export default CheckoutForm;
