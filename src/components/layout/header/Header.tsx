"use client";

import React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import {
  Drawer,
  DrawerClose,
  DrawerTitle,
  DrawerHeader,
  DrawerContent,
  DrawerTrigger,
  DrawerDescription,
} from "@/components/ui/common/Drawer";
import Search from "./Search";
import { useTheme } from "next-themes";
import LoginButton from "./LoginButton";
import LangToggler from "./LangToggler";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggler } from "./ThemeToggler";
import { setLanguage } from "@/libs/i18n/language";
import { Label } from "@/components/ui/common/Label";
import { Button } from "@/components/ui/common/Button";
import { Checkbox } from "@/components/ui/common/Checkbox";
import ButtonWithIcon from "@/components/ui/custom/ButtonWithIcon";

const Header = () => {
  const locale = useLocale();
  const t = useTranslations("header");
  const menuT = useTranslations("components.mobileMenu");

  const { setTheme, theme } = useTheme();

  const { isAuthentificated } = useAuth();

  return (
    <header className="fixed w-full flex justify-between items-center gap-[20px] py-[20px] px-[26px] bg-dark text-white z-[10]">
      <div className="flex-1 flex gap-[20px] items-center">
        <Link href="/catalog">
          <ButtonWithIcon
            text={t("catalogBtn")}
            iconSrc="/icons/burger-white.png"
            classNames="text-white h-[36px] font-regular"
          />
        </Link>

        <Search />
      </div>

      <div className="flex gap-[20px]">
        <Link className="flex gap-[10px] items-center" href="/">
          <img src="/logo.png" width="30px" height="30px" />
          <b className="text-[16px] hidden lg:inline-block">PhoneShop</b>
        </Link>
      </div>

      <div className="flex justify-end items-center gap-[15px] flex-1">
        <div className="hidden 2xl:flex gap-[14px]">
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

        <div className="hidden md:flex justify-end items-center gap-[15px]">
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

        <div className="flex gap-[15px] 2xs:gap-[0]">
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
                  <DrawerTitle>{menuT("title")}</DrawerTitle>

                  <DrawerClose>
                    <Button variant="secondary" size="icon" className="">
                      X
                    </Button>
                  </DrawerClose>
                </div>

                <DrawerDescription>
                  <Link href="/profile/personal-information" className="block py-[15px] border-b border-border">
                    {menuT("links.profile")}
                  </Link>

                  <Link href="/profile/cart" className="block py-[15px] border-b border-border">
                    {menuT("links.cart")}
                  </Link>

                  <Link href="/profile/wishlist" className="block py-[15px] border-b border-border">
                    {menuT("links.favorites")}
                  </Link>

                  <div className="py-[15px] border-b border-border">
                    <b className="block mb-[10px]">{menuT("lang")}:</b>

                    <Label className="flex items-center gap-[10px] mb-[10px]" onClick={() => setLanguage("ua")}>
                      <Checkbox checked={locale === "ua"} />
                      Українська
                    </Label>

                    <Label className="flex items-center gap-[10px]" onClick={() => setLanguage("en")}>
                      <Checkbox checked={locale === "en"} />
                      English
                    </Label>
                  </div>

                  <div className="py-[15px] border-b border-border">
                    <b className="block mb-[10px]">{menuT("theme.title")}:</b>

                    <Label className="flex items-center gap-[10px] mb-[10px]" onClick={() => setTheme("light")}>
                      <Checkbox checked={theme === "light"} />
                      {menuT("theme.light")}
                    </Label>
                    <Label className="flex items-center gap-[10px] mb-[10px]" onClick={() => setTheme("dark")}>
                      <Checkbox checked={theme === "dark"} />
                      {menuT("theme.dark")}
                    </Label>
                    <Label className="flex items-center gap-[10px]" onClick={() => setTheme("system")}>
                      <Checkbox checked={theme === "system"} />
                      {menuT("theme.system")}
                    </Label>
                  </div>

                  {!isAuthentificated && (
                    <div className="mt-[20px]">
                      <LoginButton classNames="w-full text-muted-foreground hover:border-muted-foreground fill-muted-foreground" />
                    </div>
                  )}
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
