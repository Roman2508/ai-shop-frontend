"use client";

import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import Search from "./Search";
import LoginButton from "./LoginButton";
import LangToggler from "./LangToggler";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggler } from "./ThemeToggler";
import { Button } from "@/components/ui/common/Button";
import ButtonWithIcon from "@/components/ui/custom/ButtonWithIcon";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/common/Drawer";
import { Menu } from "lucide-react";
import { Checkbox } from "@/components/ui/common/Checkbox";
import { Label } from "@/components/ui/common/Label";
import { setLanguage } from "@/libs/i18n/language";
import { useTheme } from "next-themes";

const Header = () => {
  const locale = useLocale();
  const t = useTranslations("header");

  const { setTheme, theme } = useTheme();

  const { isAuthentificated } = useAuth();

  return (
    <header className="fixed w-full flex justify-between items-center gap-[20] py-[20] px-[26] bg-dark text-white z-[111]">
      {/* <header className="flex justify-between p-[20]"> */}
      <div className="flex-1 flex gap-[20] items-center">
        <Link href="/catalog">
          <ButtonWithIcon
            text={t("catalogBtn")}
            iconSrc="/icons/burger-white.png"
            classNames="text-white h-[36] font-regular"
          />
        </Link>

        <Search />
      </div>

      <div className="flex gap-[20]">
        <Link className="flex gap-[10] items-center" href="/">
          <img src="/logo.png" width="30px" height="30px" />
          <b className="text-[16px] hidden lg:inline-block">PhoneShop</b>
        </Link>
      </div>

      <div className="flex justify-end items-center gap-[15] flex-1">
        <div className="hidden 2xl:flex gap-[14]">
          <Button size="icon" variant="icon">
            <img width="16px" height="16px" src="/icons/telegram.png" />
          </Button>
          <Button size="icon" variant="icon">
            <img width="16px" height="16px" src="/icons/viber.png" />
          </Button>
        </div>

        <div className="hidden 2xl:flex flex-col items-end leading-[1.2] text-[14px]">
          <b>+380 98-888-88-88</b>
          <span className="opacity-[0.6] text-[12px]">{t("phoneBtn")}</span>
        </div>

        <div className="hidden md:flex justify-end items-center gap-[15]">
          <ThemeToggler />

          <LangToggler />

          {!isAuthentificated ? (
            <LoginButton />
          ) : (
            <>
              <Link href="/profile/wishlist">
                <Button size="icon" variant="icon">
                  <img width="16px" height="16px" src="/icons/wishlist.png" />
                </Button>
              </Link>

              <Link href="/profile/cart">
                <Button size="icon" variant="icon">
                  <img width="16px" height="16px" src="/icons/shopping-bag.png" />
                </Button>
              </Link>

              <Link href="/profile/personal-information">
                <Button size="icon" variant="icon">
                  <img width="16px" height="16px" src="/icons/user.png" />
                </Button>
              </Link>
            </>
          )}
        </div>

        <div className="flex gap-[15] 2xs:gap-[0]">
          <Search isMobile={true} />

          <Drawer direction="right">
            <DrawerTrigger>
              <Button size="icon" variant="icon" className="flex md:hidden">
                <Menu className="stroke-white" />
              </Button>
            </DrawerTrigger>

            <DrawerContent>
              <DrawerHeader>
                <div className="flex justify-between items-center">
                  <DrawerTitle>Меню</DrawerTitle>

                  <DrawerClose>
                    <Button variant="secondary" size="icon" className="">
                      X
                    </Button>
                  </DrawerClose>
                </div>

                <DrawerDescription>
                  <Link href="" className="block py-[15] border-b border-border">
                    Профіль
                  </Link>

                  <Link href="" className="block py-[15] border-b border-border">
                    Корзина
                  </Link>

                  <Link href="" className="block py-[15] border-b border-border">
                    Збережене
                  </Link>

                  <div className="py-[15] border-b border-border">
                    <b className="block mb-[10]">Мова:</b>

                    <Label className="flex items-center gap-[10] mb-[10]" onClick={() => setLanguage("ua")}>
                      <Checkbox checked={locale === "ua"} />
                      Українська
                    </Label>

                    <Label className="flex items-center gap-[10]" onClick={() => setLanguage("en")}>
                      <Checkbox checked={locale === "en"} />
                      English
                    </Label>
                  </div>

                  <div className="py-[15] border-b border-border">
                    <b className="block mb-[10]">Тема:</b>

                    <Label className="flex items-center gap-[10] mb-[10]" onClick={() => setTheme("light")}>
                      <Checkbox checked={theme === "light"} />
                      Світла
                    </Label>
                    <Label className="flex items-center gap-[10] mb-[10]" onClick={() => setTheme("dark")}>
                      <Checkbox checked={theme === "dark"} />
                      Темна
                    </Label>
                    <Label className="flex items-center gap-[10]" onClick={() => setTheme("system")}>
                      <Checkbox checked={theme === "system"} />
                      Системна
                    </Label>
                  </div>
                </DrawerDescription>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
};

export default Header;
