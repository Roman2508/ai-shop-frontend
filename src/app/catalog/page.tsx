"use client";

import React from "react";
import Link from "next/link";
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
import CatalogCard from "@/components/features/CatalogCard";
import ProductsPagination from "@/components/features/ProductsPagination";
import CatalogCardSkeleton from "@/components/features/CatalogCardSkeleton";
import ProductFilter from "@/components/features/product-filter/ProductFilter";
import CatalogFilters from "@/components/features/catalog-filters/CatalogFilters";

const CatalogPage = () => {
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

  return (
    <div className="max-w-[1640px] mx-auto px-[16px]">
      <Breadcrumb className="mb-[45px]">
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

      <h1 className="text-xl font-semibold mb-[45px]">{t("title")}</h1>

      <div className="flex items-baseline gap-[40px]">
        {/* filters */}
        <Card className="px-[20px] py-[28px] w-[300px] min-w-[300px] hidden xl:block">
          <ProductFilter
            filter={filter}
            setFilter={setFilter}
            maxPrice={maxPrice}
            handleChangeFilter={handleChangeFilter}
            fetchFilteredData={fetchFilteredData}
          />
        </Card>

        <div className="flex flex-col gap-[34px] grow">
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
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-[18px]"
                : "grid grid-cols-1 gap-[18px]"
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
