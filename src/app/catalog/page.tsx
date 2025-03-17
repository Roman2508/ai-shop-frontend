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
  Drawer,
  DrawerClose,
  DrawerTitle,
  DrawerHeader,
  DrawerContent,
  DrawerTrigger,
  DrawerDescription,
} from "@/components/ui/common/Drawer";
import {
  ProductModel,
  useGetAllProductsQuery,
  PaginateAndFilterInput,
  usePaginateAndFilterProductsQuery,
} from "@/graphql/generated/output";
import { Card } from "@/components/ui/common/Card";
import { Button } from "@/components/ui/common/Button";
import CatalogCard from "@/components/features/CatalogCard";
import ViewCardIcon from "@/components/images/ViewCardIcon";
import ViewRowsIcon from "@/components/images/ViewRowsIcon";
import CatalogCardSkeleton from "@/components/features/CatalogCardSkeleton";
import ProductFilter from "@/components/features/product-filter/ProductFilter";
import CatalogFilters from "@/components/features/catalog-filters/CatalogFilters";

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
        <Card className="px-[20] py-[28] w-[300] min-w-[300] hidden xl:block">
          <ProductFilter
            filter={filter}
            setFilter={setFilter}
            maxPrice={maxPrice}
            handleChangeFilter={handleChangeFilter}
            fetchFilteredData={fetchFilteredData}
          />
        </Card>

        <div className="flex flex-col gap-[34] grow">
          {/* catalog filters */}
          <CatalogFilters
            filter={filter}
            maxPrice={maxPrice}
            viewType={viewType}
            setFilter={setFilter}
            setViewType={setViewType}
            handleChangeFilter={handleChangeFilter}
            fetchFilteredData={fetchFilteredData}
          />

          {/* catalog cards */}
          <div
            className={
              viewType === "cards"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-[18]"
                : "grid grid-cols-1 gap-[18]"
            }
          >
            {!isLoading && data
              ? products.map((product) => <CatalogCard product={product} viewType={viewType} />)
              : [...Array(12)].map((_, index) => <CatalogCardSkeleton key={index} viewType={viewType} />)}
          </div>

          <Pagination className="mt-[40]">
            <PaginationContent>
              <PaginationItem
                className="hidden sm:inline-flex"
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
                <PaginationLink href="#" className="px-[5] w-[100]">
                  <Button variant="link">{`< ${t("pagination.prev")}`}</Button>
                </PaginationLink>
              </PaginationItem>

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

              {/* <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem> */}

              <PaginationItem
                className="hidden sm:inline-flex"
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
                <PaginationLink href="#" className="px-[5] w-[100]">
                  <Button variant="link" className="px-[5]">
                    {`${t("pagination.next")} >`}
                  </Button>
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
