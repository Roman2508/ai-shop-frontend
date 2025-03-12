import { z } from 'zod'

export const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Опис повинен складатись не менше ніж з 20 символів',
  }),

  price: z.number().positive({
    message: 'Ціна не може бути менше 0',
  }),

  brand: z.string().min(2, {
    message: 'Це поле не може бути пустим',
  }),

  ram: z.number().positive({
    message: 'Вказано не вірне значення',
  }),

  builtInMemory: z.number().positive({
    message: 'Вказано не вірне значення',
  }),

  frontCamera: z.number().positive({
    message: 'Вказано не вірне значення',
  }),

  mainCamera: z.number().positive({
    message: 'Вказано не вірне значення',
  }),

  screenDiagonal: z.number().positive({
    message: 'Вказано не вірне значення',
  }),

  simCount: z.number().positive({
    message: 'Вказано не вірне значення',
  }),

  simFormat: z.string().min(1, {
    message: 'Це поле не може бути пустим',
  }),

  os: z.string().min(1, {
    message: 'Це поле не може бути пустим',
  }),

  processorName: z.string().min(2, {
    message: 'Це поле не може бути пустим',
  }),

  processorCores: z.string().min(1, {
    message: 'Це поле не може бути пустим',
  }),

  battery: z.number().positive({
    message: 'Вказано не вірне значення',
  }),

  materials: z.string().min(1, {
    message: 'Це поле не може бути пустим',
  }),

  deliverySet: z.string().min(1, {
    message: 'Це поле не може бути пустим',
  }),

  color: z.string().min(1, {
    message: 'Це поле не може бути пустим',
  }),
})

export const defaultValues = {
  title: '',
  price: 0,
  brand: '',
  ram: 0,
  builtInMemory: 0,
  frontCamera: 0,
  mainCamera: 0,
  screenDiagonal: 0,
  simCount: 0,
  simFormat: '',
  os: '',
  processorName: '',
  processorCores: '',
  battery: 0,
  materials: '',
  deliverySet: '',
  color: '',
}

export const mainCharacteristicsInputsData = [
  { key: 'ram', label: "Оперативна пам'ять", type: 'number', placeholder: "Вкажіть об'єм оперативної пам'яті" },
  {
    key: 'builtInMemory',
    label: "Вбудована пам'ять",
    type: 'number',
    placeholder: "Вкажіть об'єм вбудованої пам'яті",
  },
  { key: 'frontCamera', label: 'Фронтальна камера', type: 'number', placeholder: 'Вкажіть к-ть Мп фронтальної камери' },
  { key: 'mainCamera', label: 'Основна камера', type: 'number', placeholder: 'Вкажіть к-ть Мп основної камери' },
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

export const mainCharacteristicsSelectData = [
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
