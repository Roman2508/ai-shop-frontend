"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import {
  ProductModel,
  useToggleCartMutation,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useToggleFavoriteMutation,
} from "@/graphql/generated/output";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/common/Breadcrumb";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import getPhotoUrl from "@/utils/get-photo-url";
import { useWishlist } from "@/hooks/useWishlist";
import { Card } from "@/components/ui/common/Card";
import SaveIcon from "@/components/images/SaveIcon";
import { Input } from "@/components/ui/common/Input";
import getProductTitle from "@/utils/getProductTitle";
import { Button } from "@/components/ui/common/Button";
import { Skeleton } from "@/components/ui/common/Skeleton";
import CatalogCard from "@/components/features/CatalogCard";
import ButtonWithIcon from "@/components/ui/custom/ButtonWithIcon";
import ProductTabs from "@/components/features/product/ProductTabs";
import CatalogCardSkeleton from "@/components/features/CatalogCardSkeleton";
import { getProductAttributeLabel } from "@/utils/get-product-attribute-label";

const mainCharacteristicsKeys = [
  { key: "screenDiagonal", label_ua: "Діагональ екрану", label_en: "Screen diagonal" },
  { key: "os", label_ua: "Операційна система", label_en: "OS" },
  { key: "frontCamera", label_ua: "Фронтальна камера", label_en: "Front camera" },
  { key: "mainCamera", label_ua: "Головна камера", label_en: "Main camera" },
  { key: "proccessorName", label_ua: "Назва процесора", label_en: "Processor name" },
  { key: "processorCores", label_ua: "Кількість ядер процесора", label_en: "Processor cores" },
];

