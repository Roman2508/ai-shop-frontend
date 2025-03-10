import React from "react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/common/DropdownMenu";
import { setLanguage } from "@/libs/i18n/language";
import { Button } from "@/components/ui/common/Button";

const LangToggler = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="icon">
          <img width="22px" height="22px" src="/icons/lang.png" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="center">
        <DropdownMenuItem onClick={() => setLanguage("ua")}>Українська</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LangToggler;
