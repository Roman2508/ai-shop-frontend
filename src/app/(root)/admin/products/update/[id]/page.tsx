"use client";
import React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/common/Breadcrumb";
import { ProductModel, useGetProductByIdQuery } from "@/graphql/generated/output";
import ProductActionsForm from "@/components/features/product-actions-form/ProductActionsForm";

const UpdateProductPage = () => {
  const t = useTranslations("admin.products");

  const { id } = useParams();

  const { data: product } = useGetProductByIdQuery({
    variables: { productId: typeof id === "string" ? id : "" },
    onCompleted() {
      toast.success("Завантажено");
    },
    onError() {
      toast.error("Помилка при завантаженні товару");
    },
  });

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
            <BreadcrumbLink>
              <Link href="/admin">{t("breadcrumbs.admin")}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-[46px]">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Оновити товар</h1>

          <div className="flex gap-[10px]"></div>
        </div>

        <ProductActionsForm product={product?.getProductById as ProductModel} id={id} />
      </div>
    </div>
  );
};

export default UpdateProductPage;
