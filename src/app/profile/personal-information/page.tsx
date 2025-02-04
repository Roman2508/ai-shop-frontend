'use client'

import React from 'react'

import { Button } from '@/components/ui/common/Button'
import ButtonWithIcon from '@/components/ui/custom/ButtonWithIcon'
import ProfileLayout from '@/components/layout/profile/ProfileLayout'
import EditProfileForm from '@/components/features/EditProfileForm'
import ViewProfile from '@/components/features/ViewProfile'

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

      <div className="px-[50] py-[40] rounded-[5] border border-border">
        {pageView === 'view' && <ViewProfile items={profileData} />}
        {pageView === 'edit' && <EditProfileForm />}
      </div>
    </ProfileLayout>
  )
}

export default PersonalInformationPage
