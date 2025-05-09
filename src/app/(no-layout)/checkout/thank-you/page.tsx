"use client";

import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/common/Button";

const ThankYouPage = () => {
  return (
    <div className="flex flex-col justify-center items-center px-[20px]">
      <img src="/images/checkout-thank-you.svg" alt="thank you" />
      <h1 className="font-bold text-2xl mb-[10px] text-center">Дякуємо за замовлення! 🎉</h1>
      <p className="mb-[40px] text-center">
        Оплату прийнято. Очікуйте повідомлення про доставку від поштового сервісу!
      </p>
      <Link href="/">
        <Button>Повернутись на головну</Button>
      </Link>
    </div>
  );
};

export default ThankYouPage;
