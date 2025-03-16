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

interface IEditProfileForm {
  user?: Omit<UserModel, "password">;
}

const EditProfileForm: React.FC<IEditProfileForm> = ({ user }) => {
  const t = useTranslations("profile.personalInformation.edit");

  const [files, setFiles] = React.useState<File[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [uploadAvatar] = useUploadAvatarMutation();

  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) });

  const [updateUserData] = useUpdateUserDataMutation();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) return;

    try {
      setIsLoading(true);
      await updateUserData({ variables: { user: { ...values } } });
      if (files[0] && typeof files[0] !== "string") {
        await uploadAvatar({ variables: { file: files[0] } });
      }
      window.location.reload();
      window.scrollTo({ top: 0 });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="border-b pb-[40] mb-[30]">
          <h4 className="font-semibold mb-[20]">{t("blockTitle1")}</h4>

          <div className="flex flex-wrap gap-[26]">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={t("userNamePlaceholder")}
                      variant="primary"
                      className="h-[50] px-[20] w-[434]"
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
                      variant="primary"
                      className="h-[50] px-[20] w-[434]"
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
                      variant="primary"
                      className="h-[50] px-[20] w-[434]"
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
                      className="h-[50] px-[20] w-[434]"
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

        <div className="border-b pb-[40] mb-[30]">
          <h4 className="font-semibold mb-[20]">{t("blockTitle2")}</h4>
          <div className="flex flex-col flex-wrap gap-[0]">
            <UploadFiles
              files={files}
              setFiles={setFiles}
              actionType="create"
              isMulti={false}
              buttonText={t("uploadButton")}
            />
          </div>
        </div>

        <div className="border-b pb-[40] mb-[30]">
          <h4 className="font-semibold mb-[20]">{t("blockTitle3")}</h4>

          <div className="flex flex-col flex-wrap gap-[0]">
            <DeliveryButton setDeliveryData={setDeliveryData} />

            <div className="pb-[30] max-w-[434]">
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
        </div>

        <Button type="submit" className="w-[260]" disabled={isLoading}>
          {t("saveButton")}
        </Button>
      </form>
    </Form>
  );
};

export default EditProfileForm;
