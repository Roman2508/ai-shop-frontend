"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Heart, ListOrdered, MessageCircle, ShoppingCart, User } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/common/Breadcrumb";
import { Card } from "@/components/ui/common/Card";

const ProfileLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const pathname = usePathname();

  const t = useTranslations("profile");

  const linksList = [
    {
      label: t("links.profile"),
      icon: <User className="p-[2]" />,
      iconActive: <User className="p-[2] text-primary" />,
      link: "/profile/personal-information",
    },
    {
      label: t("links.orders"),
      icon: <ListOrdered className="p-[2]" />,
      iconActive: <ListOrdered className="p-[2] text-primary" />,
      link: "/profile/orders",
    },
    {
      label: t("links.cart"),
      icon: <ShoppingCart className="p-[2]" />,
      iconActive: <ShoppingCart className="p-[2] text-primary" />,
      link: "/profile/cart",
    },
    {
      label: t("links.wishlist"),
      icon: <Heart className="p-[2]" />,
      iconActive: <Heart className="p-[2] text-primary" />,
      link: "/profile/wishlist",
    },
    {
      label: t("links.reviws"),
      icon: <MessageCircle className="p-[2]" />,
      iconActive: <MessageCircle className="p-[2] text-primary" />,
      link: "/profile/reviws",
    },
  ];

  return (
    <div className="max-w-[1640] mx-auto px-[16]">
      <Breadcrumb className="mb-[45]">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/">{t("personalInformation.breadcrumbs.home")}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>{t("personalInformation.breadcrumbs.profile")}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-baseline gap-[46]">
        <Card className="w-[300] py-[20] px-[25] sticky top-[100]">
          {linksList.map((el) => (
            <Link
              key={el.link}
              href={el.link}
              className="flex items-center gap-[15] pb-[10] mb-[10] border-b border-dashed"
            >
              {pathname === el.link ? el.iconActive : el.icon}
              <p className={pathname === el.link ? "text-primary font-semibold" : ""}>{el.label}</p>
            </Link>
          ))}
        </Card>

        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default ProfileLayout;
