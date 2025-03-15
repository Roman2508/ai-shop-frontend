"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/common/Breadcrumb";
import { Card } from "@/components/ui/common/Card";
import { Heart, ListOrdered, MessageCircle, ShoppingCart, User } from "lucide-react";

const linksList = [
  {
    label: "Профіль",
    icon: <User className="p-[2]" />,
    iconActive: <User className="p-[2] text-primary" />,
    link: "/profile/personal-information",
  },
  {
    label: "Замовлення",
    icon: <ListOrdered className="p-[2]" />,
    iconActive: <ListOrdered className="p-[2] text-primary" />,
    link: "/profile/orders",
  },
  {
    label: "Кошик",
    icon: <ShoppingCart className="p-[2]" />,
    iconActive: <ShoppingCart className="p-[2] text-primary" />,
    link: "/profile/cart",
  },
  {
    label: "Список бажань",
    icon: <Heart className="p-[2]" />,
    iconActive: <Heart className="p-[2] text-primary" />,
    link: "/profile/wishlist",
  },
  {
    label: "Відгуки",
    icon: <MessageCircle className="p-[2]" />,
    iconActive: <MessageCircle className="p-[2] text-primary" />,
    link: "/profile/reviws",
  },
];

const ProfileLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();

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
