import { z } from 'zod'

export const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Ім'я профілю повинно бути більше 2 символів",
    })
    .regex(
      /^[a-zA-Z0-9_]+(?:-[a-zA-Z0-9_]+)*$/,
      "Ім'я профілю повинно включати тільки латинські букви та символи -, _"
    ),
  displayName: z.string().min(2, {
    message: "Публічне ім'я повинно бути більше 2 символів",
  }),
  email: z.string().email('Не вірний формат пошти'),
  password: z.string().optional(),
  city: z.string(),
  street: z.string(),
  postOffice: z.string(),
})
