import React from 'react'
import Link from 'next/link'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/common/Breadcrumb'
import { Card } from '@/components/ui/common/Card'

const linksList = [
  {
    label: 'Профіль',
    icon: '',
    link: '/profile/personal-information',
  },
  {
    label: 'Замовлення',
    icon: '',
    link: '/profile/orders',
  },
  {
    label: 'Кошик',
    icon: '',
    link: '/profile/cart',
  },
  {
    label: 'Список бажань',
    icon: '',
    link: '/profile/wishlist',
  },
  {
    label: 'Відгуки',
    icon: '',
    link: '/profile/reviews',
  },
]

const ProfilePage = () => {
  return (
    <div className="max-w-[1640] mx-auto px-[16]">
      <Breadcrumb className="mb-[45]">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/components">Components</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex gap-[46]">
        <Card className="w-[300] py-[20] px-[25]">
          {linksList.map((el) => (
            <a href={el.link} className="flex items-center gap-[15] pb-[10] mb-[10] border-b border-dashed">
              <img src={el.icon} style={{ border: '1px solid black', padding: '6px' }} />
              <p>{el.label}</p>
            </a>
          ))}
        </Card>

        <div></div>
      </div>
    </div>
  )
}

export default ProfilePage
