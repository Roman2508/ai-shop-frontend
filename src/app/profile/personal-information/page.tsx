'use client'

import React from 'react'

import { Button } from '@/components/ui/common/Button'
import ButtonWithIcon from '@/components/ui/custom/ButtonWithIcon'
import ProfileLayout from '@/components/layout/profile/ProfileLayout'

const personalInfo = [
  { name: 'ПІБ', value: 'ПроектСтрой' },
  { name: 'ИНН', value: '9725012747' },
  { name: 'КПП', value: '772501001' },
  { name: 'ОГРН', value: '1197746370524' },
  { name: 'Имя генерального директора', value: 'Иванов Иван Иванович' },
  { name: 'Юридический адрес', value: '119530 Москва, Очаковское ш., д.28, корпус 2, офис 38' },
]

const paymentData = [
  { name: 'Название банка', value: 'ПАО «Сбербанк»' },
  { name: 'БИК', value: '044521234' },
  { name: 'Номер расчетного счета', value: '40702810123450101230' },
  { name: 'Номер корреспондентского счета', value: '30101234500000000225' },
]

const deliveryData = [{ name: 'Адрес', value: '119530 Москва, Очаковское ш., д.10, корпус 11,  квартира 12' }]

const profileData = [
  { title: 'Особисті дані', items: personalInfo },
  { title: 'Платіжна інформація', items: paymentData },
  { title: 'Адрес доставки', items: deliveryData },
]

const PersonalInformationPage = () => {
  const [pageView, setPageView] = React.useState<'view' | 'edit'>('view')

  const handleChangePageView = () => {
    if (pageView === 'view') {
      setPageView('edit')
    } else {
      setPageView('view')
    }
  }

  return (
    <ProfileLayout>
      <div className="flex justify-between items-center pb-[40]">
        <div className="flex items-center">
          <h1 className="text-3xl font-semibold">Мій профіль</h1>
          <Button variant="link" className="px-[20]" onClick={handleChangePageView}>
            {pageView === 'view' ? 'Редагувати' : 'Закінчити редагування'}
          </Button>
        </div>

        <div className="flex gap-[10]">
          <ButtonWithIcon iconSrc="/icons/list.png" text="МОЇ ЗАМОВЛЕННЯ" buttonVariant="secondary" classNames="" />
          <Button size="icon" className="h-[44] w-[44]">
            0
          </Button>
        </div>
      </div>

      <div className="bg-border rounded-[5] px-[50] py-[40]">
        {/*  */}

        {profileData.map((el) => (
          <div key={el.title} className="bg-background rounded-[5] pb-[40] mb-[60] overflow-hidden">
            <h3 className="bg-primary text-popover px-[40] py-[20] text-xl font-semibold">{el.title}</h3>
            <div className="px-[40] py-[30]">
              {el.items.map((el) => (
                <div key={el.name} className="flex py-[20] border-b border-dashed">
                  <p className="w-[40%]">{el.name}</p>
                  <p className="w-[60%] text-right font-semibold">{el.value}</p>
                </div>
              ))}

              {el.title === 'Адрес доставки' && (
                <div className="pt-[40]">
                  <iframe
                  
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5103.117736506616!2d28.6413947!3d50.2441456!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472c648aed44e5cf%3A0x8c8080cc023799b!2z0JbQuNGC0L7QvNC40YDRgdGM0LrQuNC5INCx0LDQt9C-0LLQuNC5INGE0LDRgNC80LDRhtC10LLRgtC40YfQvdC40Lkg0YTQsNGF0L7QstC40Lkg0LrQvtC70LXQtNC2INCW0LjRgtC-0LzQuNGA0YHRjNC60L7RlyDQvtCx0LvQsNGB0L3QvtGXINGA0LDQtNC4!5e0!3m2!1sru!2sua!4v1738593781835!5m2!1sru!2sua"
                    width="100%"
                    height="350"
                    //   style="border:0;"
                   
                    //   allowFullScreen=""
                    loading="lazy"
                    //   referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </ProfileLayout>
  )
}

export default PersonalInformationPage
