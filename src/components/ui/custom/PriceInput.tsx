"use client";

import React from "react";
import { Input } from "../common/Input";
import { InputMaybe, PaginateAndFilterInput } from "@/graphql/generated/output";

type PriceInputPropsType = {
  price?: InputMaybe<number>;
  locale: string;
  maxPrice: number;
  variant?: "from" | "to";
  handleChangeFilter: (key: keyof PaginateAndFilterInput, value: string) => void;
};

const PriceInput: React.FC<PriceInputPropsType> = ({
  price,
  locale,
  maxPrice,
  variant = "from",
  handleChangeFilter,
}) => {
  const defaultValue = variant === "from" ? 0 : maxPrice;
  const [value, setValue] = React.useState(defaultValue);

  React.useEffect(() => {
    if (!price) return;
    setValue(Number(price));
  }, [price]);

  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-sm">
        {variant === "from" && locale === "ua" && "Від"}
        {variant === "from" && locale === "en" && "From"}
        {variant === "to" && locale === "ua" && "До"}
        {variant === "to" && locale === "en" && "To"}
      </span>

      <Input
        min={0}
        maxLength={5}
        value={value}
        max={maxPrice}
        variant="secondary"
        className="grow text-center pl-[18px] pr-[5px]"
        onChange={(e) => {
          setValue(Number(e.target.value));
          handleChangeFilter(variant === "from" ? "priceFrom" : "priceTo", e.target.value);
        }}
      />

      <span className="absolute inset-y-0 right-0 flex items-center pr-2">₴</span>
    </div>
  );
};

export default PriceInput;
