import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/common/Button";

const Footer = () => {
  const t = useTranslations("footer");

  return (
    <footer className="flex flex-col justify-between pt-[65px] pb-[20px] px-[26px] bg-dark text-white">
      <div className="flex justify-between items-end flex-wrap grow mb-[50px]">
        <div className="w-full xl:w-auto mb-[60px] xl:mb-[0]">
          <div className="grow flex gap-[10px] items-center mb-[50px]">
            <img src="/logo.png" width="30px" height="30px" />
            <b className="text-[16px]">PhoneShop</b>
          </div>

          <div className="flex gap-[15px]">
            <Button>{t("callButton")}</Button>
            <Button size="icon" variant="icon" className="w-[44px] h-[44px]">
              <Image width={20} height={20} src="/icons/telegram.png" alt="telegram icon" />
            </Button>
            <Button size="icon" variant="icon" className="w-[44px] h-[44px]">
              <Image width={20} height={20} src="/icons/viber.png" alt="viber icon" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-[26px] w-full sm:w-auto mb-[60px] sm:mb-[0]">
          <b className="">{t("subtitle1")}</b>

          <div className="flex gap-[60px]">
            <ul className="flex flex-col gap-[12px]">
              <li>{t("about")}</li>
              <li>{t("news")}</li>
              <li>{t("reviews")}</li>
            </ul>
            <ul className="flex flex-col gap-[12px]">
              <li>{t("vacancies")}</li>
              <li>{t("certificates")}</li>
              <li>{t("contacts")}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-[26px]">
          <b className="block">{t("subtitle2")}</b>

          <div className="flex flex-col gap-[16px]">
            <div className="flex items-center gap-[12px]">
              <Button size="icon" variant="icon" className="w-[44px] h-[44px]">
                <Image width={20} height={20} src="/icons/footer-phone.png" alt="phone icon" />
              </Button>
              <p>+380 98-888-88-88</p>
            </div>

            <div className="flex items-center gap-[12px]">
              <Button size="icon" variant="icon" className="w-[44px] h-[44px]">
                <Image width={20} height={20} src="/icons/mail.png" alt="mail icon" />
              </Button>
              <p>help@example.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t-[1px] border-muted-foreground grow flex justify-between items-center pt-[25px] flex-col xl:flex-row gap-[20px] xl:gap-[0]">
        <div className="flex gap-[20px] flex-col-reverse items-center md:flex-row">
          <p>© 2025 «AI Phone Shop»</p>
          <p className="cursor-pointer">{t("privacyPolicy")}</p>
          <p className="cursor-pointer">{t("legalInformation")}</p>
        </div>

        <div className="flex items-center gap-[10px]">
          <p>{t("acceptPayment")}</p>
          <p
            className="flex items-center rounded-[5px] p-[12px] w-[50px] h-[30px]"
            style={{ background: "rgba(255, 255, 255, .1)" }}
          >
            <Image width={38} height={15} src="/icons/visa.png" alt="visa icon" />
          </p>
          <p
            className="flex items-center rounded-[5px] p-[12px] w-[50px] h-[30px]"
            style={{ background: "rgba(255, 255, 255, .1)" }}
          >
            <Image width={30} height={15} src="/icons/mastercard.png" alt="mastercard icon" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
