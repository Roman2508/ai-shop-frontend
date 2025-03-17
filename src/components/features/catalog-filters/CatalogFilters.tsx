"use client";

import React from "react";

import {
  Select,
  SelectItem,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/common/Select";
import {
  Drawer,
  DrawerClose,
  DrawerTitle,
  DrawerHeader,
  DrawerContent,
  DrawerTrigger,
  DrawerDescription,
} from "@/components/ui/common/Drawer";
import { Button } from "@/components/ui/common/Button";
import ViewCardIcon from "@/components/images/ViewCardIcon";
import ViewRowsIcon from "@/components/images/ViewRowsIcon";
import ProductFilter from "@/components/features/product-filter/ProductFilter";
import { PaginateAndFilterInput } from "@/graphql/generated/output";
import { useLocale, useTranslations } from "next-intl";

interface ICatalogFiltersProps {
  maxPrice: number;
  viewType: "cards" | "rows";
  filter: PaginateAndFilterInput;
  setViewType: React.Dispatch<React.SetStateAction<"cards" | "rows">>;
  fetchFilteredData: (additionalFilter?: PaginateAndFilterInput) => void;
  setFilter: React.Dispatch<React.SetStateAction<PaginateAndFilterInput>>;
  handleChangeFilter: (key: keyof PaginateAndFilterInput, value: string) => void;
}

const CatalogFilters: React.FC<ICatalogFiltersProps> = ({
  filter,
  viewType,
  maxPrice,
  setFilter,
  setViewType,
  fetchFilteredData,
  handleChangeFilter,
}) => {
  const t = useTranslations("catalog");

  return (
    <div className="flex items-center justify-between gap-[50] w-full flex-col md:flex-row">
      <div className="flex items-center gap-[10]">
        <Drawer>
          <DrawerTrigger>
            <Button className="block xl:hidden">Фільтри</Button>
          </DrawerTrigger>

          <DrawerContent>
            <DrawerHeader>
              <div className="flex justify-between items-center">
                <DrawerTitle>Фільтри</DrawerTitle>

                <DrawerClose>
                  <Button variant="secondary" size="icon" className="">
                    X
                  </Button>
                </DrawerClose>
              </div>

              <DrawerDescription>
                <ProductFilter
                  filter={filter}
                  setFilter={setFilter}
                  maxPrice={maxPrice}
                  handleChangeFilter={handleChangeFilter}
                  fetchFilteredData={fetchFilteredData}
                />
              </DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>

        <p className="text-nowrap hidden 2xl:block">{t("filter.sort.title")}</p>

        <Select onValueChange={(value) => fetchFilteredData({ sortBy: value })}>
          <SelectTrigger>
            <SelectValue placeholder={t("filter.sort.byDefault")} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="default">{t("filter.sort.byDefault")}</SelectItem>
              <SelectItem value="rating">{t("filter.sort.byRating")}</SelectItem>
              <SelectItem value="new">{t("filter.sort.byNew")}</SelectItem>
              <SelectItem value="price:asc">{t("filter.sort.byPrice:asc")}</SelectItem>
              <SelectItem value="price:desc">{t("filter.sort.byPrice:desc")}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-[30]">
        <div className="flex items-center gap-[10]">
          <div className="">{t("filter.itemsPerPage")}</div>
          <Select onValueChange={(value) => fetchFilteredData({ limit: Number(value) })}>
            <SelectTrigger className="w-[75]">
              <SelectValue placeholder="24" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="24">24</SelectItem>
                <SelectItem value="48">48</SelectItem>
                <SelectItem value="72">72</SelectItem>
                <SelectItem value="94">94</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Button size="icon" variant="icon" className="border-none w-[44] h-[44]" onClick={() => setViewType("cards")}>
            <ViewCardIcon className={viewType === "cards" ? "fill-primary" : "fill-accent-foreground"} />
          </Button>

          <Button size="icon" variant="icon" className="border-none w-[44] h-[44]" onClick={() => setViewType("rows")}>
            <ViewRowsIcon className={viewType === "rows" ? "fill-primary" : "fill-accent-foreground"} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CatalogFilters;