const ProductPage = () => {
  const t = useTranslations("fullProduct");

  const router = useRouter();
  const { id } = useParams();
  const locale = useLocale();

  const { isAuthentificated } = useAuth();
  const { addItemToWishlist, removeItemFromWishlist, wishlistItems } = useWishlist();
  const { addItemToCart, cartItems, clearSelectedItems, toggleSelectedCartItems } = useCart();

  const [count, setCount] = React.useState(1);
  const [mainPhotoName, setMainPhotoName] = React.useState("");

  const { data } = useGetAllProductsQuery();

  const { data: product } = useGetProductByIdQuery({
    variables: { productId: typeof id === "string" ? id : "" },
  });

  const [addToFavorite, { loading: isFavoriteLoading }] = useToggleFavoriteMutation({
    onCompleted() {
      toast.success("Оновлено список збережених товарів");
    },
    onError() {
      toast.error("Помилка при оновленні списку збережених товарів");
    },
  });

  const [addToCart, { loading: isCartLoading }] = useToggleCartMutation({
    onCompleted() {
      toast.success("Товар було додано до вашої корзини");
    },
    onError() {
      toast.error("Помилка при видаленні товару з корзини");
    },
  });

  const isAddedToFavourite = wishlistItems.some((el) => el?.product?.id === product?.getProductById.id);
  const isAddedToCart = cartItems.some((el) => el?.product?.id === product?.getProductById.id);

  const toggleFavourite = async () => {
    if (!product) return;
    try {
      await addToFavorite({ variables: { productId: product.getProductById.id } });
      if (isAddedToFavourite) {
        removeItemFromWishlist(product.getProductById.id);
      } else {
        addItemToWishlist({ product: product.getProductById as ProductModel });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onAddToCart = async () => {
    if (!product) return;
    if (isAuthentificated) {
      addToCart({ variables: { input: { productId: product.getProductById.id, count } } });
      addItemToCart({ count, id: String(Math.random()), product: product.getProductById as ProductModel });
    } else {
      alert("Авторизуйтесь щоб додати товар в корзину");
    }
  };

  const buyIn1Click = async () => {
    if (!product) return;
    if (isAuthentificated) {
      clearSelectedItems();
      toggleSelectedCartItems(product.getProductById.id, count, product.getProductById as ProductModel);
      router.push("/checkout");
    } else {
      alert("Авторизуйтесь щоб купити товар");
    }
  };

  const onChangeCount = (action: "increment" | "decrement") => {
    setCount((prev) => {
      if (action === "increment") {
        return prev + 1;
      } else {
        if (prev - 1 !== 0) {
          return prev - 1;
        } else {
          return prev;
        }
      }
    });
  };

  React.useEffect(() => {
    if (product) {
      if (product.getProductById.images.length) {
        const firstPhotoName = product.getProductById.images[0];
        setMainPhotoName(firstPhotoName);
      }
    }
  }, [product]);

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
            <BreadcrumbLink>
              <Link href="/catalog">{t("breadcrumbs.catalog")}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product ? getProductTitle(product.getProductById) : ""}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <p className="text-right mb-[20] opacity-[60%]">
          {product ? `${t("article")} ${product.getProductById.id.slice(2, 8)}` : "..."}
        </p>

        {/* main */}
        <div className="flex gap-[40] mb-[75]">
          <Card className="p-[10] w-[40%]">
            <div className="h-[100%] w-[100%]">
              {product?.getProductById ? (
                <div className="flex flex-col h-full">
                  <div className="h-[80%]">
                    <img
                      className="w-full h-full block"
                      src={mainPhotoName ? getPhotoUrl(mainPhotoName, "products") : "/images/empty-image.webp"}
                    />
                  </div>

                  <div className="h-[20%] flex gap-[10] mt-[10] overflow-y-auto">
                    {product.getProductById.images.map((imgName) => {
                      return (
                        <img
                          src={imgName ? getPhotoUrl(imgName, "products") : "/images/empty-image.webp"}
                          onClick={() => setMainPhotoName(imgName)}
                          className="w-[100] h-[100] block cursor-pointer"
                        />
                      );
                    })}
                  </div>
                </div>
              ) : (
                <Skeleton className="w-full h-full" />
              )}
            </div>
          </Card>

          <div className="flex flex-col justify-between items-start gap-[20] w-[60%]">
            {product?.getProductById ? (
              <h1 className="text-3xl font-semibold">{getProductTitle(product.getProductById)}</h1>
            ) : (
              <Skeleton className="w-[70%] h-[36]" />
            )}

            {product?.getProductById ? (
              <>
                {isAuthentificated && (
                  <>
                    {isAddedToFavourite ? (
                      <ButtonWithIcon
                        VectorIcon={SaveIcon}
                        text={t("savedButton")}
                        buttonVariant="outline"
                        wrapperClassNames="w-[150]"
                        disabled={isFavoriteLoading}
                        onClick={() => toggleFavourite()}
                        classNames="w-full text-primary rounded-[5] justify-end px-4"
                        iconClassNames="!text-primary fill-current text-inherit stroke-current"
                      />
                    ) : (
                      <ButtonWithIcon
                        VectorIcon={SaveIcon}
                        text={t("saveButton")}
                        wrapperClassNames="w-[140]"
                        disabled={isFavoriteLoading}
                        onClick={() => toggleFavourite()}
                        iconClassNames="!text-border fill-muted-foreground text-inherit stroke-muted-foreground"
                        classNames="w-full bg-border text-text-muted-foreground rounded-[5] justify-end pr-5 w-[150]"
                      />
                    )}
                  </>
                )}
              </>
            ) : (
              <Skeleton className="w-[150] h-[46]" />
            )}

            <div className="flex gap-[30]">
              <Card className="p-[30] w-[60%]">
                {product?.getProductById ? (
                  <b className="mb-[10] block">{t("shortDescription")}</b>
                ) : (
                  <Skeleton className="mb-10 w-[120] h-[20]" />
                )}

                {product?.getProductById ? (
                  <p className="mb-[25] line-clamp-[4]">{product?.getProductById.title}</p>
                ) : (
                  <>
                    <Skeleton className="mb-2 w-full h-[16]" />
                    <Skeleton className="mb-2 w-full h-[16]" />
                    <Skeleton className="mb-2 w-full h-[16]" />
                    <Skeleton className="mb-[25] w-full h-[16]" />
                  </>
                )}

                {product?.getProductById ? (
                  <b className="mb-[10] block">{t("mainParams")}</b>
                ) : (
                  <Skeleton className="mb-10 w-[180] h-[20]" />
                )}

                {product?.getProductById ? (
                  <>
                    {(Object.keys(product.getProductById) as Array<keyof ProductModel>).map(
                      (key: keyof ProductModel) => {
                        const keys = mainCharacteristicsKeys.map((el) => el.key);

                        if (keys.includes(key)) {
                          return (
                            <div className="flex py-[10] border-t border-dashed">
                              <p className="w-[60%]">{getProductAttributeLabel(key, locale as "ua" | "en")}</p>
                              <p className="w-[40%]">{product.getProductById[key]}</p>
                            </div>
                          );
                        }
                      }
                    )}
                  </>
                ) : (
                  <>
                    {[...Array(4).fill(null)].map((_, index) => (
                      <div className="flex py-[10] border-t border-dashed" key={index}>
                        <div className="w-[60%]">
                          <Skeleton className="w-[100] h-[20]" />
                        </div>

                        <div className="w-[40%]">
                          <Skeleton className="w-[80%] h-[20]" />
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </Card>

              <Card className="flex flex-col justify-between w-[40%]">
                <div className="p-[30]">
                  {product?.getProductById ? (
                    <p className="flex items-center gap-[6] pb-[15] mb-[30] border-b border-dashed text-sm">
                      <Image src="/icons/check.png" width={13} height={10} alt="check icon" />
                      <span>{t("status")}</span>
                    </p>
                  ) : (
                    <Skeleton className="w-[40%] h-[20] pb-[15] mb-[30] border-b border-dashed text-sm" />
                  )}

                  <div className="flex flex-col items-center gap-[15]">
                    {product?.getProductById ? (
                      <div className="text-center">
                        <p className="text-sm opacity-[70%]">{t("price")}</p>
                        <b className="text-xl">
                          {product.getProductById.price.toLocaleString("uk-UA")} {t("currency")}
                        </b>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Skeleton className="w-[60] h-[20] mb-[4]" />
                        <Skeleton className="w-[120] h-[24]" />
                      </div>
                    )}

                    {product?.getProductById ? (
                      <>
                        <div className={"flex items-center border border-border rounded-full w-[100%]"}>
                          <Button
                            onClick={() => onChangeCount("decrement")}
                            className="p-[10] pl-[40] bg-transparent text-text"
                          >
                            -
                          </Button>
                          <Input value={count} className="border-[0] grow text-center" />
                          <Button
                            onClick={() => onChangeCount("increment")}
                            className="p-[10] pr-[40] bg-transparent text-text"
                          >
                            +
                          </Button>
                        </div>

                        {isAddedToCart ? (
                          <Link href="/profile/cart" className="w-full">
                            <Button variant="secondary" className="w-full">
                              Перейти в корзину
                            </Button>
                          </Link>
                        ) : (
                          <ButtonWithIcon
                            iconVariant="left"
                            classNames="w-full"
                            onClick={onAddToCart}
                            buttonVariant="default"
                            disabled={isCartLoading}
                            wrapperClassNames="w-full"
                            text={t("addToCartButton")}
                            iconSrc="/icons/shopping-bag.png"
                          />
                        )}

                        <ButtonWithIcon
                          iconVariant="left"
                          classNames="w-full"
                          onClick={buyIn1Click}
                          buttonVariant="secondary"
                          wrapperClassNames="w-full"
                          iconSrc="/icons/wallet.png"
                          text={t("buyIn1ClickButton")}
                        />
                      </>
                    ) : (
                      <div className="w-full max-w-[300] flex flex-col gap-[15]">
                        <Skeleton className="w-full min-w-full h-[42] rounded-full" />
                        <Skeleton className="w-full h-[42] rounded-full" />
                        <Skeleton className="w-full h-[42] rounded-full" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-[15] bg-secondary mt-auto px-[35] py-[30] rounded-t-[10]">
                  <Image src="/images/box.png" alt="box icon" width={47} height={47} className="w-[47] h-[47]" />
                  <p className="text-sm">{t("orderInfo")}</p>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* more info */}
        <div className="mb-[75]">
          {/* tabs */}
          <ProductTabs product={product?.getProductById as ProductModel} />
        </div>

        {/* popular */}
        <div>
          <div className="flex justify-between mb-[50]">
            <h2 className="text-2xl font-semibold">{t("popularTitle")}</h2>
            <div className="flex gap-[10]">
              <Button size="icon" variant="outline" className="border-destructive text-destructive">
                {"<"}
              </Button>

              <Button size="icon" variant="outline">
                {">"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-[18] grid-flow-col">
            {data
              ? data.getAllProducts.products
                  .slice(0, 5)
                  .map((product) => <CatalogCard product={product as ProductModel} viewType="cards" />)
              : [
                  ...Array(5)
                    .fill(null)
                    .map((_, index) => <CatalogCardSkeleton key={index} viewType="cards" />),
                ]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
