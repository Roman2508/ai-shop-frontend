'use-client'
import React from 'react'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import {
  FindCurrentSessionQuery,
  useRemoveSessionMutation,
  useFindCurrentSessionQuery,
  useFindSessionsByUserQuery,
} from '@/graphql/generated/output'
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'
import { Button } from '../ui/common/Button'
import { useWishlist } from '@/hooks/useWishlist'
import formatDateTime from '@/utils/format-date-time'
import { removeAuthCookie } from '@/utils/auth-cookie'

const SessionsList = () => {
  const router = useRouter()
  const t = useTranslations('profile.personalInformation.view.sessions')

  const { exit } = useAuth()
  const { clearSelectedItems, setCartItems } = useCart()
  const { setWishlistItems } = useWishlist()

  const { data: sessinData, loading: isLoadingCurrent } = useFindCurrentSessionQuery()
  const currentSession = sessinData?.findCurrentSession ?? ({} as FindCurrentSessionQuery['findCurrentSession'])

  const { data: sessinsData, refetch } = useFindSessionsByUserQuery()
  const sessions = sessinsData?.findSessionsByUser ?? ([] as FindCurrentSessionQuery['findCurrentSession'][])

  const [removeSession, { loading: isLoadingRemove }] = useRemoveSessionMutation({
    onCompleted() {
      refetch()
      toast.success('Сесію було видалено')
    },
    onError() {
      toast.success('Помилка при видаленні сесії')
    },
  })

  const onLogout = () => {
    if (!window.confirm('Ви дійсно хочете завершити поточну сесію?')) return
    router.replace('/catalog')
    clearSelectedItems()
    setWishlistItems([])
    setCartItems([])
    localStorage.removeItem('userData')
    localStorage.removeItem('order')
    localStorage.removeItem('wishlist')
    exit()
    removeAuthCookie()
  }

  const onRemoveSession = (id: string) => {
    if (!window.confirm('Ви дійсно хочете завершити сесію?')) return
    removeSession({ variables: { id } })
  }

  if (!sessinData || !sessinsData) return

  return (
    <div className="bg-background rounded-[5px] pb-[40px] mb-[60px] overflow-hidden border border-border">
      <h3 className="bg-primary text-popover px-[40px] py-[20px] text-xl font-semibold">{t('active')}</h3>
      <div className="px-[40px] py-[30px]">
        <p className="font-bold text-center pb-[10px] border-b border-dashed">{t('current')}</p>
        <div className="flex items-center py-[20px] border-b border-dashed">
          <div className="w-[40%] flex flex-col">
            <p className="font-semibold">{`${currentSession.metadata.device.browser}, ${currentSession.metadata.device.os}`}</p>
            <p>{`${formatDateTime(currentSession.createdAt)}`}</p>
          </div>
          <div className="w-[40%] flex flex-col">
            <p className="font-semibold">{`${currentSession.metadata.location.country}, ${currentSession.metadata.location.city}`}</p>
            <p>{currentSession.metadata.ip}</p>
          </div>
          <div className="w-[20%] text-right">
            <Button variant="link" onClick={onLogout} disabled={isLoadingCurrent}>
              {t('endButton')}
            </Button>
          </div>
        </div>

        <p className="font-bold text-center mt-[40px] pb-[10px] border-b border-dashed">{t('other')}</p>
        {sessions.length ? (
          sessions.map((s) => (
            <div className="flex py-[20px] border-b border-dashed" key={s.id}>
              <div className="w-[40%] flex flex-col">
                <p className="font-semibold">{`${s.metadata.device.browser}, ${s.metadata.device.os}`}</p>
                <p>{`${formatDateTime(s.createdAt)}`}</p>
              </div>
              <div className="w-[40%] flex flex-col">
                <p className="font-semibold">{`${s.metadata.location.country}, ${s.metadata.location.city}`}</p>
                <p>{s.metadata.ip}</p>
              </div>
              <div className="w-[20%] text-right">
                <Button variant="link" disabled={isLoadingRemove} onClick={() => onRemoveSession(s.id)}>
                  {t('endButton')}
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-[20px]">{t('notFound')}</p>
        )}
      </div>
    </div>
  )
}

export default SessionsList
