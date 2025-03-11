'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/common/Form'
import { Input } from '../ui/common/Input'
import { Button } from '../ui/common/Button'
import { Checkbox } from '../ui/common/Checkbox'
import { useTranslations } from 'next-intl'

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

interface IRegisterFormProps {
  setFromType: React.Dispatch<React.SetStateAction<'login' | 'register'>>
}

const RegisterForm: React.FC<IRegisterFormProps> = ({ setFromType }) => {
  const t = useTranslations('header')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
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
            <FormItem className="pt-[30] pb-[20]">
              <FormLabel>{t('auth.loginBtn')}</FormLabel>
              <FormControl>
                <Input placeholder={t('auth.registerForm.loginLabel')} className="h-[50] px-[20] w-full" {...field} />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="pb-[30]">
              <FormLabel>{t('auth.registerForm.passLabel')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('auth.registerForm.passPlaceholder')}
                  className="h-[50] px-[20] w-full"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="pb-[30]">
              <FormLabel>{t('auth.registerForm.repeatPassLabel')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('auth.registerForm.repeatPassPlaceholder')}
                  className="h-[50] px-[20] w-full"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {t('auth.registerBtn')}
        </Button>

        <div className="mt-[20] flex">
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
