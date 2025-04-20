"use client";
import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/common/Breadcrumb";
import { Button } from "@/components/ui/common/Button";
import ProductActionsForm from "@/components/features/product-actions-form/ProductActionsForm";

const CreateProductPage = ({}) => {
  const t = useTranslations("admin.products");

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
          <h1 className="text-3xl font-semibold">Створити новий товар</h1>

          <div className="flex gap-[10px]">
            <Button variant="outline" className="h-[36px]">
              Фільтр
            </Button>
            <Button variant="default" className="h-[36px]">
              + Додати товар
            </Button>
          </div>
        </div>

        <ProductActionsForm />
      </div>
    </div>
  );
};

export default CreateProductPage;
