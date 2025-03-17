import React from "react";

import { UserModel } from "@/graphql/generated/output";
import { Button } from "@/components/ui/common/Button";
import { useTranslations } from "next-intl";
import ButtonWithIcon from "@/components/ui/custom/ButtonWithIcon";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { formSchema } from "./form-helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import DeliveryButton from "../delivery-button/DeliveryButton";
import { FormControl, FormDescription, FormField, FormItem, FormMessage, Form } from "@/components/ui/common/Form";
import { Input } from "@/components/ui/common/Input";
import { useForm } from "react-hook-form";

interface ICheckoutFormProps {
  user: UserModel;
  pageView: "view" | "edit";
  handleChangePageView: () => void;
}

const BackIcon = () => {
  return <ArrowLeft className="stroke-primary" />;
};

const CheckoutForm: React.FC<ICheckoutFormProps> = ({ user, pageView, handleChangePageView }) => {
  const router = useRouter();

  const t = useTranslations("profile.personalInformation.edit");

  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) return;

    try {
      console.log(values);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const setDeliveryData = (data: { city: string; street: string; postOffice: string }) => {
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

        <div className="mt-[20] mb-[60]">
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem className="mb-[30]">
                <FormControl>
                  <Input
                    placeholder={t("userNamePlaceholder")}
                    variant="primary"
                    className="h-[50] px-[20] w-full"
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
                    className="h-[50] px-[20] w-full"
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t("userNameLabel")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button variant="link" className="px-[20]" onClick={handleChangePageView}>
              {pageView === "view" ? "Редагувати" : "Завершити редагування"}
            </Button>
          </div>
        </div>

        <h2 className="text-2xl font-semibold">Інформація про доставку</h2>

        <div className="mt-[20] mb-[40]">
          <div className="flex flex-col flex-wrap gap-[0]">
            <DeliveryButton setDeliveryData={setDeliveryData} classNames="max-w-full" />

            <div className="pb-[30]">
              <div className="flex py-[20] border-b border-dashed">
                <p className="w-[30%]">{t("city")}</p>
                <p className="w-[70%] text-right font-semibold">{form.watch("city") ? form.watch("city") : "-"}</p>
              </div>

              <div className="flex py-[20] border-b border-dashed">
                <p className="w-[30%]">{t("street")}</p>
                <p className="w-[70%] text-right font-semibold">{form.watch("street") ? form.watch("street") : "-"}</p>
              </div>

              <div className="flex py-[20] border-b border-dashed">
                <p className="w-[30%]">{t("postOffice")}</p>
                <p className="w-[70%] text-right font-semibold">
                  {form.watch("postOffice") ? form.watch("postOffice") : "-"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="link" className="px-[20]" onClick={handleChangePageView}>
              {pageView === "view" ? "Редагувати" : "Завершити редагування"}
            </Button>
          </div>
        </div>

        <div className="flex justify-between gap-[20]">
          <ButtonWithIcon
            VectorIcon={BackIcon}
            buttonVariant="secondary"
            text="Повернутись назад"
            onClick={() => router.back()}
          />

          <Button className="hover:bg-secondary border border-primary hover:text-primary">Перейти до оплати</Button>
        </div>
      </form>
    </Form>
  );
};

export default CheckoutForm;
