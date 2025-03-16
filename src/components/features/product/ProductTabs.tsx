"use-client";
import React from "react";
import { Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/common/Button";
import { ProductModel } from "@/graphql/generated/output";
import { Textarea } from "@/components/ui/common/Textarea";
import { getProductAttributeLabel } from "@/utils/get-product-attribute-label";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/common/Tabs";

interface IProductTabsProps {
  product?: ProductModel;
}

const ProductTabs: React.FC<IProductTabsProps> = ({ product }) => {
  const t = useTranslations("fullProduct");

  const locale = useLocale();

  if (!product) return;

  return (
    <Tabs defaultValue="description">
      <TabsList>
        <TabsTrigger value="description">{t("tabs.description")}</TabsTrigger>
        <TabsTrigger value="technical-specifications">{t("tabs.params")}</TabsTrigger>
        <TabsTrigger value="reviews">{t("tabs.reviews")} (10)</TabsTrigger>
      </TabsList>

      {/* description */}
      <TabsContent value="description">{product.title}</TabsContent>

      {/* product specifications */}
      <TabsContent value="technical-specifications">
        {product &&
          (Object.keys(product) as Array<keyof ProductModel>).map((key: keyof ProductModel) => {
            const excludedKeys = ["id", "title", "price", "images", "createdAt", "updatedAt", "__typename"];

            if (!excludedKeys.includes(key)) {
              return (
                <div className="flex py-[10] border-t border-dashed">
                  <p className="w-[20%]">{getProductAttributeLabel(key, locale as "ua" | "en")}</p>
                  <p className="w-[80%]">{product[key]}</p>
                </div>
              );
            }
          })}
      </TabsContent>

      {/* reviews */}
      <TabsContent value="reviews">
        <div className="w-[100%] xl:w-[50%]">
          <div className="mb-[10] py-[10] px-[15]  border border-border rounded-[20]">
            <Textarea placeholder="Напишить свій відгук сюди"></Textarea>
            <div className="flex justify-end mt-[15]">
              <Button className="h-[42]">Відправити</Button>
            </div>
          </div>

          {[...Array(5)].map((_, index) => (
            <div className="mb-[10] py-[10] px-[15]  border border-border rounded-[20]" key={index}>
              <div className="flex justify-between w-full">
                <div className="flex items-center gap-[10]">
                  <div className="w-[50] h-[50]">
                    <img src="https://www.shutterstock.com/image-vector/no-image-available-icon-template-600nw-1036735678.jpg" />
                  </div>

                  <h4 className="font-medium flex-1">User Name</h4>
                </div>
                <div className="flex items-center gap-[15]">
                  <p className="text-xs opacity-[0.7]">12.01.2024</p>
                  <Button size="icon" variant="icon">
                    <Trash2 className="h-24 w-24 stroke-black opacity-[0.7]" />
                  </Button>
                </div>
              </div>

              <div className="my-[10]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere vero nemo quam tempore error! Explicabo
                eius perferendis eum
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
