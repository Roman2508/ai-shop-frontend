import { Button } from '@/components/ui/common/Button'
import { Input } from '@/components/ui/common/Input'
import { useTranslations } from 'next-intl'

export default function Home() {
  const translations = useTranslations('home')

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <h1>{translations('title')}</h1>

      <div className="px-[500] py-[10]">
        <Button variant="default">Додати до корзини</Button>
      </div>

      <div className="px-[500] py-[10]">
        <Button variant="link">Скинути фільтри</Button>
      </div>

      <div className="px-[500] py-[10]">
        <Button variant="outline">На головну</Button>
      </div>

      <div className="px-[500] py-[10]">
        <Button variant="secondary">Купити в один клік</Button>
      </div>

      <div style={{ width: '300px', margin: '0 auto' }}>
        <Input />
      </div>
    </div>
  )
}
