"use client";

import { z } from "zod";
import React from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "@/hooks/useAuth";
import { Input } from "../ui/common/Input";
import { Button } from "../ui/common/Button";
import { Checkbox } from "../ui/common/Checkbox";
import { useLoginMutation } from "@/graphql/generated/output";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/common/Form";

const formSchema = z.object({
  login: z.string().min(3, {
    message: "Ім'я користувача не може бути менше 3 символів",
  }),
  password: z.string().min(8, {
    message: "Довжина паролю повинна бути 8 або більше символів",
  }),
});

interface ILoginFormProps {
  setFromType: React.Dispatch<React.SetStateAction<"login" | "register">>;
}

const LoginForm: React.FC<ILoginFormProps> = ({ setFromType }) => {
  const t = useTranslations("header");

  const { auth } = useAuth();

  const [login, { loading: isLoading }] = useLoginMutation({
    onCompleted() {
      toast.success("Ви успішно увійшли");
      auth();
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    login({ variables: { data } });
  };

  const handleChangeFormType = () => {
    setFromType("register");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem className="pt-[30px] pb-[20px]">
              <FormLabel>{t("auth.loginForm.loginLabel")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="h-[50px] px-[20px] w-full"
                  placeholder={t("auth.loginForm.loginPlaceholder")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="pb-[30px]">
              <FormLabel>{t("auth.loginForm.passLabel")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("auth.loginForm.passPlaceholder")}
                  className="h-[50px] px-[20px] w-full"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center space-x-2 mb-[20px]">
          <Checkbox id="remember" className="border border-primary border-muted-foreground" />
          <label
            htmlFor="remember"
            className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {t("auth.loginForm.rememberBtn")}
          </label>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {t("auth.loginBtn")}
        </Button>

        <div className="mt-[20px] flex">
          <Button variant="link" type="button" className="w-full text-primary opacity-100">
            {t("auth.loginForm.forgotPassBtn")}
          </Button>

          <Button
            variant="link"
            type="button"
            onClick={handleChangeFormType}
            className="w-full text-primary opacity-100"
          >
            {t("auth.registerBtn")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
