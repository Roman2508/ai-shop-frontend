import { Button } from "@/components/ui/common/Button";
import React from "react";

const LoginButton = () => {
  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-4">
        <img
          width="16px"
          height="16px"
          src="https://www.pngfind.com/pngs/m/110-1102927_create-your-profile-user-icon-white-color-hd.png"
        />
      </span>

      <Button variant="icon" size="icon" className="pl-5 w-[120]">
        Увійти
      </Button>
    </div>
  );
};

export default LoginButton;
