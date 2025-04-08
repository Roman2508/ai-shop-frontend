"use client";
import React from "react";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/common/Breadcrumb";
import { Button } from "@/components/ui/common/Button";
import ProductActionsForm from "@/components/features/product-actions-form/ProductActionsForm";

const CreateProductPage = ({}) => {
  return (
    <div className="max-w-[1640px] mx-auto px-[16px]">
      <Breadcrumb className="mb-[45px]">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/components">Components</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
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
