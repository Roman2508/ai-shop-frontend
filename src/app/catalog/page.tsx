import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/common/Breadcrumb";
import { Button } from "@/components/ui/common/Button";
import { Card } from "@/components/ui/common/Card";
import { Checkbox } from "@/components/ui/common/Checkbox";
import { Input } from "@/components/ui/common/Input";
import { Label } from "@/components/ui/common/Label";
import Link from "next/link";
import React from "react";

type Props = {};

const CatalogPage = (props: Props) => {
  return (
    <div className="max-w-[1640] mx-auto px-[16]">
      <Breadcrumb className="mb-[45]">
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

      <h1 className="text-xl font-semibold mb-[45]">
        Средства и системы охранно-пожарной сигнализации
      </h1>

      <div className="flex gap-[40]">
        <div>
          <Card className="px-[20] py-[28] w-[300]">
            {Array(4)
              .fill(null)
              .map(() => (
                <div className="pb-[28] mb-[28] border-b-2">
                  <b className="block mb-[20]">Бренд</b>

                  <div>
                    {[
                      "Apple",
                      "Samsung",
                      "Meizu",
                      "Pocco",
                      "Xiaomi",
                      "LG",
                      "Nokia",
                    ].map((el) => (
                      <div className="flex items-center space-x-2 mt-[12]">
                        <Label className="flex items-center gap-[12]">
                          <Checkbox />
                          <p>{el}</p>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </Card>
        </div>

        <div className="flex flex-col gap-[34] grow">
          <div className="flex justify-between items-center">
            <div>
              Товаров в категории: <b>1998</b>
            </div>

            <div className="flex items-center gap-[50]">
              <div className="flex items-center gap-[10]">
                <p>Сортувати</p>
                <Button
                  variant="secondary"
                  className="bg-card text-text-muted-foreground"
                >
                  По умолчанию
                </Button>
              </div>

              <div className="flex items-center gap-[30]">
                <div className="flex items-center gap-[10]">
                  <div className="">Показати на сторінці</div>
                  <Button
                    size="icon"
                    variant="icon"
                    className="text-muted-foreground hover:border-muted-foreground"
                  >
                    20
                  </Button>
                </div>

                <div className="">view</div>
              </div>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-4 gap-[18]">
              {Array(20)
                .fill(null)
                .map((el) => (
                  <Card className="pb-[30] pt-[20] px-[20]">
                    <div className="flex justify-end gap-[10]">
                      <Button
                        size="icon"
                        variant="icon"
                        className="text-muted-foreground hover:border-muted-foreground"
                      >
                        20
                      </Button>
                      <Button
                        size="icon"
                        variant="icon"
                        className="text-muted-foreground hover:border-muted-foreground"
                      >
                        20
                      </Button>
                    </div>

                    <div className="my-[10]">
                      <img
                        height="260px"
                        src="https://www.shutterstock.com/image-vector/no-image-available-icon-template-600nw-1036735678.jpg"
                      />
                    </div>

                    <div>
                      <h3 className="mb-[16] text-primary font-semibold">
                        DS-2CD2423G2-I(2.8мм)
                      </h3>
                      <p className="mb-[16] text-sm">
                        Профессиональная видеокамера IP компактная
                        DS-2CD2423G2-I(2.8мм)
                      </p>
                      <b className="block mb-[16]">10 990,00 ₽/шт</b>

                      <div className="flex">
                        <div className="flex items-center border border-border rounded-l-[5] w-[50%]">
                          <Button className="p-[10] bg-transparent text-text">
                            -
                          </Button>
                          <Input
                            value={1}
                            className="border-[0] grow text-center"
                          />
                          <Button className="p-[10] bg-transparent text-text">
                            +
                          </Button>
                        </div>
                        <Button className="rounded-r-[5] rounded-l-[0] w-[50%]">
                          В корзину
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>

            <div>pagination</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
