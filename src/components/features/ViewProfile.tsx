import React from 'react'
import { useTranslations } from 'next-intl'

import getPhotoUrl from '@/utils/get-photo-url'
import formatDateTime from '@/utils/format-date-time'
import { UserModel } from '@/graphql/generated/output'
import { Button } from '../ui/common/Button'
import { useCurrent } from '@/hooks/useCurrent'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

interface ViewProfilePropsType {
  user?: Omit<UserModel, 'password'>
}

const ViewProfile: React.FC<ViewProfilePropsType> = ({ user }) => {
  const router = useRouter()

  const t = useTranslations('profile.personalInformation.view')

  const { exit } = useAuth()

  const onLogout = () => {
    if (!window.confirm('Ви дійсно хочете завершити поточну сесію?')) return
    router.replace('/catalog')
    exit()
  }

  if (!user) {
    return <h1 className="font-bold text-center">Завантаження...</h1>
  }

  return (
    <>
      <div className="bg-background rounded-[5] pb-[40] mb-[60] overflow-hidden border border-border">
        <h3 className="bg-primary text-popover px-[40] py-[20] text-xl font-semibold">{t('blockTitle1')}</h3>
        <div className="px-[40] py-[30]">
          <div className="flex py-[20] border-b border-dashed">
            <p className="w-[40%]">{t('publicName')}</p>
            <p className="w-[60%] text-right font-semibold">{user.displayName}</p>
          </div>

          <div className="flex py-[20] border-b border-dashed">
            <p className="w-[40%]">{t('userName')}</p>
            <p className="w-[60%] text-right font-semibold">{user.username}</p>
          </div>

          <div className="flex py-[20] border-b border-dashed">
            <p className="w-[40%]">{t('email')}</p>
            <p className="w-[60%] text-right font-semibold">{user.email}</p>
          </div>

          <div className="flex py-[20] border-b border-dashed">
            <p className="w-[40%]">{t('updatedAt')}</p>
            <p className="w-[60%] text-right font-semibold">{formatDateTime(user.updatedAt)}</p>
          </div>

          <div className="flex py-[20] border-b border-dashed">
            <p className="w-[40%]">{t('createdAt')}</p>
            <p className="w-[60%] text-right font-semibold">{formatDateTime(user.createdAt)}</p>
          </div>
        </div>
      </div>

      <div className="bg-background rounded-[5] pb-[40] mb-[60] overflow-hidden border border-border">
        <h3 className="bg-primary text-popover px-[40] py-[20] text-xl font-semibold">{t('blockTitle2')}</h3>
        <div className="px-[40] py-[30]">
          <img
            className="w-[150] h-[150] object-cover"
            src={user.avatar ? getPhotoUrl(user.avatar || '', 'users') : '/images/empty-image.webp'}
          />
        </div>
      </div>

      <div className="bg-background rounded-[5] pb-[40] mb-[60] overflow-hidden border border-border">
        <h3 className="bg-primary text-popover px-[40] py-[20] text-xl font-semibold">{t('blockTitle3')}</h3>
        <div className="px-[40] py-[30]">
          <div className="flex py-[20] border-b border-dashed">
            <p className="w-[40%]">{t('city')}</p>
            <p className="w-[60%] text-right font-semibold">{user.city ? user.city : '-'}</p>
          </div>

          <div className="flex py-[20] border-b border-dashed">
            <p className="w-[40%]">{t('street')}</p>
            <p className="w-[60%] text-right font-semibold">{user.street ? user.street : '-'}</p>
          </div>

          <div className="flex py-[20] border-b border-dashed">
            <p className="w-[40%]">{t('postOffice')}</p>
            <p className="w-[60%] text-right font-semibold">{user.postOffice ? user.postOffice : '-'}</p>
          </div>
        </div>
      </div>

      <div className="bg-background rounded-[5] pb-[40] mb-[60] overflow-hidden border border-border">
        <h3 className="bg-primary text-popover px-[40] py-[20] text-xl font-semibold">Активні сесії</h3>
        <div className="px-[40] py-[30]">
          <div className="flex py-[20] border-b border-dashed">
            <p className="w-[40%]">sadsadasdasd</p>
            <p className="w-[60%] text-right font-semibold">sadsadasdasd</p>
          </div>

          <div className="flex py-[20] border-b border-dashed">
            <p className="w-[40%]">sadsadasdasd</p>
            <p className="w-[60%] text-right font-semibold">sadsadasdasd</p>
          </div>

          <div className="flex py-[20] border-b border-dashed">
            <Button variant="secondary" onClick={onLogout}>
              Завершити поточну сесію
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
export default ViewProfile
