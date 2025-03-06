"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Tabs,
  TabsList,
  TabsContent,
  TabsTrigger,
} from "@/components/ui/common/Tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/common/Breadcrumb";
import { Card } from "@/components/ui/common/Card";
import SaveIcon from "@/components/images/SaveIcon";
import { Input } from "@/components/ui/common/Input";
import { Button } from "@/components/ui/common/Button";
import CatalogCard from "@/components/features/CatalogCard";
import ButtonWithIcon from "@/components/ui/custom/ButtonWithIcon";
import {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
} from "@/graphql/generated/output";
import { useRouter } from "next/router";

const ProductPage = () => {
  // const router = useRouter();

  const { data } = useGetAllProductsQuery();
  const { data: product } = useGetProductByIdQuery({
    variables: { productId: "633d79ec-dc50-40d5-9f19-3b6f99f7c305" },
    // variables: { productId: String(router.query.id) },
  });

  return (
    <div className="max-w-[1640] mx-auto px-[16]">
      <Breadcrumb className="mb-[45]">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/">Головна</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/catalog">Каталог</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <p className="text-right mb-[20] opacity-[60%]">Артикул: 123456</p>

        {/* main */}
        <div className="flex gap-[40] mb-[75]">
          <Card className="p-[10] w-[40%]">
            <div className="h-[600] w-[100%]">
              <img
                className="w-full block"
                src="https://www.shutterstock.com/image-vector/no-image-available-icon-template-600nw-1036735678.jpg"
              />
            </div>
          </Card>

          <div className="flex flex-col justify-between items-start gap-[20] w-[60%]">
            <h1 className="text-3xl font-semibold">
              {`${product?.getProductById.brand}, ${product?.getProductById.ram}/${product?.getProductById.builtInMemory} ГБ, ${product?.getProductById.color}`}
            </h1>

            {false ? (
              <ButtonWithIcon
                text="Зберегти"
                VectorIcon={SaveIcon}
                wrapperClassNames="w-[140]"
                iconClassNames="!text-border fill-current text-inherit stroke-current"
                classNames="w-full bg-border text-text-muted-foreground rounded-[5] justify-end pr-5"
              />
            ) : (
              <ButtonWithIcon
                text="Збережено"
                VectorIcon={SaveIcon}
                buttonVariant="outline"
                wrapperClassNames="w-[150]"
                classNames="w-full text-primary rounded-[5] justify-end px-4"
                iconClassNames="!text-primary fill-current text-inherit stroke-current"
              />
            )}

            <div className="flex gap-[30]">
              <Card className="p-[30] w-[60%]">
                <b className="mb-[10] block">Короткий опис</b>
                <p className="mb-[25]">{product?.getProductById.title}</p>

                <b className="mb-[10] block">Головні характеристики</b>
                {[
                  { name: "Код:", value: "224008" },
                  { name: "Производитель:", value: product?.getProductById.brand },
                  { name: "Функционал:", value: "Переговорное устройство" },
                ].map((el) => (
                  <div className="flex py-[10] border-t border-dashed">
                    <p className="w-[40%]">{el.name}</p>
                    <p className="w-[60%]">{el.value}</p>
                  </div>
                ))}
              </Card>

              <Card className="flex flex-col justify-between w-[40%]">
                <div className="p-[30]">
                  <p className="flex items-center gap-[6] pb-[15] mb-[30] border-b border-dashed text-sm">
                    <Image
                      src="/icons/check.png"
                      width={13}
                      height={10}
                      alt="check icon"
                    />
                    <span>Є в наявності</span>
                  </p>

                  <div className="flex flex-col items-center gap-[15]">
                    <div className="text-center">
                      <p className="text-sm opacity-[70%]">Ціна</p>
                      <b className="text-xl">11 078,00 грн.</b>
                    </div>

                    <div
                      className={
                        "flex items-center border border-border rounded-full w-[100%]"
                      }
                    >
                      <Button className="p-[10] pl-[40] bg-transparent text-text">
                        -
                      </Button>
                      <Input
                        value={1}
                        className="border-[0] grow text-center"
                      />
                      <Button className="p-[10] pr-[40] bg-transparent text-text">
                        +
                      </Button>
                    </div>

                    <ButtonWithIcon
                      text="В корзину"
                      iconVariant="left"
                      classNames="w-full"
                      buttonVariant="default"
                      wrapperClassNames="w-full"
                      iconSrc="/icons/shopping-bag.png"
                    />

                    <ButtonWithIcon
                      iconVariant="left"
                      classNames="w-full"
                      text="Купити в 1 клік"
                      buttonVariant="secondary"
                      wrapperClassNames="w-full"
                      iconSrc="/icons/wallet.png"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-[15] bg-secondary mt-auto px-[35] py-[30] rounded-t-[10]">
                  <Image
                    src="/images/box.png"
                    alt="box icon"
                    width={47}
                    height={47}
                    className="w-[47] h-[47]"
                  />
                  <p className="text-sm">
                    Безкоштовна доставка при замовленні від 50 000 грн., а також
                    при самовивозі
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* more info */}
        <div className="mb-[75]">
          {/* tabs */}

          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Опис</TabsTrigger>
              <TabsTrigger value="technical-specifications">
                Технічні характеристики
              </TabsTrigger>
              <TabsTrigger value="reviews">Відгуки (10)</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <p className="mb-[10]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                natus placeat quia odio exercitationem, quas quaerat,
                repellendus tempora, corrupti ullam nulla excepturi velit!
                Voluptas molestias repellat recusandae, ratione fuga cupiditate.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                natus placeat quia odio exercitationem, quas quaerat,
                repellendus tempora, corrupti ullam nulla excepturi velit!
                Voluptas molestias repellat recusandae, ratione fuga cupiditate.
              </p>
              <p className="mb-[10]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                natus placeat quia odio exercitationem, quas quaerat,
                repellendus tempora, corrupti ullam nulla excepturi velit!
                Voluptas molestias repellat recusandae, ratione fuga cupiditate.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                natus placeat quia odio exercitationem, quas quaerat,
                repellendus tempora, corrupti ullam nulla excepturi velit!
                Voluptas molestias repellat recusandae, ratione fuga cupiditate.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                natus placeat quia odio exercitationem, quas quaerat,
                repellendus tempora, corrupti ullam nulla excepturi velit!
                Voluptas molestias repellat recusandae, ratione fuga cupiditate.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                natus placeat quia odio exercitationem, quas quaerat,
                repellendus tempora, corrupti ullam nulla excepturi velit!
                Voluptas molestias repellat recusandae, ratione fuga cupiditate.
              </p>
            </TabsContent>
            <TabsContent value="technical-specifications">
              Change your password here.
            </TabsContent>
            <TabsContent value="reviews">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              natus placeat quia odio exercitationem, quas quaerat, repellendus
              tempora, corrupti ullam nulla excepturi velit! Voluptas molestias
              repellat recusandae, ratione fuga cupiditate. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Unde natus placeat quia
              odio exercitationem, quas quaerat, repellendus tempora, corrupti
              ullam nulla excepturi velit! Voluptas molestias repellat
              recusandae, ratione fuga cupiditate.
            </TabsContent>
          </Tabs>

          {/* content */}
        </div>

        {/* popular */}
        <div>
          <div className="flex justify-between mb-[50]">
            <h2 className="text-2xl font-semibold">Популярні товари</h2>
            <div className="flex gap-[10]">
              <Button
                size="icon"
                variant="outline"
                className="border-destructive text-destructive"
              >
                {"<"}
              </Button>

              <Button size="icon" variant="outline">
                {">"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-[18] grid-flow-col">
            {data
              ? data.getAllProducts
                  .slice(0, 5)
                  .map((product) => (
                    <CatalogCard product={product} viewType="cards" />
                  ))
              : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
