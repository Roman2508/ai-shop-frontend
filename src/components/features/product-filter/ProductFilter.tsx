import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { DialogCloseProps } from "@radix-ui/react-dialog";

import { Label } from "@/components/ui/common/Label";
import { Slider } from "@/components/ui/common/Slider";
import { Button } from "@/components/ui/common/Button";
import PriceInput from "@/components/ui/custom/PriceInput";
import { Checkbox } from "@/components/ui/common/Checkbox";
import { productInputFilters } from "@/constants/product-filters";
import { PaginateAndFilterInput } from "@/graphql/generated/output";
import { useRouter, useSearchParams } from "next/navigation";

interface IProductFilterProps {
  maxPrice: number;
  filter: PaginateAndFilterInput;
  fetchFilteredData: (additionalFilter?: PaginateAndFilterInput) => void;
  setFilter: React.Dispatch<React.SetStateAction<PaginateAndFilterInput>>;
  handleChangeFilter: (key: keyof PaginateAndFilterInput, value: string) => void;
  DrawerClose?: React.ForwardRefExoticComponent<DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
}

const ProductFilter: React.FC<IProductFilterProps> = ({
  filter,
  maxPrice,
  setFilter,
  DrawerClose,
  handleChangeFilter,
  fetchFilteredData,
}) => {
  const locale = useLocale();

  const t = useTranslations("catalog");

  return (
    <>
      {productInputFilters.map((filter) => (
        <div className="pb-[28] mb-[28] border-b-2" key={filter.key}>
          <b className="block mb-[20]">{locale === "ua" ? filter.label_ua : filter.label_en}</b>

          <div className="max-h-[230] overflow-y-auto">
            {filter.items.map((el) => (
              <div className="flex items-center space-x-2 mt-[12]" key={el.key}>
                <Label className="flex items-center gap-[12]" onClick={() => handleChangeFilter(filter.key, el.key)}>
                  <Checkbox />
                  <p className={filter.key === "color" ? "first-letter:uppercase" : ""}>
                    {locale === "ua" ? el.label_ua : el.label_en}
                  </p>
                </Label>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="pb-[28] mb-[28] border-b-2">
        <b className="block mb-[20]">{t("filter.price")}</b>

        <Slider
          min={0}
          step={100}
          max={maxPrice}
          defaultValue={[0, maxPrice]}
          value={[filter.priceFrom || 0, filter.priceTo || maxPrice]}
          onValueChange={(e) => {
            // debouncedChangePriceFrom(e[0])
            // debouncedChangePriceTo(e[1])
            handleChangeFilter("priceFrom", String(e[0]));
            handleChangeFilter("priceTo", String(e[1]));
          }}
        />
        <div className="mt-[30] flex gap-[10] align-center">
          <PriceInput
            variant="from"
            locale={locale}
            maxPrice={maxPrice}
            price={filter.priceFrom}
            handleChangeFilter={handleChangeFilter}
          />
          <span className="flex align-center"> - </span>
          <PriceInput
            variant="to"
            locale={locale}
            maxPrice={maxPrice}
            price={filter.priceTo}
            handleChangeFilter={handleChangeFilter}
          />
        </div>
      </div>

      {DrawerClose ? (
        <DrawerClose>
          <Button
            variant="default"
            className="w-full mb-[10]"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              fetchFilteredData();
            }}
          >
            {t("filter.applyFilters")}
          </Button>
          <Button
            variant="link"
            className="w-full"
            onClick={() => {
              alert("FIX");
              setFilter({});
            }}
          >
            {t("filter.resetFilters")}
          </Button>
        </DrawerClose>
      ) : (
        <>
          {" "}
          <Button
            variant="default"
            className="w-full mb-[10]"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              fetchFilteredData();
            }}
          >
            {t("filter.applyFilters")}
          </Button>
          <Button
            variant="link"
            className="w-full"
            onClick={() => {
              alert("FIX");
              setFilter({});
            }}
          >
            {t("filter.resetFilters")}
          </Button>
        </>
      )}
    </>
  );
};

export default ProductFilter;
