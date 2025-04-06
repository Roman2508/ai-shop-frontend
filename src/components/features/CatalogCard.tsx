import React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { Card } from "../ui/common/Card";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { Input } from "../ui/common/Input";
import { Button } from "../ui/common/Button";
import getPhotoUrl from "@/utils/get-photo-url";
import { useCurrent } from "@/hooks/useCurrent";
import { useWishlist } from "@/hooks/useWishlist";
import WishlistIcon from "../images/WishlistIcon";
import { ProductModel, useToggleCartMutation, useToggleFavoriteMutation } from "@/graphql/generated/output";

type CatalogCardPropsType = {
  product: ProductModel;
  viewType: "cards" | "rows";
};

const CatalogCard: React.FC<CatalogCardPropsType> = ({ product, viewType }) => {
  const t = useTranslations("components.catalogCart");

  const { refetch } = useCurrent();

  const [addToFavorite, { loading: isFavoriteLoading }] = useToggleFavoriteMutation({
    onCompleted() {
      refetch();
      toast.success("Оновлено список збережених товарів");
    },
    onError(error, clientOptions) {
      toast.error("Помилка при оновленні списку збережених товарів");
      console.log(error, clientOptions);
    },
  });
  const [addToCart, { loading: isCartLoading }] = useToggleCartMutation({
    onCompleted() {
      refetch();
      toast.success("Товар було додано до вашої корзини");
    },
    onError(error, clientOptions) {
      toast.error("Помилка при видаленні товару з корзини");
      console.log(error, clientOptions);
    },
  });

  const { addItemToCart } = useCart();
  const { addItemToWishlist } = useWishlist();

  const [count, setCount] = React.useState(1);
  const [isFavourite, setIsFavourite] = React.useState(false);
  const [isAddedToCart, setIsAddedToCart] = React.useState(false);

  const { isAuthentificated } = useAuth();
  const { user } = useCurrent();

  const onAddToFavourite = (productId: string) => {
    if (isAuthentificated) {
      addToFavorite({ variables: { productId } });
      setIsFavourite((prev) => !prev);
      addItemToWishlist({ product });
    } else {
      alert("Авторизуйтесь щоб зберегти товар");
    }
  };

  const onAddToCart = (productId: string) => {
    if (isAuthentificated) {
      addToCart({ variables: { input: { productId, count } } });
      setIsAddedToCart((prev) => !prev);
      addItemToCart({ count, id: String(Math.random()), product });
    } else {
      alert("Авторизуйтесь щоб додати товар в корзину");
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
    if (!product || !isAuthentificated || !user) return;
    const checkFavourite = user.favorites.some((el) => el.product.id === product.id);
    setIsFavourite(!!checkFavourite);

    const checkCart = user.cart.some((el) => el.product.id === product.id);
    setIsAddedToCart(!!checkCart);
  }, [product, isAuthentificated, user]);

  return (
    <Card
      className={
        viewType === "cards"
          ? "pb-[30px] pt-[20px] px-[20px]"
          : "flex py-[24px] pl-[16px] pr-[30px] gap-[20px] flex-col items-center sm:flex-row"
      }
    >
      <div className={viewType === "cards" ? "flex justify-end gap-[10px]" : "hidden"}>
        <Button
          size="icon"
          variant="icon"
          disabled={isFavoriteLoading}
          onClick={() => onAddToFavourite(product.id)}
          className="text-muted-foreground hover:border-muted-foreground"
        >
          <WishlistIcon className="fill-muted-foreground" isActive={isFavourite} />
        </Button>
      </div>

      <div className="my-[10px]">
        <Link href={`/catalog/${product.id}`}>
          <img
            className={viewType === "cards" ? "h-[260px] w-full object-cover" : "h-[200px] object-cover"}
            src={product.images.length ? getPhotoUrl(product.images[0], "products") : "/images/empty-image.webp"}
          />
        </Link>
      </div>

      <div
        className={
          viewType === "cards"
            ? ""
            : "flex justify-between items-center sm:items-start w-full h-full gap-[20px] flex-col 2xl:flex-row"
        }
      >
        <div className={viewType === "cards" ? "" : "w-full"}>
          <div className={viewType === "cards" ? "hidden" : "flex justify-end gap-[10px]"}>
            <Button
              size="icon"
              variant="icon"
              disabled={isFavoriteLoading}
              onClick={() => onAddToFavourite(product.id)}
              className="text-muted-foreground hover:border-muted-foreground"
            >
              <WishlistIcon />
            </Button>
          </div>

          <h3 className="mb-[16px] text-primary font-semibold truncate">
            <Link href={`/catalog/${product.id}`}>
              {`${product.brand}, ${product.ram}/${product.builtInMemory} ${t("gb")}, ${product.color}`}
            </Link>
          </h3>
          <p className="mb-[16px] h-[80px] text-sm line-clamp-4">{product.title}</p>
        </div>

        <div
          className={
            viewType === "cards"
              ? ""
              : "flex flex-col justify-center h-full 2xl:border-l rounded-r-[5px] 2xl:pl-[20px] w-[230px] 2xl:w-auto"
          }
        >
          <b className="block mb-[16px]">
            {product.price.toLocaleString("uk-UA")} {t("currency")}
          </b>

          {isAddedToCart ? (
            <Link href="/profile/cart">
              <Button variant="secondary" className={"w-full rounded-[4px]"}>
                {t("goToCartButton")}
              </Button>
            </Link>
          ) : (
            <div className={viewType === "cards" ? "flex mt-auto" : "flex flex-col w-[230px]"}>
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
                      ? "p-[10px] pl-[15px] bg-transparent text-text"
                      : "p-[10px] pl-[40px] bg-transparent text-text"
                  }
                  onClick={() => onChangeCount("decrement")}
                >
                  {"-"}
                </Button>
                <Input value={count} className="border-[0] grow text-center" />
                <Button
                  className={
                    viewType === "cards"
                      ? "p-[10px] pr-[15px] bg-transparent text-text"
                      : "p-[10px] pr-[40px] bg-transparent text-text"
                  }
                  onClick={() => onChangeCount("increment")}
                >
                  +
                </Button>
              </div>
              <Button
                disabled={isCartLoading}
                onClick={() => onAddToCart(product.id)}
                className={
                  viewType === "cards" ? "rounded-r-[5px] rounded-l-[0] w-[50%]" : "rounded-b-[5px] rounded-t-[0] w-[100%]"
                }
              >
                {t("addToCartButton")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CatalogCard;
