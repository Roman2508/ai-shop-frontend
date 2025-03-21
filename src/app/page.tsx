'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'

import { Button } from '@/components/ui/common/Button'
import ButtonWithIcon from '@/components/ui/custom/ButtonWithIcon'
import React from 'react'
import { useRouter } from 'next/navigation'

const categories = ['Apple', 'Samsung', 'Xiaomi', 'Google Pixel', 'One Plus', 'Motorola', 'Nokia', 'Sony']

const advantages = [
  {
    title: 'Широкий асортимент',
    text: 'Ми володіємо досвідом і всіма необхідними знаннями, що дозволяє нам ефективно аналізувати потреби клієнтів і пропонувати найбільш відповідні рішення.',
  },
  {
    title: 'Швидка доставка',
    text: 'Ми забезпечуємо швидку доставку товарів клієнтам, що допомагає заощадити час і зручно отримати бажаний товар.',
  },
  {
    title: 'Знижки та акції',
    text: 'Ми регулярно проводимо акції та пропонуємо знижки на різні товари, роблячи покупки у нас ще вигіднішими для клієнтів.',
  },
]

// tido:
// 3.  Orders (change status cron)
// 4.  localization
// 5.  mobile adaptation
// 6.  filters (url query params)
// 8.  search (AI)
// 9.  recommendation (FAIS vectors)
// 13. Roles
// 14. Активні сесії
// 15. Redirect

// 7.  homepage !!!ALMOST_DONE
// 10. administration (products CRUD) !!!ALMOST_DONE
// 12. Toast !!!ALMOST_DONE
// 15. Авторизація !!!ALMOST_DONE
// 16. Admin page (/admin) !!!ALMOST_DONE

// 1.  Comments !!!DONE
// 2.  Payment !!!DONE
// 11. Купити в 1 клік (full product page) !!!DONE

export default function Home() {
  const translations = useTranslations('home')
  const locale = useLocale()

  // const router = useRouter()

  // React.useEffect(() => {
  //   if (window.history.replaceState) {
  //     // Заменяем URL без перезагрузки страницы
  //     window.history.replaceState(null, '', '/catalog')
  //   }

  //   // Если запрос пришёл с POST — делаем редирект на GET
  //   if (window.location.search || window.location.hash) {
  //     router.replace('/catalog')
  //   }
  // }, [])

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-[1640] mx-auto px-[16]">
        <div className="flex gap-[30] mb-[70]">
          <div className="w-[320] min-w-[320] border rounded-[20]">
            <div className="pt-[20] px-[25]">
              {categories.map((el) => (
                <Link href="#" className="flex items-center py-[10] gap-[15] border-b border-dotted">
                  <div className="flex items-center justify-center bg-secondary w-[30] h-[30]">
                    <Image src="/icons/phone.png" width={20} height={20} alt="phone icon" />
                  </div>

                  <p>{el}</p>
                </Link>
              ))}
            </div>

            <Link href="/catalog">
              <ButtonWithIcon
                text="Ще категорії"
                iconSrc="/icons/shopping-bag.png"
                classNames="w-full rounded-[20]"
                wrapperClassNames="mt-[15]"
              />
            </Link>
          </div>

          <div
            className="w-full flex-1 rounded-[20] relative overflow-hidden"
            // className="w-full flex-1 rounded-[20] p-[40] relative"
            style={{
              background: 'radial-gradient(circle, rgba(215, 228, 215, 0.8) 30%, rgba(180, 200, 180, 1) 100%)',
            }}
            // style={{ background: 'radial-gradient(circle,  #3c4d3c 0%, #2d3e2d 70%, #263626 100%)' }}
          >
            <div
              className="absolute top-[0] left-[0] w-full h-full w-[910px] h-[500px] "
              style={{
                backgroundImage: 'url(/images/homapage-image.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
          </div>

          <div className="flex flex-col gap-[20] w-[320] min-w-[320]">
            <div className="h-[150] w-full bg-border rounded-[20] p-[20] flex flex-col justify-between">
              <Image src="/images/homepage-filter.svg" width={60} height={60} alt="" />
              <b>Вибір ідеального смартфона</b>
            </div>
            <div className="h-[150] w-full bg-border rounded-[20] p-[20] flex flex-col justify-between">
              <Image src="/images/homepage-accessories.svg" width={60} height={60} alt="" />
              <b>Комплектація та аксесуари</b>
            </div>
            <div className="h-[150] w-full bg-border rounded-[20] p-[20] flex flex-col justify-between">
              <Image src="/images/homepage-services.svg" width={60} height={60} alt="" />
              <b>Налаштування та сервіс</b>
            </div>
          </div>
        </div>

        <div className="flex gap-[30] mb-[140]">
          {advantages.map((el, index) => (
            <div key={el.title} className="flex-[1]">
              <div className="flex items-center gap-[15] mb-[15]">
                <div className="flex items-center justify-center bg-secondary rounded-full w-[55] h-[55]">
                  <Image src={`/images/homapage-advantage-${index + 1}.svg`} width={30} height={30} alt="icon" />
                </div>
                <h4 className="font-semibold text-xl">{el.title}</h4>
              </div>
              <p>{el.text}</p>
            </div>
          ))}
        </div>

        <div className="mb-[120]">
          <h3 className="font-semibold text-3xl mb-[40]">Популярні</h3>
          <div className="grid grid-cols-5 gap-[20]">
            {/* <CatalogCard viewType="cards" product={[]} />
            <CatalogCard viewType="cards" product={[]} />
            <CatalogCard viewType="cards" product={[]} />
            <CatalogCard viewType="cards" product={[]} />
            <CatalogCard viewType="cards" product={[]} /> */}
          </div>
          <div className="flex justify-center mt-[20]">
            <Link href="/catalog">
              <Button variant="link" className="px-[20]">
                Показати більше
              </Button>
            </Link>
          </div>
        </div>

        <div className="mb-[120]">
          <h3 className="font-semibold text-3xl mb-[40]">Новинки</h3>
          <div className="grid grid-cols-5 gap-[20]">
            {/* <CatalogCard viewType="cards" />
            <CatalogCard viewType="cards" />
            <CatalogCard viewType="cards" />
            <CatalogCard viewType="cards" />
            <CatalogCard viewType="cards" /> */}
          </div>
          <div className="flex justify-center mt-[20]">
            <Link href="/catalog">
              <Button variant="link" className="px-[20]">
                Показати більше
              </Button>
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-3xl mb-[40]">Наші партнери</h3>

          <div className="grid grid-cols-6 gap-[20]">
            {Array(12)
              .fill(null)
              .map((el, index) => (
                <div className="h-[150] w-full bg-border rounded-[20] p-[20] flex justify-center items-center">
                  <img src={`images/partners/${index + 1}.png`} className="max-h-[70%]" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
