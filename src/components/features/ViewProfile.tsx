import { UserModel } from '@/graphql/generated/output'
import formatDateTime from '@/utils/format-date-time'
import React from 'react'

type ViewProfilePropsType = {
  items: any
  user?: Omit<UserModel, 'password'>
}

const ViewProfile: React.FC<ViewProfilePropsType> = ({ items, user }) => {
  if (!user) return <h1>User is not defined!</h1>

  return (
    <>
      {items.map((el: any) => {
        return (
          <div
            key={el.title}
            className="bg-background rounded-[5] pb-[40] mb-[60] overflow-hidden border border-border"
          >
            <h3 className="bg-primary text-popover px-[40] py-[20] text-xl font-semibold">{el.title}</h3>
            <div className="px-[40] py-[30]">
              {/*  */}

              {el.title === 'Особисті дані' && (
                <>
                  <div className="flex py-[20] border-b border-dashed">
                    <p className="w-[40%]">Публічне ім’я</p>
                    <p className="w-[60%] text-right font-semibold">{user.displayName}</p>
                  </div>

                  <div className="flex py-[20] border-b border-dashed">
                    <p className="w-[40%]">Ім’я профілю</p>
                    <p className="w-[60%] text-right font-semibold">{user.username}</p>
                  </div>

                  <div className="flex py-[20] border-b border-dashed">
                    <p className="w-[40%]">Електронна пошта</p>
                    <p className="w-[60%] text-right font-semibold">{user.email}</p>
                  </div>

                  <div className="flex py-[20] border-b border-dashed">
                    <p className="w-[40%]">Дата оновлення профілю</p>
                    <p className="w-[60%] text-right font-semibold">{formatDateTime(user.updatedAt)}</p>
                  </div>

                  <div className="flex py-[20] border-b border-dashed">
                    <p className="w-[40%]">Дата створення профілю</p>
                    <p className="w-[60%] text-right font-semibold">{formatDateTime(user.createdAt)}</p>
                  </div>
                </>
              )}

              {/*  */}

              {el.title === 'Платіжна інформація' && (
                <>
                  <div className="flex py-[20] border-b border-dashed">
                    <p className="w-[40%]">Номер карти</p>
                    <p className="w-[60%] text-right font-semibold">{user.displayName}</p>
                  </div>

                  <div className="flex py-[20] border-b border-dashed">
                    <p className="w-[40%]">Термін дії</p>
                    <p className="w-[60%] text-right font-semibold">{user.username}</p>
                  </div>

                  <div className="flex py-[20] border-b border-dashed">
                    <p className="w-[40%]">CVV</p>
                    <p className="w-[60%] text-right font-semibold">{user.email}</p>
                  </div>
                </>
              )}

              {/*  */}

              {el.title === 'Адрес доставки' && (
                <>
                  <div className="flex py-[20] border-b border-dashed">
                    <p className="w-[40%]">Місто</p>
                    <p className="w-[60%] text-right font-semibold">{user.displayName}</p>
                  </div>

                  <div className="flex py-[20] border-b border-dashed">
                    <p className="w-[40%]">Вулиця</p>
                    <p className="w-[60%] text-right font-semibold">{user.username}</p>
                  </div>

                  <div className="flex py-[20] border-b border-dashed">
                    <p className="w-[40%]">Будинок</p>
                    <p className="w-[60%] text-right font-semibold">{user.email}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )
      })}
    </>
  )
}
export default ViewProfile
