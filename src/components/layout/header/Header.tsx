"use client";

import React from "react";
import Link from "next/link";

import Search from "./Search";
import LoginButton from "./LoginButton";
import { ThemeToggler } from "./ThemeToggler";
import { Label } from "@/components/ui/common/Label";
import { Switch } from "@/components/ui/common/Switch";
import { Button } from "@/components/ui/common/Button";
import ButtonWithIcon from "@/components/ui/custom/ButtonWithIcon";
import LangToggler from "./LangToggler";

const Header = () => {
  const handleChangeTheme = () => {
    const currentTheme = window.localStorage.getItem("theme");
    console.log(currentTheme);
    if (currentTheme === "dark") {
      window.localStorage.setItem("theme", "light");
    } else {
      window.localStorage.setItem("theme", "dark");
    }
  };

  return (
    <header className="fixed w-full flex justify-between items-center gap-[20] py-[20] px-[26] bg-dark text-white z-[1]">
      {/* <header className="flex justify-between p-[20]"> */}
      <div className="flex-1 flex gap-[20] items-center">
        <Link href="/catalog">
          <ButtonWithIcon
            text="Каталог"
            iconSrc="/icons/burger-white.png"
            classNames="text-white h-[36] font-regular"
          />
        </Link>

        <Search />
      </div>

      <div className="flex gap-[20]">
        <Link className="flex gap-[10] items-center" href="/">
          <img src="/logo.png" width="30px" height="30px" />
          <b className="text-[16px]">PhoneShop</b>
        </Link>
        {/* <p>Catalog</p> */}
      </div>

      <div className="flex justify-end items-center gap-[15] flex-1">
        <div className="flex gap-[14]">
          <Button size="icon" variant="icon">
            <img width="16px" height="16px" src="/icons/telegram.png" />
          </Button>
          <Button size="icon" variant="icon">
            <img width="16px" height="16px" src="/icons/viber.png" />
          </Button>
        </div>

        <div className="flex flex-col items-end leading-[1.2] text-[14px]">
          <b>+380 98-888-88-88</b>
          <span className="opacity-[0.6] text-[12px]">щоденно</span>
        </div>

        <ThemeToggler />

        <LangToggler />

        {true ? (
          <LoginButton />
        ) : (
          <>
            <Button size="icon" variant="icon">
              <img width="16px" height="16px" src="/icons/wishlist.png" />
            </Button>

            <Button size="icon" variant="icon">
              <img width="16px" height="16px" src="/icons/shopping-bag.png" />
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
