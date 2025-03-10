import { z } from 'zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
  FormDescription,
} from '@/components/ui/common/Form'
import { Input } from '../ui/common/Input'
import { Button } from '../ui/common/Button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/common/Tabs'
import { Textarea } from '../ui/common/Textarea'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/common/Select'

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),

  title: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),

  price: z.number().min(2, {
    message: 'Username must be at least 2 characters.',
  }),

  brand: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),

  ram: z.number().min(2, {
    message: 'Username must be at least 2 characters.',
  }),

  builtInMemory: z.number().min(2, {
    message: 'Username must be at least 2 characters.',
  }),

  frontCamera: z.number().min(2, {
    message: 'Username must be at least 2 characters.',
  }),

  mainCamera: z.number().min(2, {
    message: 'Username must be at least 2 characters.',
  }),

  screenDiagonal: z.number().min(2, {
    message: 'Username must be at least 2 characters.',
  }),

  simCount: z.number().min(2, {
    message: 'Username must be at least 2 characters.',
  }),

  simFormat: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),

  os: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),

  processorName: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),

  processorCores: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),

  battery: z.number().min(2, {
    message: 'Username must be at least 2 characters.',
  }),

  materials: z.number().min(2, {
    message: 'Username must be at least 2 characters.',
  }),

  deliverySet: z.number().min(2, {
    message: 'Username must be at least 2 characters.',
  }),

  color: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

const mainCharacteristicsInputsData = [
  { key: 'ram', label: "Оперативна пам'ять", type: 'number', placeholder: "Вкажіть об'єм оперативної пам'яті" },
  {
    key: 'builtInMemory',
    label: "Вбудована пам'ять",
    type: 'number',
    placeholder: "Вкажіть об'єм вбудованої пам'яті",
  },
  { key: 'frontCamera', label: 'Фронтальна камера', type: 'number', placeholder: '---' },
  { key: 'mainCamera', label: 'Основна камера', type: 'number', placeholder: '---' },
  { key: 'screenDiagonal', label: 'Діагональ екрану', type: 'number', placeholder: 'Вкажіть діагональ екрану' },
  { key: 'simCount', label: 'Кількість сім-карт', type: 'number', placeholder: 'Вкажіть кількість сам-карт' },
  { key: 'processorName', label: 'Назва процесора', type: 'text', placeholder: 'Вкажіть назву процесора' },
  {
    key: 'processorCores',
    label: 'Кількість ядер процесора',
    type: 'number',
    placeholder: 'Вкажіть кількість ядер процесора',
  },
  { key: 'battery', label: 'Ємність акумулятора', type: 'number', placeholder: 'Вкажіть ємність акумулятора' },
] as const

const mainCharacteristicsSelectData = [
  {
    key: 'simFormat',
    label: 'Формат сім-карти',
    items: [
      { key: 'nano', label: 'nano' },
      { key: 'micro', label: 'micro' },
      { key: 'mini', label: 'mini' },
    ],
  },
  {
    key: 'os',
    label: 'Операційна система',
    items: [
      { key: 'android', label: 'Android' },
      { key: 'ios', label: 'iOS' },
    ],
  },
  {
    key: 'color',
    label: 'Колір',
    items: [
      { key: 'black', label: 'Чорний' },
      { key: 'white', label: 'Білий' },
      { key: 'red', label: 'Червоний' },
      { key: 'blue', label: 'Синій' },
      { key: 'green', label: 'Зелений' },
      { key: 'yellow', label: 'Жовтий' },
      { key: 'gray', label: 'Сірий' },
      { key: 'purple', label: 'Фіолетовий' },
      { key: 'pink', label: 'Рожевий' },
      { key: 'gold', label: 'Золотий' },
      { key: 'silver', label: 'Сріблястий' },
      { key: 'brown', label: 'Коричневий' },
      { key: 'orange', label: 'Помаранчевий' },
      { key: 'beige', label: 'Бежевий' },
      { key: 'cyan', label: 'Блакитний' },
      { key: 'burgundy', label: 'Бордовий' },
      { key: 'turquoise', label: 'Бірюзовий' },
      { key: 'maroon', label: 'Каштановий' },
      { key: 'olive', label: 'Оливковий' },
      { key: 'coral', label: 'Кораловий' },
      { key: 'lilac', label: 'Ліловий' },
      { key: 'ivory', label: 'Слонова кістка' },
      { key: 'teal', label: 'Чорний' },
      { key: 'khaki', label: 'Хакі' },
      { key: 'azure', label: 'Блакитний' },
      { key: 'lavender', label: 'Лавандовий' },
      { key: 'salmon', label: 'Лосось' },
      { key: 'mint', label: "М'ятний" },
      { key: 'cerulean', label: 'Лазурний' },
    ],
  },
  {
    key: 'materials',
    label: 'Матеріал корпуса',
    items: [
      { key: 'plastic', label: 'Пластик' },
      { key: 'metal', label: 'Метал' },
      { key: 'glass', label: 'Скло' },
      { key: 'ceramics', label: 'Кераміка' },
      { key: 'silicone', label: 'Силікон' },
      { key: 'leather', label: 'Шкіра' },
      { key: 'wood', label: 'Дерево' },
      { key: 'rubber', label: 'Гума' },
    ],
  },
  {
    key: 'deliverySet',
    label: 'Комплект постачання',
    items: [
      { key: 'phone', label: 'Телефон' },
      { key: 'charger', label: 'Зарядний пристрій' },
      { key: 'cable', label: 'Кабель' },
      { key: 'headphones', label: 'Навушники' },
      { key: 'manual', label: 'Інструкція' },
      { key: 'box', label: 'Коробка' },
    ],
  },
] as const

const CreateProductForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="border-b pb-[40] mb-[30]">
          <h4 className="font-semibold mb-[20]">Основна інформація</h4>

          <div className="flex flex-wrap gap-[26]">
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>Бренд</FormDescription>
                  <FormControl>
                    <Select>
                      <SelectTrigger className="h-[50] px-[20] w-[440]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="samsung">samsung</SelectItem>
                          <SelectItem value="xiaomi">xiaomi</SelectItem>
                          <SelectItem value="iphone">iphone</SelectItem>
                          <SelectItem value="meizu">meizu</SelectItem>
                          <SelectItem value="motorola">motorola</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>Ціна</FormDescription>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Вкажіть ціну товара"
                      variant="primary"
                      className="h-[50] px-[20] w-[440]"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormDescription>Опис</FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="Вкажіть опис товара"
                      //   variant="primary"
                      className="h-[50] px-[20] border border-border bg-card"
                      {...field}
                    />
                    {/* <Input /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="border-b pb-[40] mb-[30]">
          <h4 className="font-semibold mb-[20]">Фото</h4>

          <div className="flex flex-wrap gap-[26]">
            <div className="flex gap-[10] w-full">
              {Array(3)
                .fill(null)
                .map((_, index) => (
                  <div className="w-[150] h-[150]" key={index}>
                    <img src="https://www.shutterstock.com/image-vector/no-image-available-icon-template-600nw-1036735678.jpg" />
                  </div>
                ))}
            </div>

            <Button variant="secondary" type="button">
              Завантажити фото
            </Button>
            <input type="file" /* className="hidden"  */ />
          </div>
        </div>

        <div className="border-b pb-[40] mb-[30]">
          <h4 className="font-semibold mb-[20]">Головні характеристики</h4>

          <div className="flex flex-wrap gap-[26]">
            {mainCharacteristicsInputsData.map((input, index) => (
              <FormField
                key={input.key}
                control={form.control}
                name={input.key}
                render={({ field }) => (
                  <FormItem>
                    <FormDescription>{input.label}</FormDescription>
                    <FormControl>
                      <Input
                        className="h-[50] px-[20] w-[280]"
                        placeholder={input.placeholder}
                        type={input.type}
                        variant="primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        <div className="border-b pb-[40] mb-[30]">
          <h4 className="font-semibold mb-[20]">11212121212121121211212</h4>

          <div className="flex flex-wrap gap-[26]">
            {mainCharacteristicsSelectData.map((select, index) => (
              <FormField
                key={select.key}
                control={form.control}
                name={select.key}
                render={({ field }) => (
                  <FormItem>
                    <FormDescription>{select.label}</FormDescription>
                    <FormControl>
                      <Select>
                        <SelectTrigger className="h-[50] px-[20] w-[440]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {select.items.map((item) => (
                              <SelectItem key={item.key} value={item.key}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        <Button type="submit" className="w-[260]">
          Зберегти
        </Button>
      </form>
    </Form>
  )
}

export default CreateProductForm
