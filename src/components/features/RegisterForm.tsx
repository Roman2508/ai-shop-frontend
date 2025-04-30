'use client'

import { z } from 'zod'
import React from 'react'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'

import { useAuth } from '@/hooks/useAuth'
import { Input } from '../ui/common/Input'
import { Button } from '../ui/common/Button'
import { setAuthCookie } from '@/utils/auth-cookie'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRegisterMutation } from '@/graphql/generated/output'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/common/Form'

const formSchema = z
  .object({
    username: z
      .string({
        message: "Це поле є обов'язковим",
      })
      .min(2, {
        message: 'Мінімальна довжина поля - 2 символа',
      })
      .regex(
        /^[a-zA-Z0-9_]+(?:-[a-zA-Z0-9_]+)*$/,
        'Логін може містити лише латинські літери, цифри, дефіси та підкреслення'
      ),
    email: z
      .string({
        message: "Це поле є обов'язковим",
      })
      .min(2, {
        message: 'Мінімальна довжина поля - 2 символа',
      })
      .email({
        message: 'Не вірний формат пошти',
      }),
    password: z
      .string({
        message: "Це поле є обов'язковим",
      })
      .min(8, {
        message: 'Мінімальна довжина поля - 8 символів',
      }),
    password2: z
      .string({
        message: "Це поле є обов'язковим",
      })
      .min(8, {
        message: 'Мінімальна довжина поля - 8 символів',
      }),
  })
  .refine((data) => data.password === data.password2, {
    message: 'Паролі не співпадають',
    path: ['password2'],
  })

interface IRegisterFormProps {
  setFromType: React.Dispatch<React.SetStateAction<'login' | 'register'>>
}

const RegisterForm: React.FC<IRegisterFormProps> = ({ setFromType }) => {
  const t = useTranslations('header')

  const { auth } = useAuth()

  const [register, { loading: isLoading }] = useRegisterMutation({
    onCompleted() {
      toast.success('Ви успішно зареєструвались')
      auth()
      setAuthCookie()
    },
    onError(error) {
      toast.error(error.message)
    },
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { password2, ...data } = values
    register({ variables: { data } })
  }

  const handleChangeFormType = () => {
    setFromType('login')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="pt-[30px] pb-[20px]">
              <FormLabel>{t('auth.registerForm.loginLabel')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('auth.registerForm.loginLabel')}
                  className="h-[50px] px-[20px] w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="pb-[30px]">
              <FormLabel>{t('auth.registerForm.emailLabel')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('auth.registerForm.emailPlaceholder')}
                  className="h-[50px] px-[20px] w-full"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="pb-[30px]">
              <FormLabel>{t('auth.registerForm.passLabel')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('auth.registerForm.passPlaceholder')}
                  className="h-[50px] px-[20px] w-full"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password2"
          render={({ field }) => (
            <FormItem className="pb-[30px]">
              <FormLabel>{t('auth.registerForm.repeatPassLabel')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('auth.registerForm.repeatPassPlaceholder')}
                  className="h-[50px] px-[20px] w-full"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {t('auth.registerBtn')}
        </Button>

        <div className="mt-[20px] flex">
          <Button
            variant="link"
            type="button"
            onClick={handleChangeFormType}
            className="w-full text-primary opacity-100"
          >
            {t('auth.loginBtn')}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default RegisterForm
