"use client";
import React from "react";
import Link from "next/link";
import CountUp from "react-countup";
import { GrCurrency } from "react-icons/gr";
import { useTranslations } from "next-intl";
import { FaRegStar as RatingIcon } from "react-icons/fa";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { TbBrandComedyCentral as BrandIcon } from "react-icons/tb";
import { MdProductionQuantityLimits as ProductIcon } from "react-icons/md";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/common/Breadcrumb";
import {
  useGetAllOrdersQuery,
  useGetAverageRatingQuery,
  useGetAllProductsCountQuery,
} from "@/graphql/generated/output";
import getPhotoUrl from "@/utils/get-photo-url";
import { Card } from "@/components/ui/common/Card";
import { Button } from "@/components/ui/common/Button";
import { getLastTwoWeeks } from "@/utils/get-last-two-weeks";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../../components/ui/common/Chart";
import { isDateMatch } from "@/utils/is-date-match";

const chartConfig = {
  desktop: {
    label: "Продажі",
    color: "hsl(130, 43%, 51%)",
  },
  mobile: {
    label: "Продажі",
    color: "hsl(130, 43%, 51%)",
  },
} satisfies ChartConfig;

const AdminPage = () => {
  const t = useTranslations("admin.main");

  const [total, setTotal] = React.useState(0);
  const [chartData, setChartData] = React.useState<{ date: string; desktop: number }[]>([]);

  const { data: orders } = useGetAllOrdersQuery();
  const { data: rating } = useGetAverageRatingQuery();
  const { data: count } = useGetAllProductsCountQuery();

  React.useEffect(() => {
    if (!orders) return;
    const total = orders.getAllOrders.reduce((acc, cur) => acc + cur.total, 0);
    setTotal(total);

    const chartData = getLastTwoWeeks().map((el) => {
      const days = orders.getAllOrders.filter((order) => !!isDateMatch(order.createdAt, el));
      let total = 0;
      if (days) {
        total = days.reduce((acc, cur) => acc + cur.total, 0);
      }
      return { date: el, desktop: total, mobile: total };
    });

    setChartData(chartData);
  }, [orders]);

  const statsData = [
    { label: t("income"), value: <CountUp end={total} duration={1} suffix=" ₴" />, icon: <GrCurrency size={24} /> },
    {
      label: t("products"),
      value: <CountUp end={count ? count.getAllProductsCount : 0} duration={1} />,
      icon: <ProductIcon size={24} />,
    },
    { label: t("brands"), value: <CountUp end={56} duration={1} />, icon: <BrandIcon size={26} /> },
    {
      label: t("rating"),
      value: <CountUp end={rating ? rating.getAverageRating : 0} duration={1} />,
      icon: <RatingIcon size={24} />,
    },
  ];

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
            <BreadcrumbPage>{t("breadcrumbs.admin")}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-[46]">
        <div className="flex justify-center gap-[20] sm:justify-between items-center flex-col sm:flex-row">
          <h1 className="font-bold text-lg">{t("title")}</h1>

          <div className="flex gap-[10]">
            <Link href="/admin/products">
              <Button variant="outline" className="h-[36] w-[160]">
                {t("editProductsButton")}
              </Button>
            </Link>

            <Link href="/admin/users">
              <Button variant="outline" className="h-[36] w-[160]">
                {t("editUsersButton")}
              </Button>
            </Link>
          </div>
        </div>

        <div>
          <div className="flex justify-between flex-wrap gap-[20]">
            {statsData.map((el) => (
              <Card key={el.label} className="p-[20] xl:flex-1 h-[108] min-w-full sm:min-w-[calc(50%-10px)] xl:w-auto">
                <div className="flex items-center justify-between mb-[10]">
                  <p>{el.label}</p>
                  {el.icon}
                </div>
                <b className="text-2xl">{el.value}</b>
              </Card>
            ))}
          </div>

          <div className="flex justify-between flex-col xl:flex-row gap-[20] mt-[20]">
            <Card className="p-[20] w-full xl:w-[calc(60%-10px)]">
              <b className="text-lg block pb-[10] mb-[10] border-b"> {t("income_stat")}</b>

              <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                <AreaChart data={chartData}>
                  <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
                  </linearGradient>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString("uk-UA", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        labelFormatter={(value) => {
                          return new Date(value).toLocaleDateString("uk-UA", {
                            month: "short",
                            day: "numeric",
                          });
                        }}
                        indicator="dot"
                      />
                    }
                  />
                  <Area
                    dataKey="mobile"
                    type="linear"
                    fill="var(--color-desktop)"
                    stroke="var(--color-desktop)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
            </Card>

            <Card className="p-[20] w-full xl:w-[calc(40%-10px)]">
              <b className="text-lg block mb-[10]"> {t("buyers")}</b>
              <div>
                {orders?.getAllOrders.slice(0, 5).map((el) => (
                  <div key={el.id} className="border-t flex items-center justify-between">
                    <div className="flex items-center gap-[10] py-[10] flex-1">
                      <img
                        className="w-[50] h-[50] rounded-full border"
                        src={el.user.avatar ? getPhotoUrl(el.user.avatar, "users") : "/images/empty-image.webp"}
                        alt="user avatar"
                      />
                      <div>
                        <b className="text-sm">{el.user.displayName}</b>
                        <p className="text-sm">{el.user.email}</p>
                      </div>
                    </div>

                    <b>{el.total.toLocaleString("uk-Uk")} ₴</b>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
