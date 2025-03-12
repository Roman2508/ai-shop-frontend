"use client";

import React from "react";
import Link from "next/link";
import { useDebouncedCallback } from "use-debounce";
import { useLocale, useTranslations } from "next-intl";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/common/Breadcrumb";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationContent,
  PaginationEllipsis,
} from "@/components/ui/common/Pagination";
import {
  Select,
  SelectItem,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/common/Select";
import {
  ProductModel,
  useGetAllProductsQuery,
  PaginateAndFilterInput,
  usePaginateAndFilterProductsQuery,
} from "@/graphql/generated/output";
import { Card } from "@/components/ui/common/Card";
import { Label } from "@/components/ui/common/Label";
import { Button } from "@/components/ui/common/Button";
import { Slider } from "@/components/ui/common/Slider";
import { Checkbox } from "@/components/ui/common/Checkbox";
import PriceInput from "@/components/ui/custom/PriceInput";
import CatalogCard from "@/components/features/CatalogCard";
import ViewCardIcon from "@/components/images/ViewCardIcon";
import ViewRowsIcon from "@/components/images/ViewRowsIcon";
import { productInputFilters } from "@/constants/product-filters";
import CatalogCardSkeleton from "@/components/features/CatalogCardSkeleton";

const CatalogPage = () => {
  const locale = useLocale();
  const t = useTranslations("catalog");

  const [isLoading, setIsLoading] = React.useState(false);
  const [maxPrice, setMaxPrice] = React.useState(100000);
  const [total, setTotal] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [filter, setFilter] = React.useState<PaginateAndFilterInput>({});
  const [viewType, setViewType] = React.useState<"cards" | "rows">("cards");

  const [products, setProducts] = React.useState<ProductModel[]>([]);

  const { data } = useGetAllProductsQuery();
  const { refetch: refetchFilteredData } = usePaginateAndFilterProductsQuery({
    variables: { query: filter },
    skip: true,
  });

  const debouncedChangePriceFrom = useDebouncedCallback((value) => {
    handleChangeFilter("priceFrom", String(value));
  }, 100);
  const debouncedChangePriceTo = useDebouncedCallback((value) => {
    handleChangeFilter("priceTo", String(value));
  }, 100);

  const handleChangeFilter = (key: keyof PaginateAndFilterInput, value: string) => {
    setFilter((prev: PaginateAndFilterInput) => {
      let newFilters: PaginateAndFilterInput = {};
      const filterKeys = ["priceFrom", "priceTo", "sortBy", "limit", "skip"];

      if (filterKeys.some((el) => el === key)) {
        return { ...prev, [key]: Number(value) };
      }

      if (!prev[key]) {
        newFilters = { ...prev, [key]: value };
      }

      if (key in prev && typeof prev[key] === "string") {
        const prevSelected = prev[key].split(";");

        if (!prevSelected.length) {
          newFilters = { ...prev, [key]: value };
        }

        if (prevSelected.some((el) => el === value)) {
          const filterSelected = prevSelected.filter((el) => el !== value).join(";");
          newFilters = { ...prev, [key]: filterSelected };
        } else {
          newFilters = { ...prev, [key]: `${prev[key]};${value}` };
        }
      }

      const withoutEmpty: PaginateAndFilterInput = {};

      for (const key in newFilters) {
        if (!!newFilters[key as keyof PaginateAndFilterInput]) {
          // @ts-ignore
          withoutEmpty[key] = newFilters[key as keyof PaginateAndFilterInput];
        }
      }

      return withoutEmpty;
    });
  };

  const fetchFilteredData = async (additionalFilter: PaginateAndFilterInput | undefined = {}) => {
    try {
      setIsLoading(true);
      const { data: filteredData } = await refetchFilteredData({ query: { ...filter, ...additionalFilter } });

      const items = filteredData?.paginateAndFilter ? filteredData.paginateAndFilter.products : [];
      setProducts(items);
      const total = filteredData?.paginateAndFilter ? filteredData.paginateAndFilter.total : 0;
      setTotal(total);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (!products.length) {
      const items = data?.getAllProducts ? data.getAllProducts.products : [];
      setProducts(items);
      const total = data?.getAllProducts ? data.getAllProducts.total : 0;
      setTotal(total);
    }

    if (!data?.getAllProducts.products.length) return;
    let maxPrice = 0;

    data.getAllProducts.products.forEach((el) => {
      if (el.price > maxPrice) {
        maxPrice = el.price;
      }
    });
    setMaxPrice(maxPrice);
  }, [data]);

  return (
    <div className="max-w-[1640] mx-auto px-[16]">
      <Breadcrumb className="mb-[45]">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/">{t("breadcrumbs.home")}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>{t("breadcrumbs.catalog")}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-xl font-semibold mb-[45]">{t("title")}</h1>

      <div className="flex items-baseline gap-[40]">
        {/* filters */}
        <Card className="px-[20] py-[28] w-[300] min-w-[300]">
          {productInputFilters.map((filter) => (
            <div className="pb-[28] mb-[28] border-b-2" key={filter.key}>
              <b className="block mb-[20]">{locale === "ua" ? filter.label_ua : filter.label_en}</b>

              <div className="max-h-[230] overflow-y-auto">
                {filter.items.map((el) => (
                  <div className="flex items-center space-x-2 mt-[12]" key={el.key}>
                    <Label
                      className="flex items-center gap-[12]"
                      onClick={() => handleChangeFilter(filter.key, el.key)}
                    >
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
        </Card>

        <div className="flex flex-col gap-[34] grow">
          {/* catalog filters */}
          <div className="flex justify-between items-center">
            <div>
              {`${t("filter.totalItems")} `}
              <b>{products.length}</b>
            </div>

            <div className="flex items-center gap-[50]">
              <div className="flex items-center gap-[10]">
                <p className="text-nowrap">{t("filter.sort.title")}</p>

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
                  <Button
                    size="icon"
                    variant="icon"
                    className="border-none w-[44] h-[44]"
                    onClick={() => setViewType("cards")}
                  >
                    <ViewCardIcon className={viewType === "cards" ? "fill-primary" : "fill-accent-foreground"} />
                  </Button>

                  <Button
                    size="icon"
                    variant="icon"
                    className="border-none w-[44] h-[44]"
                    onClick={() => setViewType("rows")}
                  >
                    <ViewRowsIcon className={viewType === "rows" ? "fill-primary" : "fill-accent-foreground"} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* catalog cards */}
          <div>
            <div
              className={
                viewType === "cards"
                  ? "grid md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-[18]"
                  : "grid grid-cols-1 gap-[18]"
              }
            >
              {!isLoading && data
                ? products.map((product) => <CatalogCard product={product} viewType={viewType} />)
                : Array(12)
                    .fill(null)
                    .map((_, index) => <CatalogCardSkeleton key={index} viewType={viewType} />)}
            </div>

            <Pagination className="mt-[40]">
              <PaginationContent>
                <PaginationItem
                  onClick={() => {
                    setCurrentPage((prev) => {
                      if (prev - 1 > 0) {
                        const skip = (filter.limit || 24) * (prev - 1);
                        fetchFilteredData({ skip: skip - 1 });
                        return prev - 1;
                      } else {
                        return prev;
                      }
                    });
                  }}
                >
                  {/* <PaginationPrevious href="#" /> */}
                  <PaginationLink href="#" className="px-[5] w-[100]">
                    <Button variant="link">{`< ${t("pagination.prev")}`}</Button>
                  </PaginationLink>
                </PaginationItem>
                {/* <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem> */}

                {Array(Math.ceil(total / (filter.limit || 24)))
                  .fill(null)
                  .map((_, index) => (
                    <PaginationItem
                      key={index}
                      onClick={() => {
                        const skip = (filter.limit || 24) * index + 1;
                        fetchFilteredData({ skip: skip - 1 });
                        setCurrentPage(index + 1);
                      }}
                    >
                      <PaginationLink href="#" isActive={index + 1 === currentPage}>
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>

                <PaginationItem
                  onClick={() => {
                    setCurrentPage((prev) => {
                      alert(111);
                      const pagesCount = Math.ceil(total / (filter.limit || 24));
                      if (prev + 1 <= pagesCount) {
                        const skip = (filter.limit || 24) * (prev + 1);
                        fetchFilteredData({ skip: skip + 1 });
                        return prev + 1;
                      } else {
                        return prev;
                      }
                    });
                  }}
                >
                  {/* <PaginationNext href="#" /> */}
                  <PaginationLink href="#" className="px-[5] w-[100]">
                    <Button variant="link" className="px-[5]">
                      {`${t("pagination.next")} >`}
                    </Button>
                  </PaginationLink>
                  {/*  */}
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
