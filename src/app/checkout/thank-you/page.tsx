import React from "react";

import { Button } from "@/components/ui/common/Button";
import Link from "next/link";

const ThankYouPage = () => {
  return (
    <div className="flex flex-col justify-center items-center px-[20]">
      <img src="/images/checkout-thank-you.svg" alt="thank you" />
      <h1 className="font-bold text-2xl mb-[10] text-center">Дякуємо за замовлення!</h1>
      <p className="mb-[40] text-center">Наш менеджер у найближчий час зв'яжеться з вами!</p>
      <Link href="/">
        <Button>Повернутись на головну</Button>
      </Link>
    </div>
  );
};

export default ThankYouPage;
