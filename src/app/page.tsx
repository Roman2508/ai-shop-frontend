"use client";

import "swiper/css";
import React from "react";
import "swiper/css/bundle";
import "swiper/css/autoplay";
import Link from "next/link";
import "swiper/css/scrollbar";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button } from "@/components/ui/common/Button";
import CatalogCard from "@/components/features/CatalogCard";
import ButtonWithIcon from "@/components/ui/custom/ButtonWithIcon";
import { ProductModel, useGetAllProductsQuery } from "@/graphql/generated/output";

const categories = ["Apple", "Samsung", "Xiaomi", "Google Pixel", "One Plus", "Motorola", "Nokia", "Sony"];

// tido:
// 6.  filters (url query params) ???
// 8.  search (AI)
// 9.  recommendation (FAIS vectors)

// 7.  homepage !!!ALMOST_DONE
// 10. administration (products CRUD) !!!ALMOST_DONE
// 12. Toast !!!ALMOST_DONE
// 15. Авторизація !!!ALMOST_DONE
// 5.  mobile adaptation !!!ALMOST_DONE

// 1.  Comments !!!DONE
// 2.  Payment !!!DONE
// 11. Купити в 1 клік (full product page) !!!DONE
// 13. Roles !!!DONE
// 15. Redirect !!!DONE
// 14. Активні сесії !!!DONE
// 3.  Orders (change status cron) !!!DONE
// 17. Reviews Page !!!DONE
// 4.  localization !!!DONE
// 19. Доробити сторінку http://localhost:3000/admin !!!DONE
// 18. Кнопка адміністрування не повинна бути видимою звичайним користувачам (сторінка профіль) !!!DONE

const calcSlidesPerView = (windowWidth: number) => {
  if (!windowWidth) return 5;
  if (windowWidth > 1200) return 5;
  else if (windowWidth > 1024) return 4;
  else if (windowWidth > 768) return 3;
  else if (windowWidth > 550) return 2;
  else return 1;
};

export default function Home() {
  const t = useTranslations("home");

  const { data } = useGetAllProductsQuery();

  const advantages = [
    { title: t("assortment.title"), text: t("assortment.text") },
    { title: t("delivery.title"), text: t("delivery.text") },
    { title: t("discounts.title"), text: t("discounts.text") },
  ];

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-[1640px] mx-auto px-[16px]">
        <div className="flex flex-col-reverse lg:flex-row gap-[30px] mb-[70px]">
          <div className="w-full lg:w-[320px] min-w-[320px] border rounded-[20px]">
            <div className="pt-[20px] px-[25px]">
              {categories.map((el) => (
                <Link key={el} href="#" className="flex items-center py-[10px] gap-[15px] border-b border-dotted">
                  <div className="flex items-center justify-center bg-secondary w-[30px] h-[30px]">
                    <Image src="/icons/phone.png" width={20} height={20} alt="phone icon" />
                  </div>

                  <p>{el}</p>
                </Link>
              ))}
            </div>

            <Link href="/catalog">
              <ButtonWithIcon
                text={t("categoryButton")}
                iconSrc="/icons/shopping-bag.png"
                classNames="w-full rounded-[20px]"
                wrapperClassNames="mt-[15px]"
              />
            </Link>
          </div>

          <div
            className="w-full min-h-[400px] lg:h-auto flex-1 rounded-[20px] relative overflow-hidden"
            style={{
              background: "radial-gradient(circle, rgba(215, 228, 215, 0.8) 30%, rgba(180, 200, 180, 1) 100%)",
            }}
          >
            <div
              className="absolute top-[0] left-[0] w-full h-full w-[910px] h-[500px] "
              style={{
                backgroundImage: "url(/images/homapage-image.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>

          <div className="hidden xl:flex flex-col gap-[20px] w-[320px] min-w-[320px]">
            <div className="h-[150] w-full bg-border rounded-[20] p-[20] flex flex-col justify-between">
              <Image src="/images/homepage-filter.svg" width={60} height={60} alt="" />
              <b>{t("advantages.choice")}</b>
            </div>
            <div className="h-[150] w-full bg-border rounded-[20] p-[20] flex flex-col justify-between">
              <Image src="/images/homepage-accessories.svg" width={60} height={60} alt="" />
              <b>{t("advantages.equipment")}</b>
            </div>
            <div className="h-[150] w-full bg-border rounded-[20] p-[20] flex flex-col justify-between">
              <Image src="/images/homepage-services.svg" width={60} height={60} alt="" />
              <b>{t("advantages.service")}</b>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-[50px] lg:gap-[30px] mb-[140px]">
          {advantages.map((el, index) => (
            <div key={el.title} className="flex-[1]">
              <div className="flex items-center gap-[15] mb-[15]">
                <div className="flex items-center justify-center bg-secondary rounded-full w-[55] h-[55]">
                  <Image src={`/images/homapage-advantage-${index + 1}.svg`} width={30} height={30} alt="icon" />
                </div>
                <h4 className="font-semibold text-xl">{el.title}</h4>
              </div>
              <p>{el.text}</p>
            </div>
          ))}
        </div>

        <div className="mb-[120px]">
          <h3 className="font-semibold text-3xl mb-[40]">{t("popular")}</h3>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={calcSlidesPerView(window.innerWidth)}
            autoplay={{ delay: 2000 }}
            loop={true}
          >
            {data && data.getAllProducts.products.length
              ? data.getAllProducts.products.slice(1, 16).map((el) => (
                  <SwiperSlide>
                    <CatalogCard key={el.id} viewType="cards" product={el as ProductModel} />
                  </SwiperSlide>
                ))
              : [...Array(15)].map((el, index) => (
                  <SwiperSlide>
                    <div></div>
                  </SwiperSlide>
                ))}
          </Swiper>

          <div className="flex justify-center mt-[20]">
            <Link href="/catalog">
              <Button variant="link" className="px-[20]">
                {t("showMore")}
              </Button>
            </Link>
          </div>
        </div>

        <div className="mb-[120px]">
          <h3 className="font-semibold text-3xl mb-[40]">{t("news")}</h3>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={calcSlidesPerView(window.innerWidth)}
            autoplay={{ delay: 2000 }}
            loop={true}
          >
            {data && data.getAllProducts.products.length
              ? data.getAllProducts.products.slice(1, 16).map((el) => (
                  <SwiperSlide>
                    <CatalogCard key={el.id} viewType="cards" product={el as ProductModel} />
                  </SwiperSlide>
                ))
              : [...Array(15)].map((el, index) => (
                  <SwiperSlide>
                    <div></div>
                  </SwiperSlide>
                ))}
          </Swiper>

          <div className="flex justify-center mt-[20]">
            <Link href="/catalog">
              <Button variant="link" className="px-[20]">
                {t("showMore")}
              </Button>
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-3xl mb-[40]">{t("partners")}</h3>

          <div className="grid grid-cols-2 2xs:grid-cols-4 lg:grid-cols-6 gap-[20]">
            {Array(12)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="h-[150] w-full bg-border rounded-[20] p-[20] flex justify-center items-center"
                >
                  <img src={`images/partners/${index + 1}.png`} className="max-h-[70%]" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
