import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/common/Button";

const Footer = () => {
  const t = useTranslations("footer");

  return (
    <footer className="flex flex-col justify-between pt-[65] pb-[20] px-[26] bg-dark text-white">
      <div className="flex justify-between items-end flex-wrap grow mb-[50]">
        <div className="w-full xl:w-auto mb-[60] xl:mb-[0]">
          <div className="grow flex gap-[10] items-center mb-[50]">
            <img src="/logo.png" width="30px" height="30px" />
            <b className="text-[16px]">PhoneShop</b>
          </div>

          <div className="flex gap-[15]">
            <Button>{t("callButton")}</Button>
            <Button size="icon" variant="icon" className="w-[44] h-[44]">
              <Image width={20} height={20} src="/icons/telegram.png" alt="telegram icon" />
            </Button>
            <Button size="icon" variant="icon" className="w-[44] h-[44]">
              <Image width={20} height={20} src="/icons/viber.png" alt="viber icon" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-[26] w-full sm:w-auto mb-[60] sm:mb-[0]">
          <b className="">{t("subtitle1")}</b>

          <div className="flex gap-[60]">
            <ul className="flex flex-col gap-[12]">
              <li>{t("about")}</li>
              <li>{t("news")}</li>
              <li>{t("reviews")}</li>
            </ul>
            <ul className="flex flex-col gap-[12]">
              <li>{t("vacancies")}</li>
              <li>{t("certificates")}</li>
              <li>{t("contacts")}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-[26]">
          <b className="block">{t("subtitle2")}</b>

          <div className="flex flex-col gap-[16]">
            <div className="flex items-center gap-[12]">
              <Button size="icon" variant="icon" className="w-[44] h-[44]">
                <Image width={20} height={20} src="/icons/footer-phone.png" alt="phone icon" />
              </Button>
              <p>+380 98-888-88-88</p>
            </div>

            <div className="flex items-center gap-[12]">
              <Button size="icon" variant="icon" className="w-[44] h-[44]">
                <Image width={20} height={20} src="/icons/mail.png" alt="mail icon" />
              </Button>
              <p>help@example.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t-[1px] border-muted-foreground grow flex justify-between items-center pt-[25] flex-col xl:flex-row gap-[20] xl:gap-[0]">
        <div className="flex gap-[20] flex-col-reverse items-center md:flex-row">
          <p>© 2025 «AI Phone Shop»</p>
          <p className="cursor-pointer">{t("privacyPolicy")}</p>
          <p className="cursor-pointer">{t("legalInformation")}</p>
        </div>

        <div className="flex items-center gap-[10]">
          <p>{t("acceptPayment")}</p>
          <p
            className="flex items-center rounded-[5] p-[12] w-[50] h-[30]"
            style={{ background: "rgba(255, 255, 255, .1)" }}
          >
            <Image width={38} height={15} src="/icons/visa.png" alt="visa icon" />
          </p>
          <p
            className="flex items-center rounded-[5] p-[12] w-[50] h-[30]"
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
