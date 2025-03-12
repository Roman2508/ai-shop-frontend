import React from "react";
import { useTranslations } from "next-intl";

import { Dialog, DialogTitle, DialogHeader, DialogTrigger, DialogContent } from "@/components/ui/common/Dialog";
import { Input } from "@/components/ui/common/Input";
import SearchIcon from "@/components/images/SearchIcon";

const Search = () => {
  const t = useTranslations("header");

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative cursor-pointer">
            <span className="absolute inset-y-0 right-0 flex items-center pr-4">
              <SearchIcon />
            </span>

            <Input
              variant="static"
              placeholder={`${t("searchBtn")}...`}
              className="cursor-pointer pr-10 w-[128] lg:w-[200] xl:w-[340]"
              readOnly
            />
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="mb-[20]">{t("searchBtn")}</DialogTitle>

            {/* <Input variant="default" placeholder="Пошук..." className="pr-10 w-full" /> */}
            <div className="relative cursor-pointer">
              <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                <SearchIcon className="fill-muted-foreground" />
              </span>

              <Input variant="default" placeholder={`${t("searchBtn")}...`} className="pr-10 w-full" />
            </div>

            <div className="min-h-[400]">
              {true ? (
                <div className="max-h-[70vh] overflow-auto">
                  {[...Array(15)].map((_, index) => (
                    <div
                      key={index}
                      className="mb-[10] py-[10] px-[15] flex items-center gap-[10] border border-border rounded-[20] cursor-pointer hover:bg-secondary"
                    >
                      <div className="w-[40] h-[40]">
                        <img src="https://www.shutterstock.com/image-vector/no-image-available-icon-template-600nw-1036735678.jpg" />
                      </div>

                      <h4 className="font-medium flex-1">Samsung 6/64 Black</h4>
                      <p className="font-bold text-primary">12 200 грн.</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="pt-[30] text-center">Шукаємо...</p>
              )}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Search;
