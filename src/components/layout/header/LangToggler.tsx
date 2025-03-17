import React from "react";
import { useLocale } from "next-intl";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/common/DropdownMenu";
import { setLanguage } from "@/libs/i18n/language";
import { Button } from "@/components/ui/common/Button";

const LangToggler = () => {
  const locale = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="icon">
          <img width="22px" height="22px" src="/icons/lang.png" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="center">
        <DropdownMenuCheckboxItem checked={locale === "ua"} onClick={() => setLanguage("ua")}>
          Українська
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem checked={locale === "en"} onClick={() => setLanguage("en")}>
          English
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LangToggler;
