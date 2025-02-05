import { Button } from '@/components/ui/common/Button'
import Image from 'next/image'
import React from 'react'

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
              <Image width={20} height={20} src="/icons/telegram.png" alt="telegram icon" />
            </Button>
            <Button size="icon" variant="icon" className="w-[44] h-[44]">
              <Image width={20} height={20} src="/icons/viber.png" alt="viber icon" />
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
        {/*  */}
      </div>

      <div className="border-t-[1px] border-muted-foreground grow flex justify-between pt-[25]">
        <div className="flex gap-[20]">
          <p>© 2025 «AI Phone Shop»</p>
          <p className="cursor-pointer">Політика конфіденційності</p>
          <p className="cursor-pointer">Правова інформація</p>
        </div>

        <div className="flex items-center gap-[10]">
          <p>Приймаємо до оплати:</p>
          <p className="flex items-center rounded-[5] p-[10]" style={{ background: 'rgba(255, 255, 255, .1)' }}>
            <Image width={38} height={15} src="/icons/visa.png" alt="visa icon" />
          </p>
          <p className="flex items-center rounded-[5] p-[10]" style={{ background: 'rgba(255, 255, 255, .1)' }}>
            <Image width={30} height={15} src="/icons/mastercard.png" alt="mastercard icon" />
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
