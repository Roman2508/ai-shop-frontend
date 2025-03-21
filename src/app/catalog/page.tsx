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
import ProductsPagination from "@/components/features/ProductsPagination";
import CatalogCardSkeleton from "@/components/features/CatalogCardSkeleton";
import ProductFilter from "@/components/features/product-filter/ProductFilter";
import CatalogFilters from "@/components/features/catalog-filters/CatalogFilters";
import { useRouter, useSearchParams } from "next/navigation";

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
      // updateFilters({ ...filter, ...additionalFilter });
      const items = filteredData?.paginateAndFilter ? filteredData.paginateAndFilter.products : [];
      setProducts(items as ProductModel[]);
      const total = filteredData?.paginateAndFilter ? filteredData.paginateAndFilter.total : 0;
      setTotal(total);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (!products.length) {
      const items = data?.getAllProducts ? data.getAllProducts.products : [];
      setProducts(items as ProductModel[]);
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

  /*  */
  /*  */
  /*  */

  // const searchParams = useSearchParams();
  // const router = useRouter();

  // const updateFilters = (newFilters: PaginateAndFilterInput) => {
  //   const params = new URLSearchParams(searchParams.toString());
  //   Object.entries(newFilters).forEach(([key, value]) => {
  //     if (value) {
  //       // @ts-ignore
  //       params.set(key, value);
  //     } else {
  //       params.delete(key);
  //     }
  //   });
  //   router.push(`?${params.toString()}`);
  // };

  // React.useEffect(() => {
  //   const params = {
  //     brand: searchParams.get("brand") || undefined,
  //     battery: searchParams.get("battery") || undefined,
  //     builtInMemory: searchParams.get("builtInMemory") || undefined,
  //     color: searchParams.get("color") || undefined,
  //     deliverySet: searchParams.get("deliverySet") || undefined,
  //     frontCamera: searchParams.get("frontCamera") || undefined,
  //     mainCamera: searchParams.get("mainCamera") || undefined,
  //     materials: searchParams.get("materials") || undefined,
  //     os: searchParams.get("os") || undefined,
  //     priceFrom: Number(searchParams.get("priceFrom")) || undefined,
  //     priceTo: Number(searchParams.get("priceTo")) || undefined,
  //     processorCores: searchParams.get("processorCores") || undefined,
  //     processorName: searchParams.get("processorName") || undefined,
  //     ram: searchParams.get("ram") || undefined,
  //     screenDiagonal: searchParams.get("screenDiagonal") || undefined,
  //     simCount: searchParams.get("simCount") || undefined,
  //     simFormat: searchParams.get("simFormat") || undefined,
  //     limit: Number(searchParams.get("limit")) || undefined,
  //     skip: Number(searchParams.get("skip")) || undefined,
  //     sortBy: searchParams.get("sortBy") || undefined,
  //   };

  //   const cleanParams = Object.fromEntries(Object.entries(params).filter(([key, value]) => value !== undefined));
  //   setFilter(cleanParams);
  // }, [searchParams]);

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

          <ProductsPagination
            total={total}
            filter={filter}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            fetchFilteredData={fetchFilteredData}
          />
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
