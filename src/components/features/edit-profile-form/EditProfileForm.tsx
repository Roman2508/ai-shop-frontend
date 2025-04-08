import { z } from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { formSchema } from "./form-helpers";
import { Input } from "../../ui/common/Input";
import { Button } from "../../ui/common/Button";
import UploadFiles from "../product-actions-form/UploadFiles";
import DeliveryButton from "../delivery-button/DeliveryButton";
import { UserModel, useUpdateUserDataMutation, useUploadAvatarMutation } from "@/graphql/generated/output";
import { Form, FormItem, FormField, FormMessage, FormControl, FormDescription } from "@/components/ui/common/Form";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useCurrent } from "@/hooks/useCurrent";

interface IEditProfileForm {
  user?: Omit<UserModel, "password">;
  setPageView: React.Dispatch<React.SetStateAction<"view" | "edit">>;
}

const defaultFormValues = {
  city: "",
  displayName: "",
  email: "",
  password: "",
  postOffice: "",
  street: "",
  username: "",
};

const EditProfileForm: React.FC<IEditProfileForm> = ({ user, setPageView }) => {
  const t = useTranslations("profile.personalInformation.edit");

  const [files, setFiles] = React.useState<File[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [uploadAvatar] = useUploadAvatarMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
  });

  const { refetch } = useCurrent();

  const [updateUserData] = useUpdateUserDataMutation({
    onCompleted() {
      toast.success("Профіль оновлено");
    },
    onError(error, clientOptions) {
      toast.error("Помилка під час оновлення профілю");
      console.log(error, clientOptions);
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("values", values);
    if (!user) return;

    try {
      setIsLoading(true);
      if (values.password) {
        await updateUserData({ variables: { user: { ...values } } });
      } else {
        const { password, ...user } = values;
        await updateUserData({ variables: { user } });
      }

      if (files[0] && typeof files[0] !== "string") {
        await uploadAvatar({ variables: { file: files[0] } });
      }
      refetch();
      window.scrollTo({ top: 0 });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setPageView("view");
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
      username: user.username,
      displayName: user.displayName,
      email: user.email,
      city: user.city || "",
      street: user.street || "",
      postOffice: user.postOffice || "",
    });

    if (user.avatar) {
      // @ts-ignore
      setFiles([user.avatar]);
      console.log("user.avatar", user.avatar);
    }
  }, [user]);

  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="border-b pb-[40px] mb-[30px]">
          <h4 className="font-semibold mb-[20px]">{t("blockTitle1")}</h4>

          <div className="flex flex-wrap gap-[26px]">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={t("userNamePlaceholder")}
                      className="h-[50px] px-[20px] w-[434px]"
                      variant="primary"
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
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={t("publicNamePlaceholder")}
                      className="h-[50px] px-[20px] w-[434px]"
                      variant="primary"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{t("publicNameLabel")}</FormDescription>
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
                      type="email"
                      placeholder={t("emailPlaceholder")}
                      className="h-[50px] px-[20px] w-[434px]"
                      variant="primary"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{t("emailLabel")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={t("passwordPlaceholder")}
                      variant="primary"
                      className="h-[50px] px-[20px] w-[434px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{t("passwordLabel")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="border-b pb-[40px] mb-[30px]">
          <h4 className="font-semibold mb-[20px]">{t("blockTitle2")}</h4>
          <div className="flex flex-col flex-wrap gap-[0px]">
            <UploadFiles files={files} isMulti={false} setFiles={setFiles} buttonText={t("uploadButton")} />
          </div>
        </div>

        <div className="border-b pb-[40px] mb-[30px]">
          <h4 className="font-semibold mb-[20px]">{t("blockTitle3")}</h4>

          <div className="flex flex-col flex-wrap gap-[0px]">
            <DeliveryButton setDeliveryData={setDeliveryData} />

            <div className="pb-[30px] max-w-[434px]">
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
        </div>

        <Button type="submit" className="w-[260px]" disabled={isLoading}>
          {t("saveButton")}
        </Button>
      </form>
    </Form>
  );
};

export default EditProfileForm;
