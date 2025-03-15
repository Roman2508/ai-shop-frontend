"use client";

import React from "react";

import { Button } from "@/components/ui/common/Button";
import ButtonWithIcon from "@/components/ui/custom/ButtonWithIcon";
import ProfileLayout from "@/components/layout/profile/ProfileLayout";
import CartItem from "@/components/features/CartItem";

const ordersList = [
  {
    items: [
      {
        name: "DS-2CD2423G2-I(2.8мм)",
        description: "Профессиональная видеокамера IP компактная DS-2CD2423G2-I(2.8мм)",
        price: "10 990,00",
        photo: "https://www.shutterstock.com/image-vector/no-image-available-icon-template-600nw-1036735678.jpg",
        count: "1",
      },
      {
        name: "DS-2CD2423G2-I(2.8мм)",
        description: "Профессиональная видеокамера IP компактная DS-2CD2423G2-I(2.8мм)",
        price: "10 990,00",
        photo: "https://www.shutterstock.com/image-vector/no-image-available-icon-template-600nw-1036735678.jpg",
        count: "2",
      },
      {
        name: "DS-2CD2423G2-I(2.8мм)",
        description: "Профессиональная видеокамера IP компактная DS-2CD2423G2-I(2.8мм)",
        price: "10 990,00",
        photo: "https://www.shutterstock.com/image-vector/no-image-available-icon-template-600nw-1036735678.jpg",
        count: "5",
      },
    ],
    orderNumber: 123456,
    date: "04.02.2025",
    status: "Доставляється",
    price: "22 068",
    orderProfile: "Профіль №1",
  },
  {
    items: [
      {
        name: "DS-2CD2423G2-I(2.8мм)",
        description: "Профессиональная видеокамера IP компактная DS-2CD2423G2-I(2.8мм)",
        price: "10 990,00",
        photo: "https://www.shutterstock.com/image-vector/no-image-available-icon-template-600nw-1036735678.jpg",
        count: "1",
      },
      {
        name: "DS-2CD2423G2-I(2.8мм)",
        description: "Профессиональная видеокамера IP компактная DS-2CD2423G2-I(2.8мм)",
        price: "10 990,00",
        photo: "https://www.shutterstock.com/image-vector/no-image-available-icon-template-600nw-1036735678.jpg",
        count: "3",
      },
    ],
    orderNumber: 234321,
    date: "01.02.2025",
    status: "Доставляється",
    price: "10 068",
    orderProfile: "Профіль №2",
  },
  {
    items: [
      {
        name: "DS-2CD2423G2-I(2.8мм)",
        description: "Профессиональная видеокамера IP компактная DS-2CD2423G2-I(2.8мм)",
        price: "10 990,00",
        photo: "https://www.shutterstock.com/image-vector/no-image-available-icon-template-600nw-1036735678.jpg",
        count: "2",
      },
    ],
    orderNumber: 325684,
    date: "20.01.2025",
    status: "Доставляється",
    price: "50 068",
    orderProfile: "Профіль №1",
  },
];

