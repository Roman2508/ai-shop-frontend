import { Button } from '@/components/ui/common/Button'
import { Card } from '@/components/ui/common/Card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/common/Dialog'
import { Input } from '@/components/ui/common/Input'
import { Textarea } from '@/components/ui/common/Textarea'
import ButtonWithIcon from '@/components/ui/custom/ButtonWithIcon'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import ProductPage from './catalog/[id]/page'
import CatalogCard from '@/components/features/CatalogCard'

const aaa = ['Apple', 'Samsung', 'Xiaomi', 'Google Pixel', 'One Plus', 'Motorola', 'Nokia', 'Кнопкові телефони']

export default function Home() {
  const translations = useTranslations('home')

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-[1640] mx-auto px-[16]">
        <h1>{translations('title')}</h1>

        <div className="flex gap-[30] mb-[70]">
          <div className="w-[320] min-w-[320] border rounded-[20]">
            <div className="pt-[20] px-[25]">
              {aaa.map((el) => (
                <Link href="#" className="flex items-center py-[10] gap-[15] border-b border-dotted">
                  <div className="flex items-center justify-center bg-secondary w-[30] h-[30]">
                    <Image src="/icons/phone.png" width={20} height={20} alt="phone icon" />
                  </div>

                  <p>{el}</p>
                </Link>
              ))}
            </div>

            <ButtonWithIcon
              text="Ще категорії"
              iconSrc="/icons/shopping-bag.png"
              classNames="w-full rounded-[20]"
              wrapperClassNames="mt-[15]"
            />
          </div>

          <div
            className="w-full flex-1 rounded-[20] p-[40]"
            style={{ background: 'radial-gradient(circle, rgba(215, 228, 215, 0.8) 30%, rgba(180, 200, 180, 1) 100%)' }}
            // style={{ background: 'radial-gradient(circle,  #3c4d3c 0%, #2d3e2d 70%, #263626 100%)' }}
          >
            2
          </div>

          <div className="flex flex-col gap-[20] w-[320] min-w-[320]">
            <div className="h-[150] w-full bg-border rounded-[20] p-[20]">Подбор решения</div>
            <div className="h-[150] w-full bg-border rounded-[20] p-[20]">Проектирование</div>
            <div className="h-[150] w-full bg-border rounded-[20] p-[20]">Монтажные работы</div>
          </div>
        </div>

        <div className="flex gap-[30] mb-[140]">
          <div className="">
            <div className="flex items-center gap-[15] mb-[15]">
              <div className="flex items-center justify-center bg-secondary rounded-full w-[55] h-[55]">
                <Image src="/icons/phone.png" width={30} height={20} alt="icon" />
              </div>
              <h4 className="font-semibold text-xl">Большой ассортимент</h4>
            </div>

            <p>
              Обладаем опытом и всеми знаниями, что позволяет нам эффективно анализировать потребности клиента и
              предлагать наиболее подходящие решения.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-[15] mb-[15]">
              <div className="flex items-center justify-center bg-secondary rounded-full w-[55] h-[55]">
                <Image src="/icons/phone.png" width={30} height={20} alt="icon" />
              </div>
              <h4 className="font-semibold text-xl">Большой ассортимент</h4>
            </div>

            <p>
              Обладаем опытом и всеми знаниями, что позволяет нам эффективно анализировать потребности клиента и
              предлагать наиболее подходящие решения.
            </p>
          </div>

          <div className="">
            <div className="flex items-center gap-[15] mb-[15]">
              <div className="flex items-center justify-center bg-secondary rounded-full w-[55] h-[55]">
                <Image src="/icons/phone.png" width={30} height={20} alt="icon" />
              </div>
              <h4 className="font-semibold text-xl">Большой ассортимент</h4>
            </div>

            <p>
              Обладаем опытом и всеми знаниями, что позволяет нам эффективно анализировать потребности клиента и
              предлагать наиболее подходящие решения.
            </p>
          </div>
        </div>

        <div className="mb-[120]">
          <h3 className="font-semibold text-3xl mb-[40]">Популярні</h3>
          <div className="grid grid-cols-5 gap-[20]">
            <CatalogCard viewType="cards" />
            <CatalogCard viewType="cards" />
            <CatalogCard viewType="cards" />
            <CatalogCard viewType="cards" />
            <CatalogCard viewType="cards" />
          </div>
        </div>

        <div className="mb-[120]">
          <h3 className="font-semibold text-3xl mb-[40]">Новинки</h3>
          <div className="grid grid-cols-5 gap-[20]">
            <CatalogCard viewType="cards" />
            <CatalogCard viewType="cards" />
            <CatalogCard viewType="cards" />
            <CatalogCard viewType="cards" />
            <CatalogCard viewType="cards" />
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-3xl mb-[40]">Наші партнери</h3>

          <div className="grid grid-cols-6 gap-[20]">
            {Array(12)
              .fill(null)
              .map((el) => (
                <div className="h-[150] w-full bg-border rounded-[20] p-[20]">123</div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
