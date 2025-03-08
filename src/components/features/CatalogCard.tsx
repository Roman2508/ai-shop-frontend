import React from "react";
import { Card } from "../ui/common/Card";
import { Button } from "../ui/common/Button";
import { Input } from "../ui/common/Input";
import WishlistIcon from "../images/WishlistIcon";
import { ProductModel } from "@/graphql/generated/output";
import Link from "next/link";

type CatalogCardPropsType = {
  product: ProductModel;
  viewType: "cards" | "rows";
};

const CatalogCard: React.FC<CatalogCardPropsType> = ({ product, viewType }) => {
  return (
    <Card className={viewType === "cards" ? "pb-[30] pt-[20] px-[20]" : "flex py-[24] pl-[16] pr-[30] gap-[20]"}>
      <div className={viewType === "cards" ? "flex justify-end gap-[10]" : "hidden"}>
        <Button size="icon" variant="icon" className="text-muted-foreground hover:border-muted-foreground">
          <WishlistIcon className="fill-muted-foreground" />
        </Button>
      </div>

      <div className="my-[10]">
        <Link href={`/catalog/${product.id}`}>
          <img
            className={viewType === "cards" ? "h-[260] w-full object-cover" : "h-[200]"}
            src="https://www.shutterstock.com/image-vector/no-image-available-icon-template-600nw-1036735678.jpg"
          />
        </Link>
      </div>

      <div className={viewType === "cards" ? "" : "flex justify-between w-full gap-[20]"}>
        <div className={viewType === "cards" ? "" : "w-full"}>
          <div className={viewType === "cards" ? "hidden" : "flex justify-end gap-[10]"}>
            <Button size="icon" variant="icon" className="text-muted-foreground hover:border-muted-foreground">
              <WishlistIcon />
            </Button>
          </div>

          <h3 className="mb-[16] text-primary font-semibold truncate">
            <Link href={`/catalog/${product.id}`}>
              {`${product.brand}, ${product.ram}/${product.builtInMemory} ГБ, ${product.color}`}
            </Link>
          </h3>
          <p className="mb-[16] h-[80] text-sm line-clamp-4">{product.title}</p>
        </div>

        <div className={viewType === "cards" ? "" : "flex flex-col justify-center border-l rounded-r-[5] pl-[20]"}>
          <b className="block mb-[16]">{product.price.toLocaleString("uk-UA")} грн</b>

          <div className={viewType === "cards" ? "flex mt-auto" : "flex flex-col w-[230]"}>
            <div
              className={
                viewType === "cards"
                  ? "flex items-center border border-border rounded-l-[5] w-[50%]"
                  : "flex items-center border border-border rounded-l-[5] w-[100%]"
              }
            >
              <Button
                className={
                  viewType === "cards"
                    ? "p-[10] pl-[15] bg-transparent text-text"
                    : "p-[10] pl-[40] bg-transparent text-text"
                }
              >
                {"-"}
              </Button>
              <Input value={1} className="border-[0] grow text-center" />
              <Button
                className={
                  viewType === "cards"
                    ? "p-[10] pr-[15] bg-transparent text-text"
                    : "p-[10] pr-[40] bg-transparent text-text"
                }
              >
                +
              </Button>
            </div>
            <Button
              className={
                viewType === "cards" ? "rounded-r-[5] rounded-l-[0] w-[50%]" : "rounded-b-[5] rounded-t-[0] w-[100%]"
              }
            >
              В корзину
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CatalogCard;
