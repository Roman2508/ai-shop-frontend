import React from "react";
import Search from "./Search";
import { Button } from "@/components/ui/common/Button";
import LoginButton from "./LoginButton";

const Header = () => {
  return (
    <header className="fixed w-full flex justify-between items-center py-[20] px-[26] bg-dark text-white z-[1]">
      {/* <header className="flex justify-between p-[20]"> */}
      <div className="grow flex gap-[10] items-center">
        <img src="logo.png" width="30px" height="30px" />
        <b className="text-[16px]">AI-PhoneShop</b>
      </div>

      <div className="flex gap-[20]">
        {/* <p>Catalog</p> */}
        <Search />
      </div>

      <div className="flex gap-[20] grow justify-end items-center">
        <div className="flex gap-[14]">
          <Button size="icon" variant="icon">
            TG
          </Button>
          <Button size="icon" variant="icon">
            VB
          </Button>
        </div>

        <div className="flex flex-col items-end leading-[1.2] text-[14px]">
          <b>+380 98-888-88-88</b>
          <span className="opacity-[0.6] text-[12px]">щоденно</span>
        </div>

        <LoginButton />

        <Button size="icon" variant="icon">
          <img
            width="16px"
            height="16px"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGd2sjxFQjvIeJHrB6h01ODTyCuzYmEwvy1w&s"
          />
        </Button>
      </div>
    </header>
  );
};

export default Header;
