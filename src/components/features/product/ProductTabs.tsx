import React from "react";
import { useLocale } from "next-intl";

import { ProductModel } from "@/graphql/generated/output";
import { getProductAttributeLabel } from "@/utils/get-product-attribute-label";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/common/Tabs";

interface IProductTabsProps {
  product?: ProductModel;
}

const ProductTabs: React.FC<IProductTabsProps> = ({ product }) => {
  const locale = useLocale();

  if (!product) return;

  return (
    <Tabs defaultValue="description">
      <TabsList>
        <TabsTrigger value="description">Опис</TabsTrigger>
        <TabsTrigger value="technical-specifications">Технічні характеристики</TabsTrigger>
        <TabsTrigger value="reviews">Відгуки (10)</TabsTrigger>
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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde natus placeat quia odio exercitationem, quas
        quaerat, repellendus tempora, corrupti ullam nulla excepturi velit! Voluptas molestias repellat recusandae,
        ratione fuga cupiditate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde natus placeat quia odio
        exercitationem, quas quaerat, repellendus tempora, corrupti ullam nulla excepturi velit! Voluptas molestias
        repellat recusandae, ratione fuga cupiditate.
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
