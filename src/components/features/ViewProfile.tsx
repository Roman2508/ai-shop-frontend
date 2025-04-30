import React from 'react'
import { useLocale, useTranslations } from 'next-intl'

import SessionsList from './sessions-list'
import getPhotoUrl from '@/utils/get-photo-url'
import formatDateTime from '@/utils/format-date-time'
import { UserModel } from '@/graphql/generated/output'
import { useCurrent } from '@/hooks/useCurrent'

interface ViewProfilePropsType {
  user?: Omit<UserModel, 'password'>
}

const ViewProfile: React.FC<ViewProfilePropsType> = ({ user }) => {
  const t = useTranslations('profile.personalInformation.view')

  const locale = useLocale()

  const { refetch } = useCurrent()

  React.useEffect(() => {
    refetch()
  }, [])

  if (!user) {
    return <h1 className="font-bold text-center">{locale === 'ua' ? 'Завантаження...' : 'Loading...'}</h1>
  }

  return (
    <>
      <div className="bg-background rounded-[5px] pb-[40px] mb-[60px] overflow-hidden border border-border">
        <h3 className="bg-primary text-popover px-[40px] py-[20px] text-xl font-semibold">{t('blockTitle1')}</h3>
        <div className="px-[40px] py-[30px]">
          <div className="flex py-[20px] border-b border-dashed">
            <p className="w-[40%]">{t('publicName')}</p>
            <p className="w-[60%] text-right font-semibold">{user.displayName}</p>
          </div>

          <div className="flex py-[20px] border-b border-dashed">
            <p className="w-[40%]">{t('userName')}</p>
            <p className="w-[60%] text-right font-semibold">{user.username}</p>
          </div>

          <div className="flex py-[20px] border-b border-dashed">
            <p className="w-[40%]">{t('email')}</p>
            <p className="w-[60%] text-right font-semibold">{user.email}</p>
          </div>

          <div className="flex py-[20px] border-b border-dashed">
            <p className="w-[40%]">{t('updatedAt')}</p>
            <p className="w-[60%] text-right font-semibold">{formatDateTime(user.updatedAt)}</p>
          </div>

          <div className="flex py-[20px] border-b border-dashed">
            <p className="w-[40%]">{t('createdAt')}</p>
            <p className="w-[60%] text-right font-semibold">{formatDateTime(user.createdAt)}</p>
          </div>
        </div>
      </div>

      <div className="bg-background rounded-[5px] pb-[40px] mb-[60px] overflow-hidden border border-border">
        <h3 className="bg-primary text-popover px-[40px] py-[20px] text-xl font-semibold">{t('blockTitle2')}</h3>
        <div className="px-[40px] py-[30px]">
          <img
            className="w-[150px] h-[150px] object-cover"
            src={user.avatar ? getPhotoUrl(user.avatar || '', 'users') : '/images/empty-image.webp'}
          />
        </div>
      </div>

      <div className="bg-background rounded-[5px] pb-[40px] mb-[60px] overflow-hidden border border-border">
        <h3 className="bg-primary text-popover px-[40px] py-[20px] text-xl font-semibold">{t('blockTitle3')}</h3>
        <div className="px-[40px] py-[30px]">
          <div className="flex py-[20px] border-b border-dashed">
            <p className="w-[40%]">{t('city')}</p>
            <p className="w-[60%] text-right font-semibold">{user.city ? user.city : '-'}</p>
          </div>

          <div className="flex py-[20px] border-b border-dashed">
            <p className="w-[40%]">{t('street')}</p>
            <p className="w-[60%] text-right font-semibold">{user.street ? user.street : '-'}</p>
          </div>

          <div className="flex py-[20px] border-b border-dashed">
            <p className="w-[40%]">{t('postOffice')}</p>
            <p className="w-[60%] text-right font-semibold">{user.postOffice ? user.postOffice : '-'}</p>
          </div>
        </div>
      </div>

      <SessionsList />
    </>
  )
}
export default ViewProfile