const OrdersPage = () => {
  const [expandedOrders, setExpandedOrders] = React.useState<number[]>([]);

  const handleChangeExpandedOrders = (number: number) => {
    setExpandedOrders((prev) => {
      let orders = [...prev];

      if (prev.some((el) => el === number)) {
        orders = orders.filter((el) => el !== number);
      } else {
        orders.push(number);
      }

      return orders;
    });
  };

  return (
    <ProfileLayout>
      <div className="flex justify-between items-center pb-[40]">
        <h1 className="text-3xl font-semibold">Мої замовлення</h1>

        <div className="flex gap-[10]">
          <ButtonWithIcon iconSrc="/icons/list.png" text="МОЇ ЗАМОВЛЕННЯ" buttonVariant="secondary" classNames="" />
          <Button size="icon" className="h-[44] w-[44]">
            0
          </Button>
        </div>
      </div>

      <div className="px-[50] py-[40] rounded-[5] border border-border">
        <div className="bg-background rounded-[5] pb-[40] mb-[60] overflow-hidden border border-border">
          <h3 className="bg-primary text-popover px-[40] py-[20] text-xl font-semibold">Замовлення в обробці</h3>

          <div className="grid grid-cols-5 my-[25] px-[40] font-semibold">
            <div>Номер заявки</div>
            <div>Дата</div>
            <div>Статус</div>
            <div>Сумма</div>
            <div>Профиль для оплаты</div>
          </div>

          <div className="flex flex-col gap-[40] px-[40]">
            {ordersList.map((el) => {
              const isItemExpanded = expandedOrders.some((s) => s === el.orderNumber);

              return (
                <div className="border border-border px-[40] py-[30] rounded-[5]">
                  <div className="grid grid-cols-5">
                    <div>{el.orderNumber}</div>
                    <div>{el.date}</div>
                    <div>{el.status}</div>
                    <div>{el.price}</div>
                    <div>{el.orderProfile}</div>
                  </div>

                  {!isItemExpanded && <div className="border-b border-dashed pt-[20]"></div>}

                  <div
                    className={
                      isItemExpanded
                        ? "transition-all grid grid-rows-[1fr] overflow-hidden duration-[1s]"
                        : "transition-all grid grid-rows-[0fr] overflow-hidden duration-[1s]"
                    }
                  >
                    <div className={"overflow-hidden"}>
                      <h6 className="font-semibold text-2xl border-b border-dashed pb-[24] mt-[50]">
                        Позиції ({el.items.length})
                      </h6>
                      {el.items.map((item, index) => (
                        <CartItem {...item} number={index + 1} />
                      ))}
                    </div>
                  </div>

                  <Button
                    variant={isItemExpanded ? "default" : "secondary"}
                    className="mt-[20] rounded-[5]"
                    onClick={() => handleChangeExpandedOrders(el.orderNumber)}
                  >
                    {isItemExpanded ? "Приховати деталі" : "Показати деталі"}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-background rounded-[5] pb-[40] mb-[60] overflow-hidden border border-border">
          <h3 className="bg-border px-[40] py-[20] text-xl font-semibold">Виконані замовлення</h3>

          <div className="grid grid-cols-5 my-[25] px-[40] font-semibold">
            <div>Номер заявки</div>
            <div>Дата</div>
            <div>Статус</div>
            <div>Сумма</div>
            <div>Профиль для оплаты</div>
          </div>

          <div className="flex flex-col gap-[40] px-[40]">
            {ordersList.map((el) => {
              const isItemExpanded = expandedOrders.some((s) => s === el.orderNumber);

              return (
                <div className="border border-border px-[40] py-[30] rounded-[5]">
                  <div className="grid grid-cols-5">
                    <div>{el.orderNumber}</div>
                    <div>{el.date}</div>
                    <div>{el.status}</div>
                    <div>{el.price}</div>
                    <div>{el.orderProfile}</div>
                  </div>

                  {!isItemExpanded && <div className="border-b border-dashed pt-[20]"></div>}

                  <div
                    className={
                      isItemExpanded
                        ? "transition-all grid grid-rows-[1fr] overflow-hidden duration-[1s]"
                        : "transition-all grid grid-rows-[0fr] overflow-hidden duration-[1s]"
                    }
                  >
                    <div className={"overflow-hidden"}>
                      <h6 className="font-semibold text-2xl border-b border-dashed pb-[24] mt-[50]">
                        Позиції ({el.items.length})
                      </h6>
                      {el.items.map((item, index) => (
                        <div className="flex items-center gap-[30] py-[20] border-b border-dashed">
                          <p>{index + 1}</p>
                          <div className="border border-border w-[110] h-[110] p-[10]">
                            <img src={item.photo} />
                          </div>
                          <div className="grow">
                            <p className="text-primary font-semibold">{item.name}</p>
                            <p className="">{item.description}</p>
                            <b className="text-xl">{item.price}</b>
                          </div>

                          <p>К-сть: {item.count}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant={isItemExpanded ? "default" : "secondary"}
                    className="mt-[20] rounded-[5]"
                    onClick={() => handleChangeExpandedOrders(el.orderNumber)}
                  >
                    {isItemExpanded ? "Приховати деталі" : "Показати деталі"}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default OrdersPage;
