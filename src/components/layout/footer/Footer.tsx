import { Button } from "@/components/ui/common/Button";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col justify-between pt-[65] pb-[20] px-[26] bg-dark text-white">
      <div className="flex justify-between items-end grow mb-[50]">
        <div className="">
          <div className="grow flex gap-[10] items-center mb-[50]">
            <img src="logo.png" width="30px" height="30px" />
            <b className="text-[16px]">AI-PhoneShop</b>
          </div>

          <div className="flex gap-[15]">
            <Button>ЗАМОВИТИ ДЗВІНОК</Button>
            <Button size="icon" variant="icon" className="w-[44] h-[44]">
              TG
            </Button>
            <Button size="icon" variant="icon" className="w-[44] h-[44]">
              VB
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-[26]">
          <b className="">Компанія</b>

          <div className="flex gap-[60]">
            <ul className="flex flex-col gap-[12]">
              <li>Про компанію</li>
              <li>Новини</li>
              <li>Відгуки</li>
            </ul>
            <ul className="flex flex-col gap-[12]">
              <li>Вакансії</li>
              <li>Сертифікати</li>
              <li>Контакти</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-[26]">
          <b className="block">Контакти</b>

          <div className="flex flex-col gap-[16]">
            <div className="flex items-center gap-[12]">
              <Button size="icon" variant="icon" className="w-[44] h-[44]">
                Phone
              </Button>
              <p>+380 98-888-88-88</p>
            </div>

            <div className="flex items-center gap-[12]">
              <Button size="icon" variant="icon" className="w-[44] h-[44]">
                Mail
              </Button>
              <p>help@example.com</p>
            </div>
          </div>
        </div>
        {/*  */}
      </div>

      <div className="border-t-2 border-muted-foreground grow flex justify-between pt-[25]">
        <div className="flex gap-[20]">
          <p>© 2025 «AI Phone Shop»</p>
          <p className="cursor-pointer hover:border-b-2">
            Політика конфіденційності
          </p>
          <p className="cursor-pointer hover:border-b-2">Правова інформація</p>
        </div>

        <div className="flex gap-[10]">
          <p>Приймаэмо до оплати:</p>
          <p style={{ background: "#d1d1d1", width: "40px" }}>1</p>
          <p style={{ background: "#d1d1d1", width: "40px" }}>2</p>
          <p style={{ background: "#d1d1d1", width: "40px" }}>3</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
